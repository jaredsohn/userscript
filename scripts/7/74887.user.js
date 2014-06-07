// ==UserScript==
// @name           ritzpix scrape
// @namespace      ritzpix
// @include        http://www.ritzpix.com/net/Albums/ListImages.aspx
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
        $("body").prepend('<textarea id="imgUrls" style="width:100%; height:200px;"></textarea>')
		window.setTimeout(grabUrl, 500);
    }

	function grabUrl(){
		var newSrc = 'wget "http://www.ritzpix.com' + $("#theImage").attr("src").replace("&maxSize=600","").replace(/ /g,"+") + '" -O "'+ $("#imageName").val()+'.jpg"'
		var oldLinks = 	$('#imgUrls').val();
		if(oldLinks.indexOf(newSrc) == -1){
			$('#imgUrls').val(oldLinks + "\n" + newSrc)
		}
		window.setTimeout(grabUrl, 500);
	}

