// JavaScript Document
// ==UserScript==
// @name RedTube Download
// @description Download RedTube Videos
// @author porntubevideo.info
// @namespace porntubevideo.info
// @version 1.0
// @include        http://redtube.com/*
// @include        http://www.redtube.com/*
// ==/UserScript==



var pnl_qs = document.getElementById("ratetext").parentNode.parentNode.lastChild.firstChild.firstChild.firstChild;
var pnl_dl = document.createElement("tr");
var lnk_dl = document.createElement("a");
lnk_dl.style.color = "rgb(160, 160, 160)";
lnk_dl.style.fontFamily = "Tahoma,Helvetica,Arial";
lnk_dl.style.fontWeight = "bold";
lnk_dl.style.fontSize = "12px";
lnk_dl.style.Color = "yellow";

pnl_dl.appendChild(document.createElement("td"));
pnl_dl.appendChild(document.createElement("td").appendChild(lnk_dl));
pnl_dl.appendChild(document.createElement("td"));
pnl_qs.appendChild(pnl_dl);


lnk_dl.href = "#";
lnk_dl.addEventListener('click', function() { var link = "http://redtube.porntubevideo.info/index.php?str=" + escape(window.document.location.href) + "&direct"; window.open(link,'FlashLoader','fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes,directories=no,location=no,width=800,height=600,top=100,left=100'); }, false);
lnk_dl.appendChild(document.createTextNode("Download  video"));