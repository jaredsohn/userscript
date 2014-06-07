// ==UserScript==
// @name           AnniMaps for Opera
// @namespace      dw.js.gm
// @include        http://annihilation.pl/mal.php?a=adventure*
// @include        http://s2.annihilation.pl/?a=adventure*
// ==/UserScript==

var page = "annihilation.pl/mal.php?a=adventure";
var page2 = "s2.annihilation.pl/?a=adventure";

function onPage() {
    var url = window.top.location.href;
    if (url.indexOf(page, 0)>-1||url.indexOf(page2, 0)>-1) return true;
    else return false;
}

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

window.addEventListener("load", wykonaj, false);

function after(elem, a) {
    a.parentNode.insertBefore(elem, a.nextSibling);
}

function wykonaj() {
    if (!onPage()){
        return;
    }
    var s = xpath("//div[@class='loc_num']").snapshotItem(0).innerHTML;
    var num = parseInt(s.substring(8, s.length));
    dodajPanel(num);

}

function dodajPanel(num){
    var div = xpath("//div[@class='akcje']").snapshotItem(0);
    var panel = document.createElement("div");
    panel.setAttribute("class", "mappanel");
    after(panel,div);
    var frame = "<iframe id=\"RSIFrame\" src =\"" + "http://annimaps.ugu.pl/maps.php?loc=" + num + "&key="+Math.random()+"\" style=\"border: 0px none; width: 500px; height: 300px;\"></iframe>";
    panel.innerHTML = frame;

}
