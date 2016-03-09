/**
 * Created by Sly on 12.02.2016.
 */
Game.workers = {
    "unassigned": 46,
    "hunters": {
        "unlocked": true,
        "assigned": 0,
        "progress": 0,
        "time": 35000,
        "production": [{
            "resource": "meat",
            "amount": 1
        }],
        type: "workerGatherer"
    },
    "pickers": {
        "unlocked": true,
        "assigned": 0,
        "completionTime": 75000,
        "progress": 0,
        "time": 75000,
        "production": [{
            "resource": "berries",
            "amount": 1
        }],
        type: "workerGatherer"
    }
};

function createWorkerElement(name) {
    var worker = Game.workers[name];

    if (!worker.unlocked) return;

    //Parent container
    var parent = document.createElement("div");
    parent.id = name;
    parent.className = worker.type + " w3-card-2";

    //General info
    var info = document.createElement("div");
    info.className = "w3-container w3-third";
    info.appendChild(document.createTextNode(name.charAt(0).toUpperCase() + name.slice(1)));
    info.appendChild(document.createElement("br"));

    //Controls
    var assigned = document.createElement("span");
    var leftIcon = document.createElement("i");
    var rightIcon = document.createElement("i");
    var decrement = document.createElement("a");
    var increment = document.createElement("a");


    decrement.href = "javascript:void(0);";
    increment.href = "javascript:void(0);";

    decrement.onclick = function() {changeWorkers(name, -1); return false; };
    increment.onclick = function() {changeWorkers(name, 1); return false };

    leftIcon.className = "fa fa-arrow-left w3-tiny";
    rightIcon.className = "fa fa-arrow-right w3-tiny";

    rightIcon.id = name + "Increase";
    assigned.id = name + "Assigned";
    leftIcon.id = name + "Reduce";

    assigned.innerHTML = worker.assigned;

    decrement.appendChild(leftIcon);
    increment.appendChild(rightIcon);
    info.appendChild(decrement);
    info.appendChild(assigned);
    info.appendChild(increment);

    //Production info
    var production = document.createElement("div");
    var meter1 = document.createElement("div");
    var meter1Label = document.createElement("span");
    var meter1progress = document.createElement("div");

    production.className = "w3-container w3-twothird";
    meter1.className = "meter";
    meter1Label.className = "meterLabel";

    meter1Label.id = name + "WorkLabel";
    meter1progress.id = name + "WorkProgress";

    meter1Label.innerHTML = worker.progress/worker.time + "%";

    meter1progress.style.width = worker.progress/worker.time + "%";
    meter1progress.style.backgroundColor = "rgb(234, 127, 53)";

    meter1.appendChild(meter1Label);
    meter1.appendChild(meter1progress);
    production.appendChild(meter1);

    parent.appendChild(info);
    parent.appendChild(production);
    document.getElementById("workerTab").appendChild(parent);
}