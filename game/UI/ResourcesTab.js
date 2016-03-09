/**
 * Created by Sly on 02.03.2016.
 */
define(["dojo/_base/declare", "game/core/Tab", "dojo/dom-construct"], function(declare, Tab, d) {
    "use strict";
    return declare(Tab, {
        elements: [],
        render: function(container) {
            (container) || (container = this.parent);
            d.empty(container);
            d.create("h3", {innerHTML: "Resources"}, container);
            var table = d.create("table", null, container);
            for (var r in this.game.resources.resources) {
                var resource = this.game.resources.resources[r];
                var row = d.create("tr", null, table);
                var label = d.create("td", { innerHTML: resource.label },        row);
                var value = d.create("td", { innerHTML: resource.amount },       row);
                var plus = d.create("td",  { innerHTML: 0 },  row);
                var minus = d.create("td", { innerHTML: 0 }, row);

                this.elements.push({label: label, value: value, resource: resource, plus: plus, minus: minus});
            }
        },
        update: function() {
            for (var e in this.elements) {
                var element = this.elements[e];

                element.value.innerHTML = element.resource.amount;
                element.plus.innerHTML = "+" + this.game.resources.prodPerSecAvg(element.resource.name) + "/sec";
                element.minus.innerHTML = "-" + this.game.resources.consPerSecAvg(element.resource.name) + "/sec";
            }
        },
        active: true,
        visible: true
    });
});