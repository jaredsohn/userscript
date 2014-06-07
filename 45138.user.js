// ==UserScript==
// @name           XHamster Direct Download
// @description    Adds a direct download link to every video on XHamster
// @author         Onur Güzel
// @namespace      http://www.onurguzel.com
// @version        1.0
// @include        http://xhamster.com/movies/*
// @include        http://www.xhamster.com/movies/*
// ==/UserScript==

var pnl_qs = document.getElementById("voteProcessthank").parentNode.parentNode.lastChild.previousSibling.firstChild.nextSibling;
var pnl_dl = document.createElement("td");
var lnk_dl = document.createElement("a");
var script_dl = document.createElement("script");
pnl_dl.style.fontSize = "14px";
pnl_dl.appendChild(lnk_dl);
pnl_qs.appendChild(document.createElement("tr").appendChild(pnl_dl));

lnk_dl.href = "javascript:{window.location = 'http://dl'+so.variables['srv']+'.xhamster.com/flv2/'+so.variables['file'];}";
lnk_dl.appendChild(document.createTextNode("Download this video!"));