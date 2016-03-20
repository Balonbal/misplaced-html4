/**
 * Created by Sly on 02.03.2016.
 */
define(["dojo/_base/declare", "game/core/Tab", "dojo/dom-construct", "dojo/mouse", "dojo/on", "dojo/_base/lang"], function(declare, Tab, d, mouse, on, lang) {
    "use strict";
    return declare(Tab, {
        elements: null,
        production: null,
        table: null,
        render: function(container) {
            (container) || (container = this.parent);
            d.empty(container);
            /* INTERACTIVE ELEMENT */
            var clickContainer = d.create("div", { className: "w3-container w3-card-16"}, container);

            var left = d.create("div", {className: "w3-third w3-image", click: function() { game.manual.ManualClick(); }}, clickContainer);
            left.style.cursor = "pointer";
            var right = d.create("div", {className: "w3-twothird"}, clickContainer);

            var image = d.create("img", {
                src: "",
                style: "width: 100%"
            }, left);
            var label = d.create("div", { className: "w3-title", style: "margin: 25%", innerHTML: "0%"}, left);
            var header = d.create("h3", {innerHTML: "{{ header }}"}, right);

            var meter = d.create("div", {className: "meter"}, right);
            var meterProgress = d.create("div", {
                style: "background-color: #20b420; width: 0%"
            }, meter);
            var meterLabel = d.create("span", {
                style: "top: -0.1em",
                innerHTML: "00:00"
            }, meter);

            var text = d.create("p", {
                innerHTML: " {{ description }}"
            }, right);

            this.table = this.CreateTable(game.manual.production);

            on(text, mouse.enter, lang.hitch(this, function() {
                game.DisplayTooltip(this.table, this.elements.text);
            }));
            on(text, mouse.leave, function() {
                game.RemoveTooltip();
            });

            //Add references
            this.elements = {
                container: clickContainer,
                label: label,
                header: header,
                image: image,
                meter: meter,
                meterProgress: meterProgress,
                meterLabel: meterLabel,
                text: text
            };
        },
        update: function() {
            this.elements.meterProgress.style.width = game.manual.progress / game.manual.maxProgress * 100 + "%";
            this.elements.meterLabel.innerHTML = toDate(game.manual.progress / game.manual.depletion);
            if (this.production != game.manual.prodName) {
                this.SetProduction(game.manual.prodName);
            }
        },
        SetProduction: function(what, loop) {
            //Pass to controller
            if (loop) game.manual.SetProduction(what);

            //Update display
            var prod = game.manual.getMeta(what, productions);
            if (prod) {
                this.elements.header.innerHTML= prod.label;
                this.elements.image.src = prod.image;
                this.elements.text.innerHTML = prod.description;
                this.production = what;
                this.table = this.CreateTable(game.manual.production);
            }

        },
        CreateTable: function(resources) {
            var table = d.toDom("<table><tr><th>Resource</th><th>Amount</th><th>Chance</th></tr></table>");
            for (var r in resources) {
                var resource = resources[r];
                d.create("tr", {
                    innerHTML: "<tr><td>" + game.resources.GetName(resource.name) + "</td><td>" + resource.amount + "</td><td>" + resource.chance + "</td></tr>"
                }, table);
            }
            return table;
        },
        visible: true,
        active: true
    });
});
var productions = [
    { name: "lootWreckage", label: "Loot Wreckage", image: "images/Crate.png",
        description: "Loot the plane. It contains a lot of useful materials, like <span style='color: brown'>food</span>, <span style='color: deepskyblue'>water</span> and <span style='color: lightslategrey'>scrap</span>."}
];

function toDate(secs) {
    var days = Math.floor(secs/(60*60*24));
    secs %= 60*60*24;
    var hours = Math.floor(secs/(60*60));
    secs %= 60*60;
    var mins = Math.floor(secs/60);
    secs %= 60;

    return (mins.toFixed(0) < 10 ? "0" : "") + mins.toFixed(0) + ":" + (secs.toFixed(0) < 10 ? "0" : "") + secs.toFixed(0);
}