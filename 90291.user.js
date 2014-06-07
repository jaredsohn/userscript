// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Sidereel stuff
// @namespace     http://www.sidereel.com/
// @description   link mod, advertisements mod
// @include       http://www.sidereel.com/*/search*
// ==/UserScript==

var $j;
// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();
// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $j = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }
// All your GM code must be inside this function
    function letsJQuery() {
	console.log('GM loaded');
	//check for all id's that are for advertisement and erase them!
	adIdArray = ['#ad-sidebar1-delayed','#ad-main-top','#ad-main-top-delayed','#ad-sidebar1-delayed','.sidebar','#ad-sidebar2-delayed','#search-google-ads'];
	for (block in adIdArray){
		$j(adIdArray[block]).hide();
	}
	
	//look at link and change the link to go directly
	$j('.link-results li').each(function(){
		domain = 'http://www.sidereel.com';
		var vidlink = $j(this).find('div span').eq(0).find('a');
		url = domain + vidlink.attr('href');
		invIframe = iFrameSetter(url);
		$j(this).append(invIframe);
		var iframe = $j(this).find('#iframe');
		var outUrl = '';
		iframe.load(function(){
			outUrl = iframe.contents().find('#link-interstitial-page .playground a:first')
				.attr('href');
			console.log(outUrl);
			iframe.contents().find('html').remove();
			//now switch the link!
			vidlink.attr('href', outUrl);
			vidlink.text(vidlink.text() + " - (directly linked)");
		});



	});
	
    }
    function iFrameSetter(url){
	return	invIframe = '<iframe id="iframe" style="visibility:hidden;display:none" src="'+url+'"></iframe>';
    }
