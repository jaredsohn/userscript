// ==UserScript==
// @name			FreeMU
// @namespace		Sean Robitaille
// @description		Colors the name of free software on MacUpdate. Updated 11/19/2012
// @include			http*://*macupdate.com*
// @grant			GM_addStyle
// ==/UserScript==

GM_addStyle(".hiliteMe { color: #009900 !important; }");
GM_addStyle(".hiliteMe a { color: #009900 !important; font-size: 12px !important; font-weight: bold !important; font-family: Arial,Helvetica,sans-serif !important; }");

function colorize() {
	if(document.getElementsByTagName('tr')) {
		var tagsTR = document.getElementsByTagName('tr');
		var searchString = "app_";
		for(var x = 0; x < tagsTR.length; x++) {
			var thisTR = tagsTR[x];
			if(thisTR.id.indexOf(searchString) != -1) {
				var tagsTD = thisTR.getElementsByTagName('td');
				for(var y = 0; y < tagsTD.length; y++) {
					var thisTD = tagsTD[y];
					if(thisTD.className == 'no_wrap_td smallcol' && thisTD.innerHTML.indexOf("Free") > -1) {
						thisTR.className = 'hiliteMe';
					}
				}
			}
		}
	}
}
var elem = document.getElementById('listingarea');
elem.addEventListener('mouseover', colorize, true);
colorize();