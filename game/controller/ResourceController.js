/**
 * Created by Sly on 02.03.2016.
 */
define(["dojo/_base/declare", "game/core/Controller", "game/core/Resource"], function(declare, Controller, Resource) {
    "use strict";
    return declare(Controller, {
        resources: [
            new Resource("meat", "Meat", "nourishment"),
            new Resource("water", "Water Reserve", "nourishment"),
            new Resource("scrap", "Scrap", "material")
        ],
        getResource: function(what) {
            return this.getMeta(what, this.resources);
        },
        GetName: function(resource) {
            return this.getResource(resource).label;
        },
        setEffect: function(resource, type, effect) {
            var stack = this.getResource(resource)[type];
            //Look for applied effects with the same name (source)
            var e = this.getMeta(effect.name, stack);
            //No effect found

            if (!e) {
                //Add new effect
                stack.push(effect);
            } else {
                stack.splice(stack.indexOf(e), 1);
                stack.push(effect);
            }
        },
        removeEffect: function(resource, type, name) {
            var stack = this.getResource(resource)[type];
            var e = this.getMeta(name, stack);
            if (e) {
                stack.splice(stack.indexOf(e), 1);
            }
        },
        prodPerSecAvg: function(what) {
            var resource = this.getResource(what);
            var additive = [], multiplicative = [];
            var r = 0;

            for (var p in resource.production) {
                var prod = resource.production[p];
                if (prod.type == "additive") additive.push(prod.calculate ? prod.calculate() : prod.value);
                if (prod.type == "multiplicative") multiplicative.push(prod.calculate ? prod.calculate() : prod.value);
            }

            //(a + b + c) * c * d
            for (var m in additive) {
                r += additive[m];
            }
            for (var n in multiplicative) {
                r *= multiplicative[n];
            }
            return r;
        },
        consPerSecAvg: function(what) {
            var resource = this.getResource(what);
            var additive = [], multiplicative = [];
            var r = 0;

            for (var p in resource.consumption) {
                var cons = resource.consumption[p];
                if (cons.type == "additive") additive.push(cons.calculate ? cons.calculate() : cons.value);
                if (cons.type == "multiplicative") multiplicative.push(cons.calculate ? cons.calculate() : cons.value);
            }

            //(a + b + c) * c * d
            for (var m in additive) {
                r += m;
            }
            for (var n in multiplicative) {
                r *= n;
            }
            return r;
        },
        getSave: function() {
            var arr = [];
            for (var r in this.resources) {
                var res = this.resources[r];
                arr.push([res.name, res.amount]);
            }
            return arr;
        },
        LoadSave: function(savedata) {
            for (var r in savedata) {
                var re = savedata[r];
                var res = this.getMeta(re[0], this.resources);
                if (res) res.amount = re[1];
            }
        }
    });
});