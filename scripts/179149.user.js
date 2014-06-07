// ==UserScript==
// @name        Letsget MenuItem Page Helper
// @namespace   http://localhost.localdomain
// @include     https://admin.letsget.net/Private/MenuItem.aspx
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     2
// @grant 		metadata
// ==/UserScript==

// From UserScripts.org

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

addGlobalStyle('.myClass {width: 190px; position: fixed; left: 50%; top: 120px; margin: 0 0 0 110px;}');

//waitForKeyElements("$( 'div' ).last()",fnFixButtons);
waitForKeyElements("#BP_Content_PanelItemCombination",fnFixButtons);


function fnFixButtons () {

	$('div').last().addClass("myClass");

}
fnFixButtons();