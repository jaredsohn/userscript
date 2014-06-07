// ==UserScript==
// @name           PortalHacker Remove iframes
// @namespace      http://userscripts.org/users/26666
// @copyright      zack0zack
// @include        *foro.PortalHacker.net*
// ==/UserScript==

var i;
var v = document.getElementsByTagName('iframe');
for (i = v.length-1; i>=1; i--){
	v[i].parentNode.removeChild( v[i] );
}

v[0].parentNode.removeChild( v[0] );
v[1].parentNode.removeChild( v[1] );
v[2].parentNode.removeChild( v[2] );
