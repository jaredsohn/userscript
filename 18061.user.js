// el-jay cut expander
// version 0.1
// 2007-12-30
// Copyright (c) 2007, bebopkid
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html


// ==UserScript==
// @name		el-jay cut expander
// @include		http://*.livejournal.com/*
// @exclude		http://*.livejournal.com/*.html*
// ==/UserScript==

// routines

var ce_temp = document.createElement("div"); // creatin trash container
ce_temp.setAttribute("id", "cutexpander_temp");
document.body.appendChild(ce_temp);

ce_loader = '<b>(&nbsp;<img src="data:image/gif;base64,R0lGODlhEAAQAPQAAP%2F%2F%2FwAAAPj4%2BDg4OISEhAYGBiYmJtbW1qioqBYWFnZ2dmZmZuTk5JiYmMbGxkhISFZWVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla%2BKIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK%2Bo2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC%2B0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU%2FNXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK%2BkCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm%2F4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg%2BboUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC%2BRAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA%3D%3D"> loading...&nbsp)</b>'

ce_error = '<div style="border: 1px solid #ff3938; padding: 5px; background: #f5b2aa; margin: 3px 0px; display: inline;">ooups, something gone wrong :-( original link:</div>&nbsp;<b>(&nbsp;<a class="ce_originalLink" href="'

// make it simple

function $(id) { return document.getElementById(id); }
function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

// modifyin links

$x("//b/a[contains(@href, 'cutid')]").forEach(function(a) {
	a.addEventListener("click", expand_click, false);
	a.setAttribute("onclick", "return false");
});

// expandin

function expand_click() {
	link = this;

	var cutid = link.href.replace(/.+?#cutid/i, ""); // gettin cutid part
	var postn = link.href.replace(/.+?\//g, "").replace(/\.html.+?$/, "");

	var text = link.innerHTML; // gettin link text for future use in error message

	var cut_container = document.createElement("DIV"); // creatin preloader
	with (cut_container) {
		setAttribute("id", "cut_container_" + postn + cutid);
		innerHTML = ce_loader;
	}
	
	link.parentNode.parentNode.insertBefore(cut_container, link.parentNode); // wipin out original link
	link.parentNode.parentNode.removeChild(link.parentNode);

	try {
		GM_xmlhttpRequest({
	    	method: 'GET',
	    	url: link.href,
	    	onload: function(responseDetails) {
				ce_temp.innerHTML = responseDetails.responseText; // loadin el-jay post into trash container
	
				cut = document.getElementsByName("cutid"+cutid)[0]; // gettin part to insert
				var toinsert = cut.parentNode.innerHTML; 
	
				toinsert=toinsert.replace(/[\r\n]/g, "").replace(eval("/.+?<a name=\"cutid" + cutid + "\"><\\/a>/i"), ""); // cuttin it
	
				if (toinsert != "") { // if it's all okay
					var original = cut_container.parentNode.innerHTML; // gettin cutted post
					original = original.replace(/[\r\n]/g, "").replace(/<div id="cut_container.+?<\/div>.+?$/i, ""); // gettin html before cut
	
					cut_container.parentNode.innerHTML = original + toinsert; // replacin cutted post with full
	
					$x("//b/a[contains(@href, 'cutid')]").forEach(function(a) { // modifyin reloaded links again
						if (a.className != 'ce_originalLink'){
							a.addEventListener("click", expand_click, false);
							a.setAttribute("onclick", "return false");
						}
					});

					if(cut_container = $("cut_container_" + postn + cutid)) // if cut_container didn't dissapear (it happens sometimes)
						cut_container.parentNode.removeChild(cut_container); // annihilatin it
				}
				else if (ce_ljcut = $x("//div[contains(@id, 'cutexpander_temp')]//div[contains(@class, 'ljcut')]")[eval(cutid-1)]){ // tweak for the posts, in which cut content stored in <div class="ljcut"> containers (i dunno where it comes from, maybe semagic)
					cut_container.parentNode.innerHTML = ce_ljcut.innerHTML;

					$x("//b/a[contains(@href, 'cutid')]").forEach(function(a) { // modifyin reloaded links again
						if (a.className != 'ce_originalLink'){
							a.addEventListener("click", expand_click, false);
							a.setAttribute("onclick", "return false");
						}
					});

					if(cut_container = $("cut_container_" + postn + cutid)) 
						cut_container.parentNode.removeChild(cut_container);
				}
				else { // someth gone wrong
					cut_container.innerHTML = ce_error + link.href + "\">" + text + "</a>&nbsp;)</b>";
				}
					
				ce_temp.innerHTML = ""; // annihilatin trash
			}
		});
	} catch(e) { // someth gone wrong
		cut_container.innerHTML = ce_error + link.href + "\">" + text + "</a>&nbsp;)</b>"; // displaing error message
	}
}