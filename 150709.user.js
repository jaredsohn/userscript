// ==UserScript==
// @name        ECHO_II
// @namespace   ECHO
// @description Greasemonkey Technologiedemo
// @include     http://echo.mpiwg-berlin.mpg.de/*
// @grant       none
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

			function createLinkTag() {
			// Create tags and attributes			
						var newLinkTag = document.createElement('link');
							var newAttribHref = document.createAttribute('href');
							var newAttribType = document.createAttribute('type');
							var newAttribRel = document.createAttribute('rel');

			// Fill attributes
							newAttribHref.nodeValue = 'http://dl.dropbox.com/u/48647897/echo_common.css';
							newAttribType.nodeValue = 'text/css';
							newAttribRel.nodeValue = 'stylesheet';

			// Inject to head
						headFetch = document.getElementsByTagName('head')[0];
						headFetch.appendChild(newLinkTag);
						linkVariable = document.getElementsByTagName('link')[0];
						linkVariable.setAttributeNode(newAttribHref);
						linkVariable.setAttributeNode(newAttribType);
						linkVariable.setAttributeNode(newAttribRel);
			}

		createLinkTag();

			function createJQTag() {
			// Create tags and attributes			
						var newScriptTag = document.createElement('script');
							var newAttribSrc = document.createAttribute('src');
							var newAttribType = document.createAttribute('type');

			// Fill attributes
							newAttribSrc.nodeValue = '//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js';
							newAttribType.nodeValue = 'text/javascript';

			// Inject to head
						headFetch = document.getElementsByTagName('head')[0];
						headFetch.appendChild(newScriptTag);
						linkVariable = document.getElementsByTagName('script')[1];
						linkVariable.setAttributeNode(newAttribSrc);
						linkVariable.setAttributeNode(newAttribType);
			}

		createJQTag();
		
					function createUITag() {
			// Create tags and attributes			
						var newScriptTag = document.createElement('script');
							var newAttribSrc = document.createAttribute('src');
							var newAttribType = document.createAttribute('type');

			// Fill attributes
							newAttribSrc.nodeValue = '//ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/jquery-ui.min.js';
							newAttribType.nodeValue = 'text/javascript';

			// Inject to head
						headFetch = document.getElementsByTagName('head')[0];
						headFetch.appendChild(newScriptTag);
						linkVariable = document.getElementsByTagName('script')[2];
						linkVariable.setAttributeNode(newAttribSrc);
						linkVariable.setAttributeNode(newAttribType);
			}

		createUITag();
		
			}
		, 1000);