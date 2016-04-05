/**
 * Created by Sly on 21.03.2016.
 */
define(["dojo/_base/declare", "game/core/Tab", "dojo/dom-construct"], function(declare, Tab, d) {
    return declare(Tab, {
        lastProgress: 0,
        render: function(content) {
            (content) || (content = this.parent);
            this.content = content;
            d.empty(content);
            d.create("h3", {innerHTML: "¤$(#/¤'s journal"}, content);
            for (var i = 0; i < game.story.progress; i++) {
                var paragraph = game.story.story[i];
                var c = d.create("div", {className: "journal unread w3-card-16 w3-round"}, content);
                d.create("div", {innerHTML: paragraph}, c);
                d.create("p", {innerHTML: "<i>Page number: " + (i+1)+"</i>", style: "float:right; margin: 3px; color: drak-grey"}, c);
                this.lastProgress++;
            }
        },
        update: function() {
            //Story has progressed
            if (this.lastProgress < game.story.progress) {
                for (var i = this.lastProgress; i < game.story.progress; i++) {
                    d.create("p", {innerHTML: game.story.story[i], className: "journal unread w3-card-16"} , this.content);
                    this.lastProgress++;
                }
            }
        },
        unlocked: function() {
            return game.story.progress > 0;
        }

    })
});