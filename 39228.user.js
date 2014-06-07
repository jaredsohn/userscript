// ==UserScript==
// @name           Contract, Cash, Tokens On Home Page
// @namespace      pbr
// @description    Add player contract info, cash and tokens to GLB homepage
// @include        http://goallineblitz.com/game/home.pl
// @version        09.08.13
// ==/UserScript==

/*
 * 
 * written by pabst 12/26/08+
 * 
 */

var timeout = 200;

window.setTimeout( function() {
	var playernames = [];
	var p = document.getElementsByClassName("playerhead");
	for (var i=0; i<p.length; i++) {
		var a = p[i].getElementsByTagName("a");
		playernames[i] = a[0];
	}
	for (var i = 0; i < playernames.length; i++) {
		var playerInfo = playernames[i].innerHTML;
		var playerId = playernames[i].href.toString();          
		playerId = playerId.slice(playerId.indexOf("_id=")+4);

		getPage(playerId, i);
	}
},timeout);

function createRow(header, data) {
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	td.setAttribute("class","player_vital_head");
	td.innerHTML = header;
	tr.appendChild(td);

	td = document.createElement("td");
	var div = document.createElement("div");
	div.innerHTML = data;
	td.appendChild(div);
	tr.appendChild(td);
	return tr;
}


function getContract(response) {
	var contract = response.split("/yr - Exp. ")[1];
	try {
		contract = contract.split("</td>")[0];
                contract = contract.replace("season","Season");

	}
	catch (e) {
        contract = "Unsigned";
        //no contract
	}

    try {
        var offers = response.split('<a href="/game/offers')[1];
        offers = '<a href="/game/offers' + offers.split("</div>")[0];
        if (offers.indexOf("(0)") != -1) {
            offers = "";
        }
        else {
            contract += ", "+offers;
        }
    }
    catch (e) {
    }

    return contract;
}

function getCash(response) {
	var cash = response.split("Money:</span>")[1];	
	cash = cash.split("&")[0];
	cash = cash.split("").reverse().join("");
	for (var i=4; i<cash.length-2; i=i+4) {
		cash = cash.slice(0,i) + "," + cash.slice(i);
	}
	return cash.split("").reverse().join("");
}

function getTokens(response) {
	var tr = response.split('class="player_points_value"')[1];	
	tr = tr.split("</tr>")[0];
	var td = tr.split("<td>")[4];
	return td.split("</td>")[0];
}

function getPage(playerId, i, playertrainid){
	var address = "http://goallineblitz.com/game/player.pl?player_id=" + playerId;
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		var playerBox = document.getElementsByClassName("player_vitals");

  		var cash = getCash(this.responseText);
   		var tr = createRow("Cash:",cash);
   		playerBox[i].appendChild(tr);

   		var contract = getContract(this.responseText);
   		var tr = createRow("Contract:",contract);
   		playerBox[i].appendChild(tr);

   		var tokens = getTokens(this.responseText);
   		var tr = createRow("Tokens:",tokens);
   		playerBox[i].appendChild(tr);
   		
		var height = playerBox[i].rows[0].offsetHeight;
		var container = document.getElementsByClassName("player_box_vet");
		container[i].style.height = (container[i].offsetHeight + height*3)+"px";
	};

	req.send(null);
	return req;
}

