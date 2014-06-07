//
// ==UserScript==
// @name          amapsyscoukWunschpreis
// @namespace     http://www.amapsys.co.uk/
// @description   Wunschpreis-Popup fuer Amazon.co.uk Seiten
// @include       http://amazon.co.uk/*
// @include       http://www.amazon.co.uk/*
// ==/UserScript==

var asin = document.getElementById('ASIN').value;
var pBlock = document.getElementById("priceBlock");
if (pBlock && asin) {
    var amaLink = document.createElement('div');
    amaLink.innerHTML = '<div id="amaLink" style="color:#000099;border: 3px outset #4169af;padding:5px;">'+
    '<img src="http://www.amapsys.co.uk/favicon.ico" align="absmiddle">&nbsp;'+
    '<a href="javascript:window.open(\'http://www.amapsys.co.uk/amaquickclone.php?u=\'+escape(location.href),\'Wishprice\',\'width=420,height=340,status=no\');location.href=\'http://www.amapsys.co.uk/amabacklink.php?u=\'+escape(location.href);">'+
    '<b>Watch this item with Amapsys.co.uk</b>'+
    '</a></div>';
    pBlock.parentNode.insertBefore(amaLink, pBlock.nextSibling);
}


