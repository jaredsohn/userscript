// ==UserScript==
// @name           Travian 4 ☣ Attacker Name Revealer
// @namespace      http://userscripts.org/users/103897
// @description    Shows the names of the attacker, not only town name, in the Rally Point
// @include        http://*.travian.*/build.php*gid=16*
// @include        http://*.travian.*/build.php?id=39*
// @author         Jinnie & Esprit
// @version        0.2.2
// ==/UserScript==


var townCache = [];

// be nice to others
setTimeout(letsPlay, 0);

function letsPlay(){
    var townTables = fastEval('//table[@class="troop_details inAttack"]', document);
	for ( var i=0 ; i < townTables.snapshotLength; i++ ){
        var table = townTables.snapshotItem(i);
        var town = fastEval('thead/tr/td[@class="role"]/a', table).snapshotItem(0);
        if(!town) {continue;} //???
        var href = town.getAttribute("href");
        if(!href) { continue;}
        var name = townCache[href];
        if(!name){
            var ret = httpGet(href);
            var res = ret.match(/<td><a href=\"spieler\.php[^\/]+\/a/);
			var spieler = [res[0].substring(10).match(/>([^<]+)</)[1], res[0].substring(10).match(/\?uid=(\d+)/)[1]];
			res = ret.match(/<td><a href=\"allianz\.php[^\/]+\/a/);
			var allianz = [res[0].substring(10).match(/>([^<]+)</)[1], res[0].substring(10).match(/\?aid=(\d+)/)[1]];
            townCache[href] = [spieler, allianz];
		} else {
			spieler = name[0];
			allianz = name[1];
		}
        var num = href.match(/d=(\d+)/)[1];
        var coords = getCoordsByNum(num);

        var coordPane = town.parentNode;
		coordPane.childNodes[1].innerHTML += " (" + coords.x + "|" + coords.y + ")";

        var namePane = fastEval('tbody[@class="units"]/tr/th', table).snapshotItem(0);
        namePane.removeChild(namePane.firstChild);
        namePane.removeChild(namePane.firstChild);
		
		var splr = document.createElement("a");
		splr.setAttribute('href', 'spieler.php?uid='+spieler[1]);
		splr.style.fontWeight = "bold";
		splr.appendChild(document.createTextNode(spieler[0]));
		
		var allnz = document.createElement("a");
		allnz.setAttribute('href', 'allianz.php?uid='+allianz[1]);
		allnz.style.fontWeight = "bold";
		allnz.appendChild(document.createTextNode(allianz[0]));
        
		namePane.appendChild(splr);
        namePane.appendChild(document.createTextNode(' - '));
        namePane.appendChild(allnz);
    }
}

// Utils

function getCoordsByNum(num){
   var res = {};
   res.x = ((num-1) % 801) - 400;
   res.y = 400 - Math.floor((num-1) / 801);
   return res;
}

function httpGet(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send("");
  return xhttp.responseText;
}

function fastEval(xpath, context){
  return document.evaluate(xpath, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
