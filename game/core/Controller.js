/**
 * Created by Sly on 02.03.2016.
 */
define(["dojo/_base/declare"], function(declare) {
    "use strict";
    return declare(null, {
        game: null,
        constructor:function(game) {
            this.game = game;
        },
        Update: function() {},
        getMeta: function(what, list) {
            for (var n in list) {
                if (list[n].name === what) return list[n];
            }
            return false;
        },
        getSave: function() {},
        loadSave: function(savedata) {}
    });
});