// ==UserScript==
// @name           Ucturbo 补丁
// @namespace      scottxp@126.com
// @include        *
// ==/UserScript==

if(document.title=='(wmlbrowser)'){
	var inputs=document.getElementsByTagName('input');
	if(inputs.length==1 && inputs[0].value=='onenterforward'){
		inputs[0].click();
	}
}