// ==UserScript==
// @namespace     http://www.noandwhere.com/userscripts
// @name          GoogleSubscribe
// @description   Adds links to subscribe to RSS feeds via Google Reader
// ==/UserScript==

(function() {
	window.addEventListener("load", function(e) {
		
		lbox = document.createElement("div");
		lbox.title = "Subscribe to this site's feeds via Google Reader!";
		lbox.id = "google-subscribe-box";
		lbox.setAttribute("style","color: #000000;font:xx-small bolder Helvetica,Arial,sans-serif; border: 2px solid #0000FF; background-color:#FFFFFF;padding: 5px;position: absolute;top: 0pt;left: 0pt;z-index:999;opacity: .95;");
		
		g1 = document.createElement("span");
		g1.innerHTML = "G";
		g1.setAttribute("style","color: rgb(51, 51, 255);");
		lbox.appendChild(g1);
		g2 = document.createElement("span");
		g2.innerHTML = "O";
		g2.setAttribute("style","color: rgb(255, 0, 0);");
		lbox.appendChild(g2);
		g3 = document.createElement("span");
		g3.innerHTML = "O";
		g3.setAttribute("style","color: rgb(255, 204, 0);");
		lbox.appendChild(g3);
		g4 = document.createElement("span");
		g4.innerHTML = "G";
		g4.setAttribute("style","color: rgb(51, 51, 255);");
		lbox.appendChild(g4);
		g5 = document.createElement("span");
		g5.innerHTML = "L";
		g5.setAttribute("style","color: rgb(51, 204, 0);");
		lbox.appendChild(g5);
		g6 = document.createElement("span");
		g6.innerHTML = "E";
		g6.setAttribute("style","color: rgb(255, 0, 0);");
		lbox.appendChild(g6);
		rdr = document.createTextNode(" READER:");
		lbox.appendChild(rdr);

		feeds = 0;
		l = document.getElementsByTagName("link");
		for (var i = 0; i < l.length; i++) {
			if (l[i].rel == "alternate") {
				feed = document.createElement("a");
				feed.title = "Subscribe to " + l[i].title;
				feed.href = "http://www.google.com/reader/preview/*/feed/" + l[i].href;
				if (l[i].type.indexOf('rdf') > -1 || l[i].href.indexOf("rdf") > -1) {
					feed.innerHTML = "RDF";
				} else if (l[i].type.indexOf("atom") > -1) {
					feed.innerHTML = "ATOM";
				} else {
					feed.innerHTML = "RSS";
				}
				feed.setAttribute("style","padding: 2px; background-color: orange; color: white;text-decoration:none; margin:0 2px 0 2px;");
				lbox.appendChild(feed);
				feeds++;
			}
		}
		if (feeds > 0) {
			clsr = document.createElement("a");
			clsr.innerHTML = "X";
			clsr.title = "Close";
			clsr.href="javascript:document.body.removeChild(document.getElementById('google-subscribe-box'));void 0;";
			clsr.setAttribute("style","padding: 1px 2px 1px 2px; background-color: white; color: orange; border: 1px solid orange;text-decoration:none;margin:0 2px 0 2px;");
			lbox.appendChild(clsr);
		
			document.body.insertBefore(lbox, document.body.firstChild);
		}
	}, false);
})()
//.user.js
