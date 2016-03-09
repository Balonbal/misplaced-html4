/**
 * Created by Sly on 08.03.2016.
 */
define(["dojo/_base/declare", "game/core/Controller"], function(declare, Controller) {
    return declare(Controller, {
        upgrades: [
            { name: "maxPPath", label: "Idler beginner", image: "images/upgrades/idle.png", cost: [{resource: "scrap", amount: 100 }], unlocked: function() {return game.stats.getStat("manualClicks").value > 0},
            description: "Unlock the full potential of the progress meter. This path specializes in maintaining production, while minimizing user input."},
            { name: "depPath", label: "Clicker beginner" image: "images/upgrades/active.png", cost: [{resource: "scrap", amount: 100}], unlocked: function() {return game.stats.getStat("manualClicks").value > 0},
            description: ""}
        ]
    });
});