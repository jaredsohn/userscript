// ==UserScript==
// @name           Meta Refresh Blocker
// @namespace      http://www.kbstyle.net/program/greasemonkey/index.html
// @description    Block meta refresh.
// @include        *
// @exclude        https://www.google.com/*
// ==/UserScript==

(function(){


	var allMetas, thisMeta, content, timeout, timeout_ms, url, view1, view2, link;

	timeout = -1;
	url = 'none';

	allMetas = document.getElementsByTagName('meta');
	for (var i = 0; i < allMetas.length; i++) {
		thisMeta = allMetas[i];

		if (thisMeta.httpEquiv.match(/refresh/i)) {
			if (thisMeta.content.match(/[\D]/)) {
				content = thisMeta.content.split(';');
				timeout = content[0];
				
				url = thisMeta.content.match(/url=['"]?([^'"]+)['"]?$/i);
				url = RegExp.lastParen;
			}
			else {
				timeout = thisMeta.content;
				url = thisMeta.baseURI;
			}
		}
	}

	if (timeout > 0) {
		timeout_ms = (timeout - 1) * 1000;
	}

	view1 = document.createElement('div');
	view1.setAttribute('style', 'padding-top: 1em; padding-bottom: 1em;');
	view2 = document.createElement('div');
	view2.setAttribute('style', 'border: 1px solid black; padding: 0.5em; background: rgb(255, 255, 191) none repeat scroll 0%; width: 90%; color: black; margin-left: auto; margin-right: auto; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; font-family: sans-serif;');
	view2.appendChild(document.createTextNode('Refresh: '));
	link = document.createElement('a');
	link.href = url;
	link.setAttribute('style', 'color: blue;');
	link.appendChild(document.createTextNode(url));
	view2.appendChild(link);
	view2.appendChild(document.createTextNode(' Timeout: ' + timeout));
	view1.appendChild(view2);

	if (timeout >= 0) {
		// in case load hasn't finished when the refresh fires
		var stopTimer = window.setTimeout("window.stop();", timeout_ms); 
		window.addEventListener("load", function() {
			try { window.clearTimeout(stopTimer); } catch(ex) {}
			window.stop();
		}, true);

		var fc = document.body.firstChild;
		if (fc) {
			fc.parentNode.insertBefore(view1, fc);
		}
		else {
			var view3 = document.createElement('div');
			view3.appendChild(view1);
			document.body.innerHTML = view3.innerHTML + document.body.innerHTML;
		}
	}


})();
