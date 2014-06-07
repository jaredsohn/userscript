// ==UserScript==
// @name           LiveHighlight
// @namespace      tmb
// @description    Highlights when there is a live radio stream
// @include        http*://*tmb.dj/*
// @include        http*://*themixingbowl.org/*
// ==/UserScript==

rows = document.getElementById('user_tt').getElementsByTagName('div');

for (var i = 0, l = rows.length; i < l; i++) {
 
 if(rows[i].innerHTML.indexOf('Live') > 0){
	rows[i].style.fontWeight = 'Bold';
	rows[i].getElementsByTagName('a')[0].style.fontWeight = 'Bold';
 }
}