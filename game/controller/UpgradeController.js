/**
 * Created by Sly on 08.03.2016.
 */
define(["dojo/_base/declare", "game/core/Controller", "game/util/Upgrade"], function(declare, Controller, Upgrade) {
    return declare(Controller, {
        upgrades: [
            new Upgrade("Idler Beginner", "temp", "<b>Double</b> the max progressbar time.<q>Unlock the full potential of the progress meter. This path specializes in maintaining production, while minimizing user input.</q>", [{name: "scrap", amount: 100}], {x: 0, y: 0}, null, ["Clicker Beginner"]),
            new Upgrade("Clicker Beginner", "temp", "<b>Double</b> depletion rate.<br/>", [{name: "scrap", amount: 100}], {x: 0, y: -48}, null, ["Idler Beginner"]),
            new Upgrade("What has happened?", "story", "Figure out what has happened, might just unlock your first <b>story fragment</b>.<q>Everyone knows the prequels are the best!</q>", [{name: "scrap", amount: 250}, {name: "water", amount: 30}], {x: 0, y: -48}, null, null, function() {game.story.progress++}),
            new Upgrade("I want to test, Resources please", "dev", "", [], {x: -48, y: -48}, null, null, function() { for (var r in game.resources.resources) { game.resources.resources[r].amount += 10000000;}})
        ],
        upgradesAvailable: [],
        upgradesBought: [],
        constructor:function() {
            this.upgradesAvailable = this.upgrades.slice(0); //TODO check available upgrades
        },

        Buy: function(upgrade) {
            if (upgrade.CanAfford()) {
                upgrade.Buy();
                this.upgradesAvailable.splice(this.upgradesAvailable.indexOf(upgrade), 1);
                this.upgradesBought.push(upgrade);
                game.Recalculate();
                //Lock upgrades
                if (upgrade.locks) {
                    for (var l in upgrade.locks) {
                        var lock = this.getMeta(upgrade.locks[l], this.upgradesAvailable);
                        this.upgradesAvailable.splice(this.upgradesAvailable.indexOf(lock), 1);
                    }
                }
                return true;
            }
            return false;
        },
        //Get the upgrade without paying
        Unlock: function(upgrade) {
            if (this.HasUpgrade(upgrade.name)) return;
            this.upgradesAvailable.splice(this.upgradesAvailable.indexOf(upgrade), 1);
            this.upgradesBought.push(upgrade);
            //Lock upgrades
            if (upgrade.locks) {
                for (var l in upgrade.locks) {
                    var lock = this.getMeta(upgrade.locks[l], this.upgradesAvailable);
                    this.upgradesAvailable.splice(this.upgradesAvailable.indexOf(lock), 1);
                }
            }
            if (upgrade.onBoughtHandle) upgrade.onBoughtHandle();
        },

        HasUpgrade: function(what) {
            return this.getMeta(what, this.upgradesBought);
        },

        getSave: function(save) {
            save.upgrades = []
            for (var u in this.upgradesBought) {
                save.upgrades.push(this.upgradesBought[u].name);
            }
            return save;
        },
        LoadSave: function(saved) {
            console.log(saved.upgrades);
            var save = saved.upgrades;
            for (var u in save) {
                this.Unlock(this.getMeta(save[u], this.upgrades));
            }
        }
    });
});