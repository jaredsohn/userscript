// ==UserScript==
// @name           LionLinks++
// @namespace      http://userscripts.org/scripts/show/85916
// @description    Makes LionLinks pictures more better.
// @include        *lionlinks.exeter.edu/WebAdvisor/wwiz.exe*
// ==/UserScript==
window.addEventListener("load", function(e) {
		GM_xmlhttpRequest({
		method: "GET",
		url: "http://ulesane.com/lionlinks/lionlinks.php",
		headers: { "User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/html", },
		onload: function(resp) {
			if(resp.status == "200") {
				rawPartA = resp.responseText.split(";;");	
				var replacements = new Array();
				for (var i=0; i!=rawPartA.length; ++i) {
					replacements.push(rawPartA[i].split(";"));
				}
				var tables = document.getElementsByTagName('table');
				if (!tables) return; // no tables. weird.
//				alert("Total tables: " + tables.length);
				for ( var k = 0 ; k!=tables.length; ++k) {
//					alert("Found table " + k);
					var thisTable = tables[k];
					var tds = thisTable.getElementsByTagName('td');
					var thisImage = thisTable.getElementsByTagName('img');
					for (var i=0; i!=tds.length; ++i) {
//						alert("Found td " + i);
						var td = tds[i];
						for (var j=0; j!=replacements.length; ++j) {
							var thisReplacement = replacements[j];
							if (td.innerHTML.indexOf(thisReplacement[0]) != -1) {
								thisImage[0].src = "http://www.ulesane.com/lionlinks/" + thisReplacement[1];
							}
						}
					}
				}
			}
		}
	});
}, false);