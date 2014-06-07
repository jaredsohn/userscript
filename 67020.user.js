// ==UserScript==
// @name           OCS
// @namespace      pbr
// @include        http://goallineblitz.com/game/team_offers.pl?team_id=*
// @copyright      2009, pabst
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version        09.04.01
// ==/UserScript==

/*
 * 
 * written by pabst 12/26/08+
 * 
 */

var removeConfirmation = false;

window.setTimeout( 
    function() {
        sort_main();
    },
    1000
    );

function sort_main() {
    var remove = document.getElementsByClassName("offer");
    var contracts = new Array();
    for (var i=remove.length-1; i>-1; i--) {
        contracts[i] = remove[i].parentNode.removeChild(remove[i]);
    }
	
    var positions = new Array();
    var levels = new Array();
    for (var i=0; i<contracts.length; i++) {
        var lev = contracts[i].getElementsByTagName("b")[0].innerHTML.split(" ")[1];
        var pos = contracts[i].getElementsByTagName("b")[0].innerHTML.split(" ")[2];
        positions[i] = pos;
        levels[i] = lev;
    }

    sortTriplet(levels, positions, contracts);
	
    var p = ["QB","HB","FB","TE","WR","C","G","OT","DT","DE","LB","CB","SS","FS","K","P"];
    for (var i=0; i<p.length; i++) {
        showPosition(p[i],contracts, positions, levels);
    }
	
    getRosterPage();
}

function showPosition(pos, contracts, positions, levels) {
    var div = document.createElement("div");
    div.setAttribute("class","nonalternating_color pbr_positions");
    div.setAttribute("style","margin: 5px; clear: both;")
    div.innerHTML = pos;
	
    var div2 = document.createElement("div");
    div2.setAttribute("class","offers");
	
    var offerblock = document.getElementById("sent_offers");
	
    for (var i=0; i<positions.length; i++) {
        if (positions[i] == pos) {
            div2.appendChild(contracts[i]);
        }
    }

    offerblock.appendChild(div);
    offerblock.appendChild(div2);
}

function sortTriplet(arr1, arr2, arr3) {
    for (var i=0; i<arr1.length-1; i++) {
        for (var j=i; j<arr1.length; j++) {
            if (parseFloat(arr1[i]) < parseFloat(arr1[j])) {
                var temp = arr1[i];
                arr1[i] = arr1[j];
                arr1[j] = temp;
				
                temp = arr2[i];
                arr2[i] = arr2[j];
                arr2[j] = temp;

                temp = arr3[i];
                arr3[i] = arr3[j];
                arr3[j] = temp;
            }
        }
    }
}

function getRosterPage() {
    var addr = window.location.href.toString().replace("team_offers","roster");
    var req = new XMLHttpRequest();
	req.open( 'GET', addr, true );
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
			showSignedPlayers(this.responseText);
		}
	};

	req.send(null);
	return req;
}

function showSignedPlayers(page) {
    var div = document.createElement("div");
    div.setAttribute("style","visibility: hidden");
    div.innerHTML = page;
	
    document.getElementById("footer").appendChild(div);
    //	console.log(page);
    var pos = document.getElementsByClassName("position");
    var lvl = document.getElementsByClassName("player_level");
	
    var headings = document.getElementsByClassName("pbr_positions")
    for (var i=0; i<headings.length; i++) {
        var signed = getPositionString(headings[i].innerHTML,pos,lvl);
        headings[i].innerHTML += ":   " + signed.length + " players signed";
        headings[i].innerHTML += " ("+signed.sort(sortFunc)+")";
    }
	
    div.parentNode.removeChild(div);
}

function sortFunc(a, b) {
    return a < b;
}

function getPositionString(pos, positions, levels) {
    var output = [];
    for (var i=0; i<positions.length; i++) {
        var ind = positions[i].innerHTML.indexOf("<");
        if (ind != -1) {
            positions[i].innerHTML = positions[i].innerHTML.slice(0,ind);
        }
        //console.log(pos + " |||| "+positions[i].innerHTML);
        if (pos == positions[i].innerHTML) {
            output.push(parseInt(levels[i].innerHTML));
        }
    }
    //console.log(pos+" -- "+output);
    return output;
}

unsafeWindow.deleteOffer = function(id) {
    var teamId = window.location.href.toString();
    teamId = teamId.slice(teamId.indexOf("=")+1);
	
    if (removeConfirmation == false) {
        if (confirm("Really delete this offer?")) {
            unsafeWindow.redirectTo('/game/team_offers.pl?team_id=' + teamId + '&delete_offer=' + id);
        }
    }
    else {
        var iframe = document.createElement("frame");
        iframe.setAttribute("id","iframe_"+id);
        iframe.setAttribute("style","visibility: hidden;");
        iframe.setAttribute("src",'/game/team_offers.pl?team_id=' + teamId + '&delete_offer=' + id);
        document.getElementById("footer").appendChild(iframe);

        var links = document.links;
        for (var i=0; i<links.length; i++) {
            var onclick = links[i].getAttribute("onclick");
            if (onclick == "deleteOffer('"+id+"')") {
                links[i].innerHTML = "Deleting ...";
                break;
            }
        }
        deletionDelay(id);
    }
}

function deletionDelay(id) {
    var done = false;

    var iframe = document.getElementById("iframe_"+id);
    if (iframe != null) {
        try {
            var footer = iframe.contentDocument.getElementById("footer");
            if (footer != null) {
                done = true;
            }
        }
        catch (e) {
            done = true;
        }
    }
    if (done == false) {
        setTimeout(function() {
            deletionDelay(id);
        }, 1000);
    }
    else {
        if (iframe == null) console.log("why is iframe null?");
        iframe.parentNode.removeChild(iframe);

        var links = document.links;
        for (var i=0; i<links.length; i++) {
            var onclick = links[i].getAttribute("onclick");
            if (onclick == "deleteOffer('"+id+"')") {
                var container = links[i].parentNode.parentNode;
                container.parentNode.removeChild(container);
                break;
            }
        }
    }
}
