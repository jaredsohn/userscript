// ==UserScript==
// @name           EuroGamer Rei Sign Hider
// @namespace      http://eurogamer.it/*
// @description    Ignora_la_firma_di_quel_nabbo_di_rey_v1.0_smugjump:  < descrizione ® by nandos
// @include        http://www.eurogamer.it/*
// @author	   demonbl@ck
// ==/UserScript==

//====== nasconde i div della sign

var signe= document.getElementsByClassName('sig');
var toreplace='<img src="http://www.uptiki.com/images/kafme7v23cxqf6n8gocv.gif">';
var replacewith='<p style="font-weight: bold;font-size: 200%; color: #cc0000;">Sono nabbo!</p>';

for(var i=0;i<signe.length;i++){
var element = signe[i];
var aid=element.innerHTML;
aid=aid.replace(toreplace,replacewith);
element.innerHTML=aid;}