// ==UserScript==
// @name           pantip post setting
// @namespace      http://www.userscripts.org/people/171
// @include        http://www.pantip.com/cafe/*
// ==/UserScript==

var mes = document.getElementsByName("message")["0"];
var ali = document.getElementsByName("align")["0"];
var col = document.getElementsByName("color")["0"];

function savSet(){

	GM_setValue('message', mes.value); 
	GM_setValue('color', col.selectedIndex); 
	GM_setValue('align', ali.selectedIndex); 
	alert("complete!!! save post setting");
}

var m = GM_getValue('message');
var a = GM_getValue('align');
var c = GM_getValue('color');

if(m != undefined || a != undefined || c != undefined ){

	if(!window.location.href.toLowerCase().match("writeboard.php")) {
		mes.value = m;
	}

	ali.options[a].selected = true;
	col.options[c].selected = true;

}

var zbox = document.createElement("b");
zbox.innerHTML ="  <input name='savSet' id='savSet' type='button' value='save post setting' /> ";

var prew = document.getElementsByName("step")["0"];
prew.parentNode.insertBefore(zbox,prew.nextSibling);

document.getElementById('savSet').addEventListener("click", savSet, true);