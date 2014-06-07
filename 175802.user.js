// ==UserScript==
// @name           Datownik/Zegar do screenów
// @namespace      http://www.fotka.pl/profil/suchar/
// @description    dodaje datę i godzinę pod menu celem wiarygodności screenów
// @include        http://www.fotka.pl/*
// @version        1.0
// @copyright      2013+, suchar
// @author         suchar
// @run-at         document-end
// @grant          unsafeWindow
// ==/UserScript==

var u = unsafeWindow
var $ = u.$;
if (document.getElementById("content")){	// czy to nie popup?
    pokazZegar();
    zegarek();
}

function pokazZegar(){
    var zegar = document.createElement("div");
    zegar.style.margin = "auto";
    zegar.style.display = "table";
    zegar.style.fontSize = "16px";
    zegar.style.color = "#4996ba";
    zegar.id = "zegar";
    zegar.innerHTML = "15-08-2013 12:31";
    var content = document.getElementById("content");
    if (document.getElementById("page-top-gradient")){	// czy to nie popup?
        $("#page-top-gradient").before(zegar);
    } else {
        $("#content").before(zegar);
    }
}

function zegarek(){
    var D = new Date();
    G = D.getHours(); G=G<10?'0'+G:G;
    M = D.getMinutes(); M=M<10?'0'+M:M;
    S = D.getSeconds(); S=S<10?'0'+S:S;
    r = D.getFullYear();
    m = D.getMonth(); m=m+1; m=m<10?'0'+m:m;
    d = D.getDate(); d=d<10?'0'+d:d;
    document.getElementById("zegar").innerHTML= d + "/" + m + "/" + r + " &nbsp" + G + ":" + M + ":" +S;
    setTimeout(function () {zegarek();}, 1000);
}
