// ==UserScript==
// @name           Travian ☣ Attacker Name Revealer
// @namespace      http://userscripts.org/users/103897
// @description    Shows the names of the attacker, not only town name, in the Rally Point
// @include        http://*.travian.*/build.php*gid=16*
// @include        http://*.travian.*/build.php?id=39*
// @author         Jinnie
// @version        0.1.1
// ==/UserScript==


var townCache = [];

// be nice to others
setTimeout(letsPlay, 0);

function letsPlay(){
    var townTables = fastEval('//table[thead/tr/td/@class="role"]', document);
    for ( var i=0 ; i < townTables.snapshotLength; i++ ){
        var table = townTables.snapshotItem(i);
        var town = fastEval('thead/tr/td[@class="role"]/a', table).snapshotItem(0);
        if(!town) {continue;} //???
        var href = town.getAttribute("href");
        if(!href) {continue;}
        var name = townCache[href];
        if(!name){
            var res = httpGet(href);
            res = res.match(/<td><a href=\"spieler\.php[^\/]+\/a/);
            name = res[0].substring(10).match(/>([^<]+)</)[1];
            townCache[href] = name;
        }
        var num = href.match(/d=(\d+)&/)[1];
        var coords = getCoordsByNum(num);

        var coordPane = town.parentNode;
        coordPane.appendChild(document.createElement("br"));
        coordPane.appendChild(document.createTextNode("(" + coords.x + "|" + coords.y + ")"));

        var namePane = fastEval('tbody[@class="units"]/tr/th', table).snapshotItem(0);
        namePane.style.fontWeight = "bold";
        namePane.style.textAlign = "center";
        namePane.removeChild(namePane.firstChild);
        namePane.appendChild(document.createTextNode(name));
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
