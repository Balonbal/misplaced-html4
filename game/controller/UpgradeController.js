/**
 * Created by Sly on 08.03.2016.
 */
define(["dojo/_base/declare", "game/core/Controller", "game/util/Upgrade"], function(declare, Controller, Upgrade) {
    return declare(Controller, {
        upgrades: [
            new Upgrade("Idler beginner", "Unlock the full potential of the progress meter. This path specializes in maintaining production, while minimizing user input.", [{name: "scrap", amount: 100}], {x: 0, y: 0}, null),
            new Upgrade("Clicker beginner", "", [{resource: "scrap", amount: 100}], {x: 0, y: -48}, null)
        ]
    });
});