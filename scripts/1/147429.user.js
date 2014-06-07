// ==UserScript==
	// @name                teste
	// @namespace	        teste
	// @description	        teste
	// @include		teste
	// @exclude		teste
	// @exclude		teste
	// ==/UserScript==

var vals = [];
for each (var val in GM_listValues()) {
  vals.push(GM_getValue(val));
  alert(vals(val));
}