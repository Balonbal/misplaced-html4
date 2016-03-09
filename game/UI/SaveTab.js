/**
 * Created by Sly on 07.03.2016.
 */
define(["dojo/_base/declare", "dojo/dom-construct", "game/core/Tab", "dojo/on", "dojo/_base/lang"], function(declare, d, Tab, on, lang) {
    return declare(Tab, {
        render: function(content) {
            (content) || (content = this.parent);
            d.empty(content);
            //Header
            d.create("h3", {innerHTML: "Save"}, content);
            //Save button
            var save_btn = d.create("button", {
                className: "w3-btn w3-large w3-round w3-khaki w3-hover-teal",
                innerHTML: "Save"
            }, content);
            //Import button
            var import_btn = d.create("button", {
                className: "w3-btn w3-large w3-round w3-khaki w3-hover-teal",
                innerHTML: "Import save"
            }, content);
            //Export button
            var export_btn = d.create("button", {
                className: "w3-btn w3-large w3-round w3-khaki w3-hover-teal",
                innerHTML: "Export save"
            }, content);
            //Wipe save
            var wipe_btn = d.create("button", {
                className: "w3-btn w3-large w3-round w3-pink w3-hover-red",
                innerHTML: "Wipe Save"
            }, content);

            //Bind events
            on(save_btn, "click", lang.hitch(this, function() { game.Save() }));
            on(import_btn, "click", lang.hitch(this, function() {
                //TODO Implement paste menu
                var savedata;
                if (savedata) game.Load()
            }));
            on(export_btn, "click", lang.hitch(this, function() {
                //TODO Export
            }));
            on(wipe_btn, "click", lang.hitch(this,function() {
                //Clear localstorage
                window.localStorage[game.saveKey] = null;
                //TODO Wipe active save
            }))

        }
    });
});