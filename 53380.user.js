// ==UserScript==
// @name           Add Level To EQ Fund (test)
// @namespace      pbr_eqf
// @include        http://goallineblitz.com/game/team_item_fund.pl?team_id=*
// @version        09.02.24
// ==/UserScript==

/*
 * 
 * pabst did this 10/13/08+
 * 
 */

window.setTimeout( function() {
	main();
}, 100);

function main() {
	var tbl = document.getElementById("allowances");
	var rows = tbl.getElementsByTagName("tr");

	for (var i=0; i<rows.length; i++) {
		var c = rows[i].cells[1];
		var lvl = rows[i].insertCell(1);
		lvl.innerHTML = "LVL";
	}

	var options = document.getElementsByTagName("option");
	for (var i=0; i<options.length; i++) {
		if (options[i].value == "player_first") {
			options[i].text = "Player first"
		}
		else if (options[i].value == "team_first") {
			options[i].text = "EQFund first"
		}
		else if (options[i].value == "team_emergency") {
			options[i].text = "EQFund only if short"
		}
	}

    showBalances();

	var id = window.location.toString().slice(window.location.toString().indexOf("team_id=")+"team_id=".length);
	var addr = "http://goallineblitz.com/game/roster.pl?team_id="+id;
	getInetPage(addr, parsePlayerFromRoster,null);
}

function showBalances() {
    var allowances = 0;
    var inputs = document.getElementsByTagName("input");
    for (var i=1; i<inputs.length; i++) {
        if (inputs[i].type == "text") {
            allowances += parseFloat(inputs[i].value);
        }
    }

    var balances = document.getElementsByClassName("points");
    var fund = balances[0].lastChild.textContent;
    fund = fund.replace(" ","");
    fund = fund.replace("$","");
    while (fund.indexOf(",") != -1) fund = fund.replace(",","");
    fund = parseInt(fund);

    var b = document.createElement("b");
    b.innerHTML = "Player Allowances: ";
    var div = document.createElement("div");
    div.setAttribute("class","points");
    div.appendChild(b);
    div.innerHTML += "$" + addCommas(allowances.toFixed(2));

    var b2 = document.createElement("b");
    b2.innerHTML = "Fund Balance: ";
    var div2 = document.createElement("div");
    div2.setAttribute("class","points");
    div2.appendChild(b2);
    div2.innerHTML += "$" + addCommas((fund - allowances).toFixed(2));

    balances[1].parentNode.insertBefore(div2,balances[1].nextSibling);
    balances[1].parentNode.insertBefore(div,div2);
}


function addCommas(nStr){
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
    	x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function parsePlayerFromRoster(address, page) {
    //console.log("parsePlayerFromRoster("+address+")");
	var s = document.getElementById("storage:"+address);
	if (s == null) {
		var footer = document.getElementById("footer");
		var div = document.createElement("div");
		div.setAttribute("id","storage:"+address);
		div.setAttribute("style","visibility: hidden; display:none;");
		div.innerHTML = page.responseText;
		footer.appendChild(div);
	}

	
	var playerLinks = [];
	var s = document.getElementById("storage:"+address);
	var l = s.getElementsByClassName("player_name_short");
	//console.log("player_name's found="+l.length);
	for (var pidx=0; pidx<l.length; pidx++) {
		//console.log("pidx="+pidx);
		var p = l[pidx];
		if (p.parentNode == null) continue;
		
		var name = p.firstChild.innerHTML;
		var pos = p.parentNode.getElementsByClassName("player_position")[0].firstChild.innerHTML;
		var lvl = p.parentNode.getElementsByClassName("player_level")[0].innerHTML;
		//console.log("npl='"+name+"' | '"+pos+"' | '"+lvl);
		
		while (pos.length < 4) { pos += "&nbsp;"; }
		var html = "<span class=\"cpu\">"+pos+"</span>"+name;
		playerLinks.push([html,lvl]);
		
	}
	if (l.length == 0) {
		l = s.getElementsByClassName("player_name");
		//console.log("player_name's found="+l.length);
		for (var pidx=0; pidx<l.length; pidx++) {
			//console.log("pidx="+pidx);
			var p = l[pidx];
			if (p.parentNode == null) continue;
		
			var name = p.firstChild.innerHTML;
			var pos = p.parentNode.getElementsByClassName("player_position")[0].firstChild.innerHTML;
			var lvl = p.parentNode.getElementsByClassName("player_level")[0].innerHTML;
			//console.log("npl='"+name+"' | '"+pos+"' | '"+lvl);
		
			while (pos.length < 4) { pos += "&nbsp;"; }
			var html = "<span class=\"cpu\">"+pos+"</span>"+name;
			playerLinks.push([html,lvl]);
		
		}
	}
	//console.log("loop end");
	addPositionsToTables(playerLinks);
}

function addPositionsToTables(players) {
	var selects = document.getElementsByTagName("select");
	var ptext = new Array();
	for (var i=0; i<players.length; i++) {
		ptext.push(players[i]);
	}
	
	//0 is team name
	for (var i=1; i<selects.length; i++) {
		var par = selects[i].parentNode.parentNode;
		
		var str = par.childNodes[1].innerHTML;
		if (str == null) continue;
		var idx1 = str.indexOf("/game/player.pl?player_id=");
		if (idx1 == -1) continue;
		str = str.slice(idx1);
		
		var idx2 = str.indexOf("\">");
		if (idx2 == -1) continue;
		str = str.slice(0,idx2);
		
		for (var p=0; p<ptext.length; p++) {
			if (ptext[p][0].indexOf(str) != -1) {
				par.childNodes[1].innerHTML = ptext[p][0];				
				par.childNodes[3].innerHTML = ptext[p][1];
				ptext.splice(p,1);
				break;
			}
		}
	}
}

function getInetPage(address, func, target) {
	var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onreadystatechange = function() {
		if (target != null) {
			var d = ["..","...","."];
			var str = target.innerHTML.split(" ");
			target.innerHTML = str[0]+" "+d[str[1].length-1];
    	}
	};
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
			func(address,this);
		}
	};
	
	req.send(null); 
	return req;
}

