// ==UserScript==
// @name           Grepolis Report Converter
// @include        http://*.grepolis.com/game*
// @exclude        view-source://*
// @version        2.1.0
// ==/UserScript==

void(function(){
	var t=document.createElement('script');
	t.type='text/javascript';
	t.innerHTML = 	"//<![CDATA[\n"+
			"   var RepConvScriptName = ($('img#version').length > 0) ? 'v2/RepConvJSV2.js' : 'RepConvJSV1.js';\n" +
			"   var t=document.createElement('script');\n" +
			"   t.type='text/javascript';\n" +
			"   t.src='http://www.potusek.eu/grepolis/scripts/'+RepConvScriptName+'?_'+Math.floor(Math.random()*11);\n" +
			"   document.body.appendChild(t);\n" +
			"//]]>";
	document.body.appendChild(t);
})();
