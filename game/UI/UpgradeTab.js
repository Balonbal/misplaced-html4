/**
 * Created by Sly on 09.03.2016.
 */
define(["dojo/_base/declare", "game/core/Tab", "dojo/dom-construct", "dojo/on", "dojo/mouse", "dojo/_base/lang"], function(declare, Tab, d, on, mouse, lang) {
    return declare(Tab, {
        elements: [],
        render: function(container) {
            (container) || (container = this.parent);
            d.empty(container);
            var availBox = d.create("div", null, container);
            d.create("h3", {innerHTML: "Upgrades"}, availBox); //Header
            for (var u in this.game.upgrades.upgradesAvailable) {
                var upgrade = this.game.upgrades.upgradesAvailable[u];
                var upgradeBox = d.create("div", {
                    className: "box upgrade",
                    //Use correct part of the image
                    style: "background-position: " + upgrade.icon.x + "px " + upgrade.icon.y + "px; float: left"
                }, availBox);
                //Tooltip hook
                 on(upgradeBox, mouse.enter, lang.hitch(this, function(up) {
                     var base = d.create("div", null, null);
                     d.create("div", {innerHTML: up.name, className: "name"}, base);
                     d.create("div", {className: "description", innerHTML: up.description}, base);
                     d.create("div", {className: "line"}, base);
                     var table = d.create("table", {className: "price w3-table w3-striped"}, base);
                     for (var re in up.price) {
                         var r = up.price[re];
                         var row = d.create("tr", {
                             //Color after affordability
                             innerHTML: "<td>" + game.resources.GetName(r.name) + "</td><td style='color: " + (up.CanAffordRes(r.name) ? "green":"red")+ "'>" + up.GetPrice(r.name) + "</td>"
                         }, table);
                     }
                     game.DisplayTooltip(base);
                }, upgrade));

                on(upgradeBox, "click", lang.hitch(this, function(up, upgradeBox) {
                    if (game.upgrades.Buy(up)) {
                        d.destroy(upgradeBox);
                        console.log("Upgrade bought: " + up.name);
                        game.RemoveTooltip();
                        this.render(container); //Shady hack, please fix
                    }
                }, upgrade, upgradeBox));

                on(upgradeBox, mouse.leave, function() {
                    game.RemoveTooltip();
                })
            }
        },
        update: function() {
        },
        active: true,
        visible: true
    });
});