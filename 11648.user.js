// ==UserScript==
// @name           Scholar's Scholar
// @namespace      scholar.google.com
// @description    Allows a transfer from traditional to enhanced Google Scholar
// @include        http://scholar.google.com/*
// ==/UserScript==
		q = /\.google\.com\/scholar(.*)/;
		var query = q.exec(window.location.href);
		myHref = "http://www.srcf.ucam.org/~ms609/Wiki/Scholar" + query[1];
		lbox = document.createElement("div");
		lbox.title = "Be a pro with ms609";
		lbox.id = "google-subscribe-box";
		lbox.setAttribute("style","font:xx-small bold Helvetica,Arial,sans-serif; border: none; padding: 2px 5px; position:fixed; bottom:0; right:0; ");
		
		prolink = document.createElement("a");
		prolink.title = "Go to Google Pro!";
		prolink.href=myHref;
		prolink.style.textDecoration = "none";
		prolink.accessKey = "p";      
		
		g1 = document.createElement("span");
		g1.innerHTML = "G";
		g1.setAttribute("style","color: rgb(51, 51, 255);");
		prolink.appendChild(g1);
		g2 = document.createElement("span");
		g2.innerHTML = "o";
		g2.setAttribute("style","color: rgb(255, 0, 0);");
		prolink.appendChild(g2);
		g3 = document.createElement("span");
		g3.innerHTML = "o";
		g3.setAttribute("style","color: rgb(255, 204, 0);");
		prolink.appendChild(g3);
		g4 = document.createElement("span");
		g4.innerHTML = "g";
		g4.setAttribute("style","color: rgb(51, 51, 255);");
		prolink.appendChild(g4);
		g5 = document.createElement("span");
		g5.innerHTML = "l";
		g5.setAttribute("style","color: rgb(51, 204, 0);");
		prolink.appendChild(g5);
		g6 = document.createElement("span");
		g6.innerHTML = "e";
		g6.setAttribute("style","color: rgb(255, 0, 0);");
		prolink.appendChild(g6);
		rdr = document.createTextNode(" Pro >>");
		prolink.appendChild(rdr);
		
		lbox.appendChild(prolink);
		
//		clsr = document.createElement("a");
//		clsr.innerHTML = "X";
//		clsr.title = "Close";
//		clsr.href="javascript:document.body.removeChild(document.getElementById('google-subscribe-box'));void 0;";
//		clsr.setAttribute("style","padding: 1px 2px 1px 2px; background-color: white; color: orange; border: 1px solid orange;text-decoration:none;margin:0 2px 0 2px;");
//		lbox.appendChild(clsr);
	
		document.body.insertBefore(lbox, document.body.firstChild);