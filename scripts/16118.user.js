// ==UserScript==
// @name           Facebook - Ignore ALL application inviations 
// @namespace      http://www.devilsworkshop.org/pub/GreaseMonkey/FacebookIgnoreAll.user.js
// @description    Ignore All Facebook application invitation with just one click
// @include        http://*.facebook.com/reqs.php*
// ==/UserScript==

/*
STEPS::
1. Create a function to IGNORE ALL links. (basically to click on all ignore button)
	a. get all ignore button using XPATH
	b. iterate through them clicking everyone (with few exception)
2. Add IGNORE ALL button to frontend i.e. facebook which will fire above function (Give user absolute control)
	a. 
*/


(function() {
	

function x(xpath)
	{
		return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null ).iterateNext();
	}
	
	/* This function is by zetx from his script: http://userscripts.org/scripts/show/14084 */
	function clickAllIgnores()
	{

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

	var loc = x("//div[@id='home_sidebar']/div/div[1]/div[1]/h2");
	loc.innerHTML  += " <input name='ignoreAllButton' class='inputbutton' value='Ignore ALL' type='button'/>";
	
    }

    function testClick(event)
	{
		if ("ignoreAllButton" == event.target.name)
			clickAllIgnores();
	}
   
    window.addEventListener("load", addIgnoreAllButton, false);
	document.addEventListener('click', testClick, true);   
	
})();

