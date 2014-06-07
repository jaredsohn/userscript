// ==UserScript==
// @name        GLB2 - Sort Team Schedule
// @namespace   pbr/glb2_sts
// @include     http://glb2.warriorgeneral.com/game/team/*
// @copyright   2013, pabst
// @license     (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/4.0/
// @version     14.01.19
// @grant       none
// ==/UserScript==

window.setTimeout(
        function() {
            try {
                runSort();               
            }
            catch (e) {
            }

            fixColors();
        }, 1500
);

function runSort() {
    var indexes = [];

    var tr = document.getElementsByClassName("list_date nosort");
    var row = tr[tr.length-1].parentNode;
    var parent = row.parentNode;

    var x = 0;
    while (row.nextSibling) {
        x++;
        if (x === 1000) {
            console.log("something bad happened (or you've spent waaaay too much money on flex). breaking out.");
            break;
        }
        row = row.nextSibling;

        var next = row.nextSibling;
        var cls = row.childNodes[1].childNodes[0].className;
        if (indexes[cls] != null) {
            parent.insertBefore(row, indexes[cls].nextSibling);
        }
        indexes[cls] = row;
        row = next.previousSibling;
    }
}

function fixColors() {
    var table = document.getElementById("scheduleTable");
    var striped = true;
    for each (var r in table.rows) {
        try {
            if (striped)
                r.setAttribute("class", "");
            else
                r.setAttribute("class", "striped");
            striped = !striped;
        }
        catch (e) {
        }
    }
}
