/**
 * Created by Sly on 09.03.2016.
 */
define(["dojo/_base/declare"] , function (declare) {
    return declare(null, {
        constructor: function(name, description, price, icon, onBoughtHandle) {
            this.name = name;
            this.description = description;
            this.price = price;
            this.icon = icon;
            if (onBoughtHandle) this.onBoughtHandle = onBoughtHandle;
        },
        GetPrice: function(resource) {
            var base = game.upgrades.getMeta(resource, this.price).amount;
            return Math.ceil(base);
        },
        CanAffordRes: function(what) {
            return game.resources.getResource(what).amount >= this.GetPrice(what);
        },
        CanAfford: function() {
            for (var res in this.price) {
                var r = this.price[res];
                if (!this.CanAffordRes(r.name)) return false;
            }
            return true;
        },
        Buy: function() {
            if (this.CanAfford()) {
                for (var res in this.price) {
                    var r = this.price[res];
                    game.resources.getResource(r.name).amount -= this.GetPrice(r.name);
                    if (this.onBoughtHandle) this.onBoughtHandle();
                }
            }
        }
    });
});