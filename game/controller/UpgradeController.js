/**
 * Created by Sly on 08.03.2016.
 */
define(["dojo/_base/declare", "game/core/Controller", "game/util/Upgrade"], function(declare, Controller, Upgrade) {
    return declare(Controller, {
        upgrades: [
            new Upgrade("Idler beginner", "<b>Double</b> the max progressbar time.<q>Unlock the full potential of the progress meter. This path specializes in maintaining production, while minimizing user input.</q>", [{name: "scrap", amount: 100}], {x: 0, y: 0}, null),
            new Upgrade("Clicker beginner", "<b>Double</b> depletion rate.<br/>", [{name: "scrap", amount: 100}], {x: 0, y: -48}, null)
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
                return true;
            }
            return false;
        }
    });
});