// ==UserScript==
// @name           ForoBeta LiveNotificaciones
// @namespace      hide_liveforobeta
// @include        http://forobeta.com/*
// ==/UserScript==
// by Cicklow

var scriptCode = new Array();
scriptCode.push('function ln_checknotifications () { } function ln_onsuccess(){ }');
var script = document.createElement('script');
script.innerHTML = scriptCode.join('\n');
scriptCode.length = 0;
if(document.getElementById('header')!=null){
	document.getElementById('livenotifications').innerHTML = '';
	document.getElementById('header').appendChild(script);
}
