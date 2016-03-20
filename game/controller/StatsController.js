/**
 * Created by Sly on 02.03.2016.
 */
define(["dojo/_base/declare", "game/core/Controller", "dojo/_base/lang"], function(declare, controller, lang) {
    "use strict";
    return declare(controller, {
        game:null,
        constructor: function(game) {
            this.game = game;
        },

        stats: [
            { name: "startDate", label: "Start date", calculate: function() {return new Date(game.stats.getStat("startDate").value).toDateString();}, value: Date.now()},
            { name: "playTime", label: "Game duration", calculate: function() {return game.stats.toDate(Date.now() - game.stats.getStat("startDate").value);}, value: 0},
            { name: "playtimeOnline", label: "Playtime", calculate: function() {return game.stats.toDate(game.stats.getStat("playtimeOnline").value);}, value: 0},
            { name: "manualClicks", label: "Manual clicks", value: 0}
        ],
        getStat: function(what) {
            return this.getMeta(what, this.stats);
        },
        getSave: function(save) {
            save.stats = [];
            for (var s in this.stats) {
                var stat = this.stats[s];
                save.stats.push([stat.name, stat.value]);
            }
            return save;
        },
        Update: function(delta) {
            this.getStat("playtimeOnline").value += delta;
        },
        LoadSave: function (saved) {
            var save = saved.stats;
            for (var s in save) {
                var stat = save[s];
                this.getStat(stat[0]).value = stat[1];
            }
        },
        toDate: function(milli) {
            var secs = Math.round(milli/1000);
            var days = Math.floor(secs/(60*60*24));
            secs %= 60*60*24;
            var hours = Math.floor(secs/(60*60));
            secs %= 60*60;
            var mins = Math.floor(secs/60);
            secs %= 60;

            return days + "d, " + hours + "h, " + mins + "m, " + secs + "sec";
        }
    });
});