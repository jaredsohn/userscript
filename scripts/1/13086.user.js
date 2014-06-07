/*  This script is loosely based on Marco Battilana's Big Red Angry Text
http://accessites.org/site/2006/07/big-red-angry-text/

Adds the following style to font and center tags, and divs, h1, ps, spans, and tables with
an align attribute:
	color : #cd0000;
	padding : 10px;
	border : 2px solid #cd0000;
	font-size : 2em;
	
TO USE: Replace the asterisk after '@include'
with any URL you want to check. An asterisk at the end of a URL searches all pages in the domain (Ex: http://www.google.com/*).
Specify as many include URLs as necessary. For instructions on use, please see
http://diveintogreasemonkey.org/helloworld/metadata.html.
*/

// ==UserScript==
// @name          B.R.A.T.
// @namespace     http://kathrynbrisbin.com/
// @description   Makes deprecated tags and align attributes big and red
// @include       *
// ==/UserScript==


var showErrors = {
	fonts: document.getElementsByTagName('font'),
	centers: document.getElementsByTagName('center'),
	ps: document.getElementsByTagName('p'),
	tables: document.getElementsByTagName('table'),
	h1s: document.getElementsByTagName('h1'),
	divs: document.getElementsByTagName('div'),
	spans: document.getElementsByTagName('span'),

	checkForFontsAndCenters: function(element) {
		for(var i=0;i<element.length;i++) {
			this.changeText(element[i]);
		}
	},
	
	checkTagForAlign: function(element) {
		for(var i=0;i<element.length;i++) {
			if(element[i].hasAttribute('align')) {
				this.changeText(element[i]);
			}
		}
	},
	
	changeText: function(element) {
		element.style.color = '#cd0000';
		element.style.fontSize = '2em';
		element.style.borderSize = '2px';
		element.style.borderColor = '#cd0000';
		element.style.borderStyle = 'solid';
		element.style.padding = '5px';
	},
};

showErrors.checkForFontsAndCenters(showErrors.fonts);
showErrors.checkForFontsAndCenters(showErrors.centers);
showErrors.checkTagForAlign(showErrors.ps);
showErrors.checkTagForAlign(showErrors.tables);
showErrors.checkTagForAlign(showErrors.h1s);
showErrors.checkTagForAlign(showErrors.divs);
showErrors.checkTagForAlign(showErrors.spans);
