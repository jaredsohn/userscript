// habracut expander
// version 0.1
// 2007-12-30
// Copyright (c) 2007, bebopkid
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name           hubracut expander
// @description	   expands habracut w/out page reloading
// @include        http://*habrahabr.ru/*
// @exclude        http://*.habrahabr.ru/*.html*
// ==/UserScript==

var ce_temp = document.createElement("div"); // creatin trash container
ce_temp.setAttribute("id", "cutexpander_temp");
document.body.appendChild(ce_temp);

ce_loader = '<img src="data:image/gif;base64,R0lGODlhEAAQAPQAAP%2F%2F%2FwAAAPj4%2BDg4OISEhAYGBiYmJtbW1qioqBYWFnZ2dmZmZuTk5JiYmMbGxkhISFZWVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla%2BKIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK%2Bo2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC%2B0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU%2FNXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK%2BkCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm%2F4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg%2BboUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC%2BRAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA%3D%3D"> loading...'

ce_error = '<div style="border: 1px solid #ff3938; padding: 5px; background: #f5b2aa; margin: 3px 0px; display: inline;">ooups, something gone wrong :-( original link:</div>&nbsp;<a href="'

// make it simple

function $(id) { return document.getElementById(id); }
function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

// modifyin links

$x("//a[contains(@href, 'habracut')]").forEach(function(a) {
	a.addEventListener("click", expand_click, false);
	a.setAttribute("onclick", "return false");
});

// expandin

function expand_click() {
	link = this;

	var postn = link.href.replace(/.+?\//g, "").replace(/\.html.+?$/, "");

	var cut_container = document.createElement("DIV"); // creatin preloader
	with (cut_container) {
		setAttribute("id", "cut_container_" + postn);
		innerHTML = ce_loader;
	}
	
	link.parentNode.insertBefore(cut_container, link); // wipin out original link
	link.parentNode.removeChild(link);

	try {
		GM_xmlhttpRequest({
	    	method: 'GET',
	    	url: link.href,
	    	onload: function(responseDetails) {
				ce_temp.innerHTML = responseDetails.responseText; // loadin el-jay post into trash container
	
				from = $x("//div[contains(@id, 'cutexpander_temp')]//a[contains(@name, 'habracut')]")[0]; // gettin cutted post container

				while (from.className != 'groups_topic_text')
					from = from.parentNode;

				to = $("cut_container_" + postn); // gettin post to insert

				while (to.className != 'groups_topic_text')
					to = to.parentNode;

				to.innerHTML = from.innerHTML.replace(/[\r\n]/g, "").replace(/<div class="posttags".+?$/i,"") + to.innerHTML.replace(/[\r\n]/g, "").replace(/^.+?<div class="dont_smoke_cigarettes"/i,"<div class=\"dont_smoke_cigarettes\""); // loading content, some weird regexp to keep no. of comments alive
					
				ce_temp.innerHTML = ""; // annihilatin trash
			}
		});
	} catch(e) { // someth gone wrong
		cut_container.innerHTML = ce_error + link.href + "\">читать дальше →</a>"; // displain error message
	}
}