// ==UserScript==
// @name           10minutos
// @namespace      mendigogame
// @description    Boton rápido para recoger chatarra cada 10 minutos
// @include http://*ogame.*/*
// @include        *://*.mendigogame.es/*
// @include        *mendigogame.es*
// @include        http://mendigogame.es*
// @include        *://*mendigogame.es/*
// ==/UserScript==

function fclick10(ev) {	
	GM_setValue("fsave10","true");
	top.location.href= '/activities/';	
}

function fclickD(ev) {	
	GM_setValue("fsaveD","true");
	top.location.href= '/activities/';	
}

var div = document.getElementById('infoscreen');
var navi = div.getElementsByTagName('li')[6];

var fbutton10 = document.createElement("input");
fbutton10.type = 'button';
fbutton10.value = '10';
fbutton10.addEventListener('click', fclick10, false);

navi.appendChild(fbutton10);

var divNavi = document.getElementById('navigation');
var ulTag = divNavi.getElementsByTagName('ul')[0];
var liTag = document.createElement("li");

var linkD = document.createElement('a');
linkD.setAttribute('href', '#');
linkD.innerHTML = 'Desbloqueo';
linkD.addEventListener('click', fclickD, false);

liTag.appendChild(linkD);
ulTag.appendChild(liTag);

if (GM_getValue("fsave10") == "true") {
	top.location.href= "javascript:setupForm('/activities/bottle/');";		
	GM_setValue("fsave10", "false");		
	var finputButton = document.getElementsByName("Submit2")[0];
	finputButton.disabled=false;
	finputButton.click();
}

if (GM_getValue("fsaveD") == "true") {	
	GM_setValue("fsaveD", "false");
	var finputButton = document.getElementsByName("Submit2")[0];
	finputButton.value = "Ir a recoger";
	finputButton.disabled = false;	
}
