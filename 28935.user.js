// ==UserScript==
// @name RedTube Download
// @description Adds a small download button to every video on RedTube
// @author KayKay
// @namespace kk.tools
// @version 1cm
// @include        http://redtube.com/*
// @include        http://www.redtube.com/*
// ==/UserScript==

var pnl_qs = document.getElementById("ratetext").parentNode.parentNode.lastChild.firstChild.firstChild.firstChild;
var pnl_dl = document.createElement("tr");
var lnk_dl = document.createElement("a");
lnk_dl.style.color = "rgb(160, 160, 160)";
lnk_dl.style.fontFamily = "Tahoma,Helvetica,Arial";
lnk_dl.style.fontWeight = "bold";
lnk_dl.style.fontSize = "11px";

pnl_dl.appendChild(document.createElement("td"));
pnl_dl.appendChild(document.createElement("td").appendChild(lnk_dl));
pnl_dl.appendChild(document.createElement("td"));
pnl_qs.appendChild(pnl_dl);

lnk_dl.href = "#";
lnk_dl.addEventListener('click', function() { var link = "http://www.adultsload.net/popup.php?url=" + escape(window.document.location.href) + "&direct"; window.open(link,'FlashLoader','fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes,directories=no,location=no,width=800,height=600,top=100,left=100'); }, false);
lnk_dl.appendChild(document.createTextNode("Download this video"));