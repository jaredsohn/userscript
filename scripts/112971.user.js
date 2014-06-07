// ==UserScript==
// @name           Google Hide Location Data
// @namespace      location data
// @description    Your location: none of anyone's business!
// @version        1.0
// @license        MIT License
// @include        http://*.google.*
// @include        http://google.*
// @include        https://*.google.*
// @include        https://google.*

// ==/UserScript==

//build new css
var newStyle = document.createElement('style');
newStyle.type = 'text/css';
newStyle.innerHTML = '\
    	.lnsep{visibility:hidden;float:left;margin-bottom:.5em;margin-top:.5em;}\
		#lc{display:none!important;}\
		#pslocdisp {display:none!important;}\
		#taw div{display:none!important;}\
    ';
//insert it
document.getElementsByTagName('head')[0].appendChild(newStyle);

var elmDeleted = document.getElementById("lc");
	elmDeleted.parentNode.removeChild(elmDeleted);
var elmDeleted = document.getElementById("pslocdisp");
	elmDeleted.parentNode.removeChild(elmDeleted);
var elmDeleted = document.getElementById("taw");
	elmDeleted.parentNode.removeChild(elmDeleted);	
