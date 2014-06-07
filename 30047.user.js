// ==UserScript==
// @name           Show url
// @namespace      *
// @description   This script shows url of page
// @version      1
// @date          2008-14-08
// @include        *
// ==/UserScript==

var el=document.createElement("div");
var eltext=document.createTextNode(location.href+" ");
var el2=document.createElement("nobr");
var cb=document.createElement("button");
var cbtext=document.createTextNode("Close");

cb.setAttribute("onClick","document.getElementById('elhref').style.display='none';");
el.setAttribute("id","elhref");
el.setAttribute("style","height:24px;background-color:white;border:1px black solid;z-index:20;position:absolute;top:0;left:0;padding-left:20px;");

cb.appendChild(cbtext);
el2.appendChild(eltext);
el2.appendChild(cb);
el.appendChild(el2);

document.documentElement.appendChild(el);