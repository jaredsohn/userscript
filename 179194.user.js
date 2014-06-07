// ==UserScript==
// @name        Letsget MenuList Helper
// @namespace   http://localhost.localdomain
// @include     https://admin.letsget.net/Private/MenuBuilder.aspx*
// @require  	http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require  	https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     2
// @grant 	metadata
// ==/UserScript==

// From userscripts.org

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

addGlobalStyle('.myMenuItemNameClass {width: 300px;}');
addGlobalStyle('.myMenuItemDescClass {height: 15px; width: 300px;}');

function fnFixErUp () {

	// $("[id^='BP_Content_rptMenuItem_txtMenuItemName_']").width('300');
	$("[id^='BP_Content_rptMenuItem_txtMenuItemDescription_']").attr('rows', 1);
	$("[id^='BP_Content_rptMenuItem_txtMenuItemDescription_']").removeAttr('style');
	$("[id^='BP_Content_rptMenuItem_txtMenuItemName_']").removeAttr('style');

	// $("[id^='BP_Content_rptMenuItem_txtMenuItemDescription_']").height(14);
	// $("[id^='BP_Content_rptMenuItem_txtMenuItemDescription_']").width(200);
	 $(".MenuBuilderSeparator").css("padding", "2px 0");

	$("[id^='BP_Content_rptMenuItem_txtMenuItemName_']").addClass("myMenuItemNameClass");
	$("[id^='BP_Content_rptMenuItem_txtMenuItemDescription_']").addClass("myMenuItemDescClass");
	
	

}
fnFixErUp();

waitForKeyElements("[id^='BP_Content_rptMenuItem_txtMenuItemName_']",fnFixErUp);