// ==UserScript==
// @name           Add Agent/Age to GLB Roster
// @description    Adds player ages and agent names to GLB roster pages
// @namespace      aatr
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @version        09.08.25
// ==/UserScript==

/*
 *
 * pabst did this 09/08/25+
 *
 *
 */

var once = false;

window.setTimeout( function() {
    var input = document.createElement("input");
    input.type = "button";
    input.value = "Load Info";

    var heading = document.getElementsByClassName("medium_head")[0];
    heading.parentNode.insertBefore(input, heading);

    input.addEventListener("click",add_agents,false);
}, 100);

function add_agents() {
    if (once == true) return;

    once = true;

    var headings = document.getElementsByClassName("nonalternating_color");
    for (var i=0; i<headings.length; i++) {
        headings[i].insertCell(headings[i].cells.length-2);
        headings[i].insertCell(headings[i].cells.length-2);

        headings[i].cells[headings[i].cells.length-3].innerHTML = "Age";
        headings[i].cells[headings[i].cells.length-4].innerHTML = "Agent";
    }
    var p1 = document.getElementsByClassName("player_name");
    for (var i=0; i<p1.length; i++) {
        getInetPage(p1[i].getElementsByTagName("a")[0]);
    }

    var p2 = document.getElementsByClassName("player_name_short");
    for (var i=0; i<p2.length; i++) {
        getInetPage(p2[i].getElementsByTagName("a")[0]);
    }
}

function getInetPage(p) {
    var func = insert;
    var address = "http://goallineblitz.com/game/player.pl?player_id="+p.href.split("=")[1];
    var req = new XMLHttpRequest();
    req.open( 'GET', address, true );
    req.onload = function() {
            if (this.status != 200) {
                    alert("pbr gm script: Error "+this.status+" loading "+address);
            }
            else {
                    func(address,this);
            }
    };

    req.send(null);
    return req;
}

function insert(address, page) {
    for (var i=0; i<document.links.length; i++) {
        if (document.links[i].href == address) {
            var row = document.links[i].parentNode.parentNode.parentNode;
            row.insertCell(row.cells.length-2);
            row.insertCell(row.cells.length-2);

            var div = document.createElement("div");
            div.innerHTML = page.responseText;

            var age = div.getElementsByClassName("vital_data")[2].innerHTML.split("-")[1].split(" old")[0];
            var ageCell = row.cells[row.cells.length-3];
            ageCell.innerHTML = age;

            var agent = div.getElementsByClassName("vital_data")[5];
            var agentCell = row.cells[row.cells.length-4];
            agentCell.innerHTML = agent.innerHTML;

            break;
        }
    }
}

