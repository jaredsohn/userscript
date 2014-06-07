// ==UserScript==
// @name           Mapa
// @namespace      dw.js.gm
// @include        http://annihilation.pl/mal.php?a=adventure*
// @include        http://s2.annihilation.pl/?a=adventure*
// @include        http://www.annihilation.pl/mal.php?a=adventure*
// @require         http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

var local_version = new Number(0.2);
var newVersion = false;

//alert("Actualizar");
GM_xmlhttpRequest({
    method: "GET",
    url: 'http://docs.google.com/View?id=dfmmdb8x_17dg63vgfg',
    headers:{
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type':'application/x-www-form-urlencoded'
    },
    data:'',
    onload:function(result) {
        var res = result.responseText;
        var start_pos = res.indexOf("*Version");
        var stop_pos = res.indexOf("*", start_pos + 1);
        var server_version = new Number(0);
        server_version = res.substr(start_pos + 8, (stop_pos - start_pos - 8 ));
        if (server_version > local_version){

            $(".mappanel").before("<a href=\"http://userscripts.org/scripts/source/75438.user.js\" style=\"color: red; font-size: 200%\" target=\"_blank\">Zainstaluj  now\u0105 wersj\u0119 skryptu</a>");
        }
    }
});

window.addEventListener("load", wykonaj2, false);

function wykonaj2() {
    var s = $("div.loc_num").text();
    var num = parseInt(s.substring(8, s.length));
    dodajPanel(num);
}

function dodajPanel(num) {
    $("div.akcje").after("<div class=\"mappanel\"></div>");
    var frame = "<iframe id=\"RSIFrame\" src =\"" + "http://annimaps.ugu.pl/maps.php?loc=" + num + "\" style=\"border: 0px none; width: 500px; height: 300px;\"></iframe>";
    $(".mappanel").html(frame);
}
