// ==UserScript==
// @name           Pasteable GLB Game Summary (test server version)
// @namespace      pbr
// @include        http://test.goallineblitz.com/game/game_summary.pl?game_id=*
// @version        09.04.22
// ==/UserScript==


window.setTimeout(
    function() {
        gameSummaryMain();
    }
, 1000);

function gameSummaryMain() {
    var heading = document.getElementsByClassName("big_head subhead_head")[0];
    var output = heading.textContent+"<br/><br/>";
    output += "Pos _ Ply _ Ene _ Mor _ Name<br/>";
    output += "----------------------------------------------------<br/>";
    var table = document.getElementsByClassName("summary_table");
    for (var j=0; j<table.length; j++) {
        for (var i=1; i<table[j].rows.length; i++) {
            var row = table[j].rows[i];
            var name = assign(row, 0);
            var pos = assign(row, 1);
            var plays = assign(row, 2);
            var energy = assign(row, 3);
            var morale = assign(row, 4);

            output += pos+" ... "+plays+" ... "+energy+" ... "+morale+" ... "+name+"<br/>";
        }
        output +=    "----------------------------------------------------<br/>";
    }

    var div = document.createElement("div");
    div.innerHTML = output;
    var footer = document.getElementById("footer");
    footer.parentNode.insertBefore(div, footer);
}

function assign(r, idx) {
    var txt = r.cells[idx].textContent;
    while (txt.length < 3) txt = "."+txt;
    return txt;
}