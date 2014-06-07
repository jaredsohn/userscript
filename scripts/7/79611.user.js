// ==UserScript==
// @name           Ferion++
// @namespace      http://www.fabbricabinaria.it
// @description    Enhance your Ferion experience!
// @include        http://*.ferion.com/*
// @require        http://userscripts.org/scripts/source/44063.user.js
// ==/UserScript==

var infoplanets = $$('.tableout table a img');

var allplanets  = infoplanets.filter(function(item, index){ return item.getProperty('onmouseover').test('planet', 'i');});	//get planets only
var planets		= allplanets.filter(function(item, index){ return item.getProperty('onmouseover').test('<font class=wlink></font>', 'i');});
planets.each(function(item, index){
	if(item.getProperty('onmouseover').test('profit', 'i')) return;
	var parts 	= item.getProperty('onmouseover').split("\',\'");	//get first param only
	var popup 	= parts[0].split('<br>');
	var d_size  = popup.filter(function(item, index){ return item.test('size', 'i');});
	var size 	= d_size[0].split(':');
	var param	= size[1].split('/');
	var cost	= Math.round((param[0] * 10 * 40) / 3 - (250 * param[1]));
	parts[0]	+= '<hr>Profit/Tick : ' + cost + '<br>';				//calcs the profit
	
	var finalmsg = parts[0] + "','" + parts[1];
	item.setProperty('onmouseover', finalmsg);
});