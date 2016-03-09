/**
 * Created by Sly on 05.03.2016.
 */
define(["dojo/_base/declare"], function(declare) {
    "use strict";
    return declare(null, {
        name: null,
        label: null,
        type: null,
        amount: 0,
        production: [],
        consumption: [],

        constructor: function(name, label, type) {
            this.name = name;
            this.label = label;
            this.type = type;
            this.production = [];
            this.consumption = [];
        }
    });
});