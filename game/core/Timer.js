/**
 * Created by Sly on 07.03.2016.
 */
define(["dojo/_base/declare"], function (declare) {
    return declare(null, {
        events: [],
        AddEvent: function(event, frequency) {
            this.events.push({ handle: event, frequency: frequency, count: 0});
        },
        //Game tick
        Update: function() {
            for (var e in this.events) {
                var event = this.events[e];
                event.count--;
                //Time to do event
                if (event.count <= 0) {
                    event.count = event.frequency;
                    event.handle();
                }
            }
        }
    });
});