// ==UserScript==
// @name		  Hi5 No Bullshit Cleanup
// @description   Removes unwanted elements on Hi5 social networking website
// @include	  http://*hi5.com/*
// @exclude	   
// @version       0.1
// ==/UserScript==

// Release Notes
// 0.1
// -initial code
//

// Functions

// Create removeElement function
// Removes pesky elements with no class or id
function removeElement(el, attribs, attribValue) {
	// Get element tag
	var div = document.getElementsByTagName(el);
	var myAttribs = "";
		for (var i = div.length - 1; i >= 0; i--) {
			// Get attribute
			myAttribs = div[i].getAttribute(attribs);
			// Get attribute value
			if(myAttribs == attribValue){
				div[i].parentNode.removeChild(div[i]);
			}
		}
	};

// Function to remove elements by ID attribute.
(function(){
// array of elements by ID
var listIds = [
['PageLeaderAd'],
['hi5-ad-1'],
['new-gifts'],
['myLifeSearch'],
['GamesToolbar'],
['PageHeader-CoinsBalance'],
['google_flash_embed'],
['product_2000'],
['PageFooterAd'],
['balance']
];
// Remove elements from array
for(var i=0,l=listIds.length,item; i<l; i++) {
item = listIds[i];
var x = document.getElementById(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9], item[10], item[11], item[12], item[14], item[15], item[16], item[17], item[18], item[19], item[20], item[21]);
if ( x && x.parentNode && x.parentNode.removeChild ) {
		x.style.display = 'none';
		x.parentNode.removeChild(x);
	}
}
})();
removeElement('a', 'href', '/friend/payments/displayCoinsHome.do');
removeElement('div', 'class', 'pageLeaderAd');
removeElement('div', 'class', 'gifts');
removeElement('div', 'class', 'gift');

// Extras