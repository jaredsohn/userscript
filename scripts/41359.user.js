// ==UserScript==
// @name           PortalHacker Sacar Firmas CLASS
// @namespace      zack0zack
// @description    PortalHacker Sacar Firmas CLASS
// @include        *foro.PortalHacker.net*
// ==/UserScript==


var i;
var v = document.getElementsByTagName("div");
for (i = v.length-1; i>=1; i--){
	if (v[i].className=="signature"){
		v[i].parentNode.removeChild( v[i] );
	}
}
