// ==UserScript==
// @name           Facebook Ignore all application inviations link (above the right panel)
// @namespace      http://wtw.tw/scripts/
// @include        http://www.facebook.com/reqs.php*
// ==/UserScript==




(function() {

	function $(id)
	{
		return document.getElementById(id);
	}
	
	function x(xpath)
	{
		return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null ).iterateNext();
	}
	
	function test(event)
	{
		if ("IngoreAllAppInvitesLink" == event.target.className)
			clickAllIgnores();
	}
	
	function clickAllIgnores()
	{
		// I got this from this userscript: http://userscripts.org/scripts/review/14084
		// I figured it's nicer to have a button to explicitly ignore all app invites then to automatically ignore them when you visit the page..

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

	}
	
    var addIgnoreAllButton = function() {
		var loc = x('//div[@class="sidebar_item_header clearfix"]/h2/span');
		loc.innerHTML = "Requests (<a href='#' class='IngoreAllAppInvitesLink'>ignore most</a>)";
		
    }
   
    window.addEventListener("load", addIgnoreAllButton, false);
	document.addEventListener('click', test, true);   
	
})();


