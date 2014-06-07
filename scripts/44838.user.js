// ==UserScript==
// @name          amapsysWunschpreis
// @namespace     http://www.amapsys.de/
// @description   Wunschpreis-Popup fuer Amazon.de Seiten
// @include       http://amazon.de/*
// @include       http://www.amazon.de/*
// ==/UserScript==
var asin = document.getElementById('ASIN').value;
var pBlock = document.getElementById("priceBlock");
if (pBlock && asin) {
    var amaLink = document.createElement('div');
    amaLink.innerHTML = '<div id="amaLink" style="color:#000099;border: 3px outset #4169af;padding:5px;">'+
    '<img src="http://www.amapsys.de/favicon.ico" align="absmiddle">&nbsp;'+
    '<a href="javascript:window.open(\'http://www.amapsys.de/amaquickclone.php?u=\'+escape(location.href),\'Wunschreis\',\'width=420,height=340,status=no\');location.href=\'http://www.amapsys.de/amabacklink.php?u=\'+escape(location.href);">'+
    '<b>Artikel bei Amapsys.de &uuml;berwachen</b>'+
    '</a></div>';
    pBlock.parentNode.insertBefore(amaLink, pBlock.nextSibling);
}
