// ==UserScript==
// @name           Avanturist.org.WIDTH_PATCH
// @description    Avanturist.org forum Width PATCH
// @version        1.1.3
// @include        http://avanturist.org*
// @include        http://www.avanturist.org*
// @include        https://avanturist.org*
// @include        https://www.avanturist.org*
// @include        http://glav.su*
// @include        http://www.glav.su*
// @include        https://glav.su*
// @include        https://www.glav.su*

// ==/UserScript==

var i,j;
var w;
var e;

e=document.styleSheets;
for (i=0; i<e.length; i++) {
	w=e[i].cssRules;
	for (j=0; j<w.length; j++) {
		if (w[j].selectorText=='.layout'){
			w[j].style.width='';
			w[j].style.minWidth='600px';
			break;
		};
	};
	for (j=0; j<w.length; j++) {
		if (w[j].selectorText=='.layout .contentRegion .leftCenterContainer'){
			w[j].style.marginRight='40px';
			break;
		};
	};
	for (j=0; j<w.length; j++) {
		if (w[j].selectorText=='body'){
			w[j].style.marginLeft='4px';
			break;
		};
	};
};