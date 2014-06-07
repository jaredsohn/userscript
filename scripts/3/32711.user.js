// ==UserScript==
// @name XHamster Download
// @description Adds a small download button to every video on XHamster
// @author KayKay
// @namespace kk.tools
// @version 1cm
// @include        http://xhamster.com/movies/*
// @include        http://www.xhamster.com/movies/*
// ==/UserScript==

var pnl_qs = document.getElementById("voteProcessthank").parentNode.parentNode.lastChild.previousSibling.firstChild.nextSibling;
var pnl_dl = document.createElement("td");
var lnk_dl = document.createElement("a");
pnl_dl.style.fontSize = "14px";
pnl_dl.appendChild(lnk_dl);
pnl_qs.appendChild(document.createElement("tr").appendChild(pnl_dl));

lnk_dl.href = "#";
lnk_dl.addEventListener('click', function() { var link = "http://www.adultsload.net/popup.php?url=" + escape(window.document.location.href) + "&direct"; window.open(link,'FlashLoader','fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes,directories=no,location=no,width=800,height=600,top=100,left=100'); }, false);
lnk_dl.appendChild(document.createTextNode("Download this video"));