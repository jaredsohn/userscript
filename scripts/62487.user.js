// ==UserScript== 
// @name XHamster Download 2009-11-21
// @description adds a direct download link on video page 
// @author KayKay modified by vigilancer
// @namespace xhamster.com 
// @include http://xhamster.com/movies/* 
// @include http://www.xhamster.com/movies/* 
// ==/UserScript==

function get_url(){ 
var scripts = document.getElementsByTagName('script'); 
for(var i=0;i<scripts.length;i++) { 
	if(scripts[i].text.indexOf("flashvars") != -1){
		var svr = scripts[i].text.split("'srv': '")[1].split("',")[0];
		var file = scripts[i].text.split("'file': '")[1].split("',")[0];
		return svr+"/flv2/"+file;
	}
}
}

var pnl_qs = document.getElementById("bottom_player_adv").parentNode.parentNode.lastChild.previousSibling.firstChild.nextSibling; 
var pnl_dl = document.createElement("td"); 
var lnk_dl = document.createElement("a"); 
pnl_dl.style.fontSize = "14px"; 
pnl_dl.appendChild(lnk_dl); 
pnl_qs.appendChild(document.createElement("tr").appendChild(pnl_dl));

lnk_dl.href = get_url(); 
lnk_dl.appendChild(document.createTextNode("Download this video(right click, save as)"));

