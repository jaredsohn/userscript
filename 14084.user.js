// ==UserScript==
// @name          Facebook App Ignore
// @namespace     tag:zetopia.com
// @description   Automatically and indiscriminately clear invitations to Applications
// @include       http://*.facebook.com/reqs.php*
// ==/UserScript==

/*

(C) 2007 Caleb Leung
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2007-11-17 - Created (based largely off "Facebook Mini-Feed Killer" found @ http://userscripts.org/scripts/show/5518 )

*/

/*
	Two possibilities:
	return click_add_platform_app(48340, 2603081069, 585717587, 'http://apps.facebook.com/[appname]')
	return click_add_platform_app(48338, 4277509766, 585717587, null)

	We want null (Ignore button)
*/



var unparsedHideIds = document.evaluate('//input[contains(@onclick, "click_add_platform_app")]/@onclick', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var pattern = /null/;

for(var c = 0, unparsedHideId; unparsedHideId = unparsedHideIds.snapshotItem(c); c++) {

	hideId = unparsedHideId.value;
	if(pattern.test(hideId))
	{
		// hackish
		var doThis = hideId;
		doThis = doThis.substring(7, hideId.length - 2);

		// safer than unsafeWindow:
		location.href = 'javascript:void(' + doThis + '));';
	}
}