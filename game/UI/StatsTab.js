/**
 * Created by Sly on 02.03.2016.
 */
define(["dojo/_base/declare", "game/core/Tab", "dojo/dom-construct"], function(declare, Tab, d) {
    "use strict";
    return declare(Tab, {
        game: null,
        elements: [],
        render: function(container) {
            (container) || (container = this.parent);
            this.elements = [];
            d.empty(container);
            d.create("h3", {innerHTML: "Statistics"}, container);
            var table = d.create("table", null, container);
            for (var s in this.game.stats.stats) {
                var stat = this.game.stats.stats[s];
                var row = d.create("tr", null, table);
                var label = d.create("td", { innerHTML: stat.label}, row);
                var value = d.create("td", { innerHTML: stat.calculate ? stat.calculate() : stat.value }, row);

                this.elements.push({label: label, value: value, stat: stat});
            }
        },
        update: function() {
            for (var e in this.elements) {
                var element = this.elements[e];

                element.value.innerHTML = element.stat.calculate ? element.stat.calculate() : element.stat.value;
            }
        },
        visible: true,
        active: false
    });
});