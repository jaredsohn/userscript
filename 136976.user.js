// ==UserScript==
// @name        Galf1
// @namespace   galformod
// @include     http://galformod.mpa-garching.mpg.de/dev/mrobs/*
// @include     http://galformod.mpa-garching.mpg.de/dev/galformod-mrobs/*
// @include     http://galformod.mpa-garching.mpg.de/mrobs/*
// @version     1
// ==/UserScript==

setTimeout(
		function() {
			var linksArray = document.getElementsByTagName('link');
			while (linksArray.length > 0) {
				if (linksArray[0].getAttribute('type') == 'text/css')
					var childLink = linksArray[0];
					childLink.parentNode.removeChild(childLink);
			}
			var stylesArray = document.getElementsByTagName('style');
			while (stylesArray.length > 0) {
				if (stylesArray[0].getAttribute('type') == 'text/css')
					var childLink = stylesArray[0];
					childLink.parentNode.removeChild(childLink);
			}

			headFetch = document.getElementsByTagName('head')[0];

			var newLinkTag = document.createElement('link');
			var newAttribHref = document.createAttribute('href');
			newAttribHref.nodeValue = 'http://dl.dropbox.com/u/48647897/galformod_common.css';
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
		, 2000);
