// ==UserScript==
	// @name                Font setup
	// @namespace	        dmitry-kiev
	// @description	        Font setup
	// @include		*
	// ==/UserScript==

var css="body, p, h1, h2, h3, h4, table, td, th, ul, ol, textarea, input {font-family:Arial,Helvetica,sans-serif; font-size:24;}"


		try {
			var elmHead, elmStyle;
			elmHead = document.getElementsByTagName('head')[0];
			elmStyle = document.createElement('style');
			elmStyle.type = 'text/css';
			elmHead.appendChild(elmStyle);
			elmStyle.innerHTML = css;
		} catch (e) {
			if (!document.styleSheets.length) {
				document.createStyleSheet();
			}
			document.styleSheets[0].cssText += css;
		}
	
