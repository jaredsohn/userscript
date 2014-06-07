// ==UserScript==
// @name ksta.de/Kölner Stadtanzeiger comment extender
// @author mihau
// @version 1.1
// @description zeigt vollautomatisch alle kommentare und zitate an die vorher benutzerunfreundlich durch html/css/javascript versteckt bzw verdeckt sind und sortiert sie aufsteigend (eingangsreihenfolge)
// @include http*://www.ksta.de/*
// ==/UserScript==

function kstademain() {

dm.postForm('formCommentDisplayAll','commentContainer',false);

setTimeout("kstaexpanda()", 1000);
}

function kstaexpanda() {

dm.postForm('formToggleOrder','commentContainer', false);

setTimeout("kstaexpandb()", 1500);
}

function kstaexpandb() {

var kommentare=document.getElementsByClassName("TBComments")[0].innerHTML;

kommentare=kommentare.replace(/[^\d.]/g, "");

kommentare=parseInt(kommentare);

kommentare = kommentare +1;

for (var i = 0; i < kommentare; i++){


if (document.getElementById(eval('"commFullText' + i + '"'))) { document.getElementById(eval('"commFullText' + i + '"')).style.display = "block"; document.getElementById(eval('"commText' + i + '"')).style.display = "none"; }


}

window.scrollBy(0,-10000);
}

document.addEventListener("DOMContentLoaded", kstademain, false);
