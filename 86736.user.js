// ==UserScript==
// @name          Prettifying Craigslist
// @namespace     Prettylist
// @description   Will eventually give the Craigslist pages enhanced functionality.  Doesn't work yet.
// @include       http://*.craigslist.org/*
// @include       http://*.craigslist.org/*/*

// ==/UserScript==

	function addGlobalStyle(css) {
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
	}

alert('after functions');

	var elmNewContent = document.createElement('div');

	elmNewContent.appendChild(document.createTextNode('Filter out:'));


alert('before adding label');

	elmNewContent.childNode.insertBefore('label', node[0]);

	//label1.appendChild(document.createTextNode('\"~~~\" and other flashy characters'));
	//label1.appendChild(document.createElement('checkbox'));

	var elmFoo = document.getElementById('searchtable');
	elmFoo.parentNode.insertBefore(elmNewContent, elmFoo);

	//elmNewContent.lastChild.id = 'label-chars';

	elmNewContent.id = 'overpost-filter';


/*	label1.id = 'label-chars';
	label2.id = 'label-caps';

        label1.class = 'filter-label';
        label2.class = 'filter-label';
*/

alert('after function calls');

addGlobalStyle('#searchfieldset{position:relative;}'); 
addGlobalStyle('#searchtable{margin-bottom:2.5em;}'); 
addGlobalStyle('#overpost-filter{border:1px solid #ccc; bottom:0; padding:4px; position:absolute; width:97.5%;}');
