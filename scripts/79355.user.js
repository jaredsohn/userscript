// ==UserScript==
// @name           Double Post Blocker
// @namespace      http://userscripts.org/users/48349
// @include        http://*.okcupid.com/*
// ==/UserScript==

		
var buttonxpath ="//a[contains(@onclick,'boards.add_comment')]";
var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i <  buttons.snapshotLength; i++) {
	button = buttons.snapshotItem(i);
		
       button.addEventListener('click',
       		function (event) {       			
       			button.setAttribute('onclick', '');   
       			button.textContent='Submitting';
		},true);
    }

	
	



    