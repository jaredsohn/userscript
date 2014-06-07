// ==UserScript==
// @name           Random Orkut Themes
// @namespace      http://www.devilsworkshop.org/2008/06/02/new-greasemonkey-script-to-change-orkut-themes-randomly/
// @author 	   Diogok [Edited By Gautam & Rahul Bansal]
// @description    It randomly displays any orkut theme automatically
// @include        http://*.orkut.*/*
// @exclude        *.js
// ==/UserScript==

function CssApply(linkCss){
	void(CSS = document.createElement('link'));
	void(CSS.rel = 'stylesheet');
	void(CSS.href = linkCss);
	void(CSS.type = 'text/css');
	void(document.body.appendChild(CSS));
	};
csslinks = new Array("http://img3.orkut.com/skins/gen/beach001.css","http://img3.orkut.com/skins/gen/country_side001.css","http://img2.orkut.com/skins/gen/seasonal001.css","http://img2.orkut.com/skins/gen/snowman001.css","http://img2.orkut.com/skins/gen/bus_stop001.css","http://img2.orkut.com/skins/gen/winter001.css","http://img2.orkut.com/skins/gen/autumn001.css","http://img2.orkut.com/skins/gen/aja_tiger001.css","http://img2.orkut.com/skins/gen/jr001.css","http://img2.orkut.com/skins/gen/tea_house001.css","http://img3.orkut.com/skins/gen/solar001.css");
var a=Math.random()*11;
a=Math.floor(a);
CssApply(csslinks[a]);

