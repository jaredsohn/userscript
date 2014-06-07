// ==UserScript==
// @name       LfFeatures
// @namespace  lingvoforum
// @version    1.0.4
// @include    http://lingvoforum.net*
// ==/UserScript==

if(document.domain == "lingvoforum.net")
{
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "http://teilnehmer.somee.com/LfFeatures/Content/LfFeaturesUserScript.js";
	head.appendChild(script);
}
