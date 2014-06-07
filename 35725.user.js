// Senate House Library Un-Suckifier
// taken from http://userscripts.org/scripts/review/5506
//
// ==UserScript==
// @name          Senate House Library Un-Suckifier
// @namespace     http://tommorris.org/
// @description   Removes timeout refresh on SHL website, so you can use yer tabs.
// @include       http://catalogue.ulrls.lon.ac.uk/*
// @include	  http://193.63.81.241/*
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

