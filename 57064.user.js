// ==UserScript==
// @name           10minutosMendigo
// @namespace      By Basti1012 adaptado por Joak.i.ng
// @description    Boton rápido para recoger chatarra cada 10 minutos
// @include http://*ogame.*/*
// @include        *://*.mendigogame.es/*
// @include        *mendigogame.es*
// @include        http://mendigogame.es*
// @include        *://*mendigogame.es/*
// ==/UserScript==

var li = document.getElementsByTagName("form")[1].getElementsByTagName('div')[0];

var hoch = '200';
var breit = '50';

function fclick(ev) {
GM_setValue("fsave","true")
top.location.href= '/activities/';
}      

document.getElementsByClassName("icon crowncap")[0].innerHTML = '<input type="button" value="10 Minutos" id="sammeln" style="position:absolute;top:'+hoch+'px;right:'+breit+'px;padding:0px;" onklick="function fclick(ev)" >'
document.getElementById('sammeln').addEventListener('click',fclick,false); 

var fnow = GM_getValue("fsave", "false");
if (fnow  == "true")
{
var fnow = "false";
GM_setValue("fsave", "false");	
var finputButton = document.getElementsByName('Submit2')[0];
finputButton.click();
}

// copiright by basti1012 fixed by boggler 