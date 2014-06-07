// ==UserScript== 
// @name XHamster Download 
// @description Adds a small download button to every video on XHamster 
// @author KayKay modified by Boblemur 
// @namespace kk.tools 
// @version 1cm 
// @include http://xhamster.com/movies/* 
// @include http://www.xhamster.com/movies/* 
// ==/UserScript==

function get_url() 
{ 
var scripts = document.getElementsByTagName('script'); 
for(var a = 0; a < scripts.length; a++) 
{ 
if(scripts[a].text.indexOf("new SWFObject") != -1){ 
var file = scripts[a].text.split("'file','")[1].split("');")[0]; 
var svr = scripts[a].text.split("'srv','")[1].split("');")[0]; 
return "http://dl" + svr + ".xhamster.com/flv2/" + file;

} 
} 
}

var pnl_qs = document.getElementById("voteProcessthank").parentNode.parentNode.lastChild.previousSibling.firstChild.nextSibling; 
var pnl_dl = document.createElement("td"); 
var lnk_dl = document.createElement("a"); 
pnl_dl.style.fontSize = "14px"; 
pnl_dl.appendChild(lnk_dl); 
pnl_qs.appendChild(document.createElement("tr").appendChild(pnl_dl));

lnk_dl.href = get_url(); 
lnk_dl.appendChild(document.createTextNode("Download this video(right click, save as)"));

