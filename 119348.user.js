// ==UserScript==
// @name           fix goxiazai.cc link
// @namespace      https://github.com/shuge
// @description    replace goxiazai.cc popup link with real download link
// @include        http://goxiazai.cc/html/*.html
// ==/UserScript==

var a_links = document.getElementsByTagName("a");

for (var idx = 0; idx < a_links.length; idx ++ ) {
    var link = a_links[idx];

    if (link.getAttribute('id') == "down") {
	var href = link.href;
	var is_thunder = href.indexOf("thunder");
	var is_ed2k = href.indexOf("ed2k");

	if (is_thunder != -1) {
	    var new_link = href.slice(is_thunder);
	    link.href = decodeURIComponent(new_link);
	} else if (is_ed2k != -1) {
	    var new_link = href.slice(is_ed2k);
	    link.href = decodeURIComponent(new_link);
	}
    }
}
