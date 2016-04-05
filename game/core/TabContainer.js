/**
 * Created by Sly on 07.03.2016.
 */
define(["dojo/_base/declare", "dojo/dom-construct", "dojo/on", "dojo/_base/lang"], function(declare, d, on, lang) {
    return declare(null, {
        tabs: [],
        element: null,
        content: null,
        activeTab: null,
        menu: null,
        constructor: function(element) {
            this.tabs = [];
            this.element = element;
            this.menu = d.create("ul", {
                className: "w3-navbar w3-green w3-large w3-border"
            }, element);
            this.content = d.create("div", null, this.element);
        },
        AddTab: function(tab, visible) {
            this.tabs.push(tab);
            var li = d.create("li", {style: "display: " + (visible ? "block" : "none")}, this.menu);
            var a = d.create("a", {
                href: "javascript:void(0)",
                innerHTML: tab.title
            }, li);
            tab.li = li;
            on(li, "click", lang.hitch(this, function() {
                this.ChangeTab(tab);
            }));
            if (!this.activeTab) {
                this.activeTab = tab;
            }
        },
        ChangeTab: function(tab) {
            tab.visible = true;
            tab.render(this.content);
            this.activeTab.li.className = "";
            this.activeTab = tab;
            tab.li.className = "w3-dark-grey";
        },
        Update: function (delta) {
            this.activeTab.update(delta);
            for (var t in this.tabs) {
                var tab = this.tabs[t];
                if (tab.unlocked) {
                    tab.li.style.display = tab.unlocked() ? "block" : "none";
                }
            }
        }
    });
});