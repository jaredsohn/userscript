// ==UserScript==
// @name           Multisearch
// @namespace      http://om3ga.co.uk/
// @description    Adds results from other engines to Google.
// @include        http://google.tld/search?*
// @include        http://*.google.tld/search?*
// ==/UserScript==

window.addEventListener("load", function(e) {
	var yahoo = document.createElement("div");
	var yahoourl = "http://search.yahoo.com/search?p="+encodeURIComponent(document.forms.namedItem("gs").elements.namedItem("q").value);
	yahoo.innerHTML = '<div style="margin: 0 0 0 0; ' +
	    'margin-bottom: 0px; ' +
	    'font-size: small; background-color: #fff; ' +
	    'color: #000; position: absolute; top: 2px; left: 2px"><p style="margin: 2px 0 1px 0;"> ' +
	    '<a href=\"#yahoores\">View Yahoo! Results</a>' +
	    '</p></div><a name=\"yahoores\" /><iframe src=\"'+yahoourl+'\" style=\"width: 100%; height: 100%; border: none\" />';
	document.body.appendChild(yahoo);
}, false);