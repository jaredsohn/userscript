// ==UserScript==
// @name        XTF_CSS
// @namespace   xtf
// @include     http://zfn.mpdl.mpg.de/*
// @version     2
// ==/UserScript==

setTimeout(
		function() {
			var stylesArray = document.getElementsByTagName('style');
			while (stylesArray.length > 0) {
				if (stylesArray[0].getAttribute('type') == 'text/css')
					var childLink = stylesArray[0];
					childLink.parentNode.removeChild(childLink);
			}

			headFetch = document.getElementsByTagName('head')[0];

			var newLinkTag = document.createElement('link');
			var newAttribHref = document.createAttribute('href');
			newAttribHref.nodeValue = 'http://dl.dropbox.com/u/48647897/zfn_css/results.css';
			var newAttribType = document.createAttribute('type');
			newAttribType.nodeValue = 'text/css';
			var newAttribRel = document.createAttribute('rel');
			newAttribRel.nodeValue = 'stylesheet';

			headFetch.appendChild(newLinkTag);
			linkVariable = document.getElementsByTagName('link')[0];
			linkVariable.setAttributeNode(newAttribHref);
			linkVariable.setAttributeNode(newAttribType);
			linkVariable.setAttributeNode(newAttribRel);
		}
		, 1000);
