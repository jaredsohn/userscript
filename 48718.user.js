// ==UserScript==
// @name           Ikariam Fast Link RO
// @version        0.4
// @description    With this script you will be able to manage some fast link in a sidebar.First insert the link of the page and the a tag to recognize it.
// @author         Sora101
// @e-mail         evilteam@techis.org
// @include        http://*s*.ikariam.*
// @exclude 	   http://ikariam.*
// @exclude        http://*board.ikariam.*/*
// ==/UserScript==

function CreaMenu() {
	var start, newElement;
	//start = document.body;
	start=document.getElementById("GF_toolbar");
	var ndiv = document.createElement('div');
	
	//ndiv.style.setAttribute('cssText', 'left:150px; top:150px;', 0);
	ndiv.setAttribute('style', 'position: fixed; background-color:#e3ae63; top:0px;border-width:thin; border-style:solid;') ;
	
	var nextlink=GM_getValue("Link" + maxlink, "");
	var nexta=GM_getValue("a" + maxlink, "");
	
	while(nextlink != ""){
		ndiv.innerHTML += "<a id='"+nextlink+"' href='"+nextlink+"'>"+nexta+"</a><br> ";
		maxlink++;
		nextlink=GM_getValue("Link" + maxlink, "");
		nexta=GM_getValue("a" + maxlink, "");
	}
	
	var invb = document.createElement('input');
	invb.value="Adauga";
	invb.type="button";
	
	var cancb = document.createElement('input');
	cancb.value="Sterge";
	cancb.type="button";
	
	ndiv.appendChild(invb);
	ndiv.appendChild(cancb);
	start.appendChild(ndiv);
	//start.insertBefore(ndiv, start.nextSibling);//.nextSibling
	
	invb.addEventListener('click', agg, true);
	cancb.addEventListener('click', canc, true);
}

function agg(){
	GM_setValue("Link"+maxlink, prompt("Link:", ""));
	GM_setValue("a"+maxlink, prompt("Tag:", ""));
	window.location.reload();
}
function canc(){
	GM_setValue("Link"+(maxlink-1), "");
	window.location.reload();
}

var act=GM_getValue("Server", "no");
var maxlink=0;

CreaMenu();