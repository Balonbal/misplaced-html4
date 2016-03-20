/**
 * Created by Sly on 02.03.2016.
 */
define(["dojo/_base/declare", "game/core/Controller"], function(declare, controller) {
    "use strict";
    return declare(controller, {
        progress: 0,
        depleted: 0,
        maxProgress: 0,
        depletion:0,
        power: 0,
        production: [],
        prodName: null,
        activeElement: null,
        productions: [{ name: "lootWreckage", label: "Loot Wreckage", maxProgress: 5, power: 1, depletion:.2, production: [
            { name: "meat", amount: 1, chance:.8},
            { name: "water", amount: 1, chance:.5},
            { name: "scrap", amount: 20, chance:.25}
        ]}
        ],
        ManualClick: function() {
            this.progress += this.power;
            if (this.progress > this.maxProgress) this.progress = this.maxProgress;
            game.stats.getStat("manualClicks").value++;

            for (var r in this.production) (function(r) {
                const re = r;
                const resource = game.manual.production[re];
                const a = resource.amount, c = resource.chance;
                var effect = {};
                effect.name = "manual";
                effect.type = "additive";
                effect.value = a*c;
                game.resources.setEffect(resource.name, "production", effect);
            })(r);
        },
        Update: function(delta) {

            if (this.progress > 0) {
                //Update display
                //Deduct progress
                var deltaP = Math.min(this.depletion*delta / 1000, this.progress);

                this.progress = this.progress - deltaP;
                this.depleted = this.depleted + deltaP;

                var prod = this.depleted >= 1;
                if (prod) this.depleted = 0;

                for (var r in this.production) {
                    var resource = this.production[r];

                    if (!prod) continue;
                    if (Math.random() > resource.chance) continue;
                    game.resources.getResource(resource.name).amount = (game.resources.getResource(resource.name).amount + resource.amount).toFixed(2) * 1;
                }
            } else {
                for (var r in this.production) {
                    var resource = this.production[r];
                    game.resources.removeEffect(resource.name, "production", "manual");
                }

            }

        }, getSave: function(save) {
            save.manual = [this.progress, this.prodName];
            return save;
        },
        LoadSave: function(saved) {
            var save = saved.manual;
            this.progress = save[0];
            this.SetProduction(save[1]);
        },
        SetProduction: function(what, loop) {
            var prod = this.getMeta(what, this.productions);
            if (prod) {
                //Assign values
                this.activeElement = what;
                for (var l in prod) {
                    this[l] = prod[l];
                }
                //Hook for display to update
                this.prodName = what;
            }
        },
        Recalculate: function() {
            /** UPGRADES **/
            var base = this.getMeta(this.prodName, this.productions)

            this.maxProgress = base.maxProgress * (game.upgrades.HasUpgrade("Idler Beginner") ? 2 : 1);
            this.depletion = base.depletion * (game.upgrades.HasUpgrade("Clicker Beginner") ? 2 : 1);
        }
    });
});
