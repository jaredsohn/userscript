// ==UserScript==
// @name        Google Instant URL Filter
// @namespace   http://0-oo.net/
// @description The search results filter/blocker for Google Instant
// @homepage    http://0-oo.net/log/category/greasemonkey/google-instant-url-filter/
// @version     0.2.3
// @include     http*://www.google.tld/search*
// @include     http*://www.google.tld/webhp*
// @include     http*://www.google.tld/#*
// @include     http*://www.google.tld/
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==
//
// ( The MIT License )
//

(function() {
	var SCRIPT_NAME = "Google Instant URL Filter";
	
	function setButtonStyle(btn, label, onclick) {
		btn.style.padding = "2px";
		btn.style.cursor = "pointer";
		btn.textContent = label;
		btn.addEventListener("click", onclick, false);
	}
	
	var btn = document.body.appendChild(document.createElement("button"));
	btn.style.position = "absolute";
	btn.style.right = "30%";
	btn.style.top = "2px";
	btn.style.zIndex = 1000;
	
	// Edit URL list
	setButtonStyle(btn, "URL Filter", function() {
		var con = document.body.appendChild(document.createElement("div"));
		con.style.position = "fixed";
		con.style.right = 0;
		con.style.top = "35px";
		con.style.zIndex = 1000;
		con.style.padding = "1px 2px";
		con.style.backgroundColor = "#ccc";
		con.style.border = "solid 1px #666";
		con.style.borderRadius = "10px";
		con.style.textAlign = "center";
		
		function append(name) { 
			return con.appendChild(document.createElement(name));
		}
		
		append("b").textContent = "[" + SCRIPT_NAME + "] URL list";
		append("br");
		
		var ta = append("textarea");
		ta.cols = 50;
		ta.rows = 25;
		ta.value = GM_getValue("urls") || "";
		
		append("br");
		
		setButtonStyle(append("button"), "Cancel", function() {
			document.body.removeChild(con);
		});
		
		setButtonStyle(append("button"), "Save", function() {
			GM_setValue("urls", ta.value.trim());
			location.reload();
		});
	});
	
	var urls = GM_getValue("urls");
	
	if (!urls) {
		return;
	}
	
	urls = urls.replace(/([.?])/g, "\\$1").replace(/\*/g, ".*").replace(/\n/g, "|");
	
	try {
		var regex = new RegExp(urls);
	} catch (e) {
		alert(SCRIPT_NAME + ": Invalid URLs");
		return;
	}
	
	setInterval(function() {	// Watching the result page
		var rso = document.getElementById("rso");
		
		if (!rso || rso.filtered) {
			return;
		}
		
		rso.filtered = true;
		var results = rso.getElementsByTagName("li");
		
		for (var i = 0; i < results.length; i++) {
			var result = results[i];
			var link = result.getElementsByTagName("a")[0];
			
			if (link && link.href.match(regex)) {
				link.style.color = "#ccc";
				
				var ems = link.getElementsByTagName("em");	// Keywords
				
				for (var j = 0; j < ems.length; j++) {
					ems[j].style.color = "inherit";
				}
				
				var spans = result.getElementsByTagName("span");	// e.g. "[PDF]"
				
				for (var k = 0; k < spans.length; k++) {
					spans[k].style.color = "#ccc";
				}
				
				var div = result.getElementsByClassName("s")[0];
				
				if (div) {
					div.style.display = "none";
				}
			}
		}
	}, 100);
})();
