/**
 * Created by Sly on 02.03.2016.
 */
define(["dojo/_base/declare"], function(declare) {
    "use strict";
    return declare(null, {
        active: false,
        parent: null,
        title: null,
        game: null,
        visible: false,
        constructor: function(title, game) {
            this.title = title;
            this.name = title;
            this.parent = parent;
            this.game = game;
        },
        render: function(content) {
        },
        update: function() {
        },
        unlocked: function() { return true;}
    });
});