/**
 * Created by Sly on 21.01.2016.
 */
"use strict";
function l(l) {return dojo.byId(l);}
define(["dojo/_base/declare", "game/controller/ManController", "game/controller/StatsController", "game/controller/ResourceController", "game/UI/ManualTab", "game/UI/StatsTab", "game/UI/ResourcesTab", "game/core/Timer", "game/core/TabContainer", "game/UI/SaveTab", "game/controller/UpgradeController", "game/UI/UpgradeTab", "dojo/dom-construct", "dojo/on"], function(declare, man, stat, res, ManTab, StatTab, ResTab, Timer, TabContainer, SaveTab, upg, UpgradeTab, d, on) {
    return declare(null, {
        tabContainers: [],
        controllers: [],
        worker: null,
        lastTick: null,
        timer: null,
        saveKey: "Gabeorama-web-game",
        constructor: function() {
            //Initiate controllers and add to array
            this.stats = new stat(this);
            this.manual = new man(this);
            this.resources = new res(this);
            this.upgrades = new upg(this);
            this.controllers.push(this.stats);
            this.controllers.push(this.manual);
            this.controllers.push(this.resources);
            this.controllers.push(this.upgrades);

            this.lastTick = Date.now();
        },

        init: function() {
            this.manual.SetProduction("lootWreckage", true);

            //Load save
            this.Load();

            //Start webworker
            var wworker = new Blob(["onmessage = function(e) {setInterval(function(){ postMessage('tick'); }, 50); }"]);
            this.worker = new Worker(window.URL.createObjectURL(wworker));
            this.worker.addEventListener('message', dojo.hitch(this, function(e) {
                this.tick();
            }));
            this.worker.postMessage("tick");

            this.timer = new Timer();
            this.timer.AddEvent(function() {
                game.Save();
            }, 6000);

            var animationC = new TabContainer(l("animationPane"));
            var statisticsC = new TabContainer(l("statisticsPane"));
            var managementC = new TabContainer(l("managementPane"));

            animationC.AddTab(new ManTab("Manual",this), true);
            statisticsC.AddTab(new ResTab("Resources", this), true);
            statisticsC.AddTab(new StatTab("Stats", this), true);
            managementC.AddTab(new UpgradeTab("Upgrades", this), true);
            managementC.AddTab(new SaveTab("Save", this), true);

            this.tabContainers = [
                animationC,
                statisticsC,
                managementC
            ];

            for (var t in this.tabContainers) {
                var tab = this.tabContainers[t];
                tab.ChangeTab(tab.tabs[0]);
            }

            /* Tooltip */
            this.tooltip = d.create("div", {
                className: "w3-card-8 w3-round tooltip",
                style: "display: none;",
                innerHTML: ""
            }, l("gameArea"));

            this.capture = on.pausable(document, "mousemove", function(e) {
                game.tooltip.style.left = e.clientX + 1 + "px";
                game.tooltip.style.top = e.clientY + 1 + "px";
            });
        },

        tick: function() {
            var delta = Date.now() - game.lastTick;
            for (var tab in game.tabContainers) {
                game.tabContainers[tab].Update();
            }

            for (var m in this.controllers) {
                var controller = this.controllers[m];
                controller.Update(delta);
            }

            game.timer.Update();

            //Update tick
            game.lastTick = Date.now();
        },
        CreateSave: function() {
            var arr = {};
            arr.lastTick = this.lastTick;
            for (var c in this.controllers) {
                this.controllers[c].getSave(arr);
            }
            return arr;
        },
        Save: function() {
            var save = this.CreateSave();
            window.localStorage[this.saveKey] = window.btoa(JSON.stringify(save));
            console.log("Game saved.");
        },
        Load: function(save) {
            //load from localStorage
            if (!save) {
                try {
                    save = JSON.parse(window.atob(window.localStorage[this.saveKey]));
                } catch (e) {
                    save = false;
                }
            }
            //Call loaders
            if (save) {
                for (var c in this.controllers) {
                    this.controllers[c].LoadSave(save);
                }
            }
        },
        DisplayTooltip: function(content) {
            d.empty(this.tooltip);
            this.tooltip.appendChild(content);
            this.tooltip.style.display = "table";
            this.capture.resume();
        },
        RemoveTooltip: function() {
            this.tooltip.style.display = "none";
            this.capture.pause();
        },
        Recalculate: function() {
            for (var controller in this.controllers) {
                var c = this.controllers[controller];
                c.Recalculate();
            }
        }
    });
});

function createLayer(parent, columns, rows) {
    var base = document.createElement("div");
    base.className = "buildingBase";
    base.style.position = "relative";
    base.style.height = "100%";

    var width = 100 / columns;
    var height = 100 / rows;
    for (var i = 0; i < rows; i++) {
        for (var j=0; j<columns; j++) {
            var elem = document.createElement("div");
            elem.style.width = width + "%";
            elem.style.height = height + "%";
            elem.style.left = width*j + "%";
            elem.style.top = height*i + "%";
            elem.style.position = "absolute";
            elem.style.backgroundColor = "white";
            elem.style.border = "1px solid black";
            base.appendChild(elem);
        }
    }

    parent.appendChild(base);
}

function AddEvent(element, event, func) {
    element.addEventListener(event, func);
}

var layout =
    "0000000000000000000000000" +
    "000#####000###00000#####0" +
    "00######00#####000######0" +
    "0##000000#00000#0##000000" +
    "0##000000#00000#0##000000" +
    "0##000000#00000#0##000000" +
    "0##000000#00000#0##000000" +
    "00#####00#00000#00#####00" +
    "000#####0#00000#000#####0" +
    "000000##0#00000#000000##0" +
    "000000##0#00000#000000##0" +
    "000000##0#00000#000000##0" +
    "000000##0#00000#000000##0" +
    "0######000#####00######00" +
    "0#####00000###000#####000" +
    "0000000000000000000000000";

