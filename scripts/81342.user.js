// ==UserScript==
// @name           xREL External Links
// @namespace      xREL External Links
// @description    Open xREL External Links in new Tab
// @include        http://www.xrel.to*
// @include        www.xrel.to*
// @include        http://xrel.to*
// @include        xrel.to*
// @include        *.xrel.to*
// ==/UserScript==

var a_links = document.getElementsByTagName('a');
for (var i=a_links.length-1; i>=0; i--) {
	a_ref_true = a_links[i].href.indexOf("derefer");
	if (a_ref_true == -1){
		a_ref_internal = a_links[i].href.substring(0, 15);
		if (a_ref_internal == "http://www.xrel" || a_ref_internal == "https://ssl.xre" || a_ref_internal == "javascript:eiTi" || a_ref_internal == "javascript:nfoV") {
		}
		else {
			a_links[i].target = "_blank";
		}
	}
	else {
		a_links[i].target = "_blank";
	}
}
var area_links = document.getElementsByTagName('area');
for (var i=area_links.length-1; i>=0; i--) {
	area_ref_true = area_links[i].href.indexOf("derefer");
	if (area_ref_true == -1){
	}
	else {
		area_links[i].target = "_blank";
	}
}