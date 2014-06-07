// ==UserScript==
// @name           vBSign - Get Link Title
// @namespace      vbsign
// @description    gets the title of links in vbsign report
// @include        http://*/vbsign/links.php
// ==/UserScript==

var $;

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
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

	function getTitle(arr,href,i){
		GM_xmlhttpRequest({
			method: 'GET',
			url: href,
			onload: function(responseDetails) {
				var resp = responseDetails.responseText;
				var titleidx = resp.indexOf('<title>') + 7;
				var titleidx2 = resp.indexOf('</title>');
				resp = resp.substring(titleidx,titleidx2);
				arr[i].innerHTML = resp;
				var loc = location.href.replace("links.php","") + "modify.php?href=" + arr[i].href + "&title="+ escape(resp);
				$.get(loc);
				i++;
				if (i<arr.length){
					var link = arr[i];
					var href = link.href;
					getTitle(arr,href,i);
				}
			}
		});	
	}
// All your GM code must be inside this function
    function letsJQuery() {
		var arr = $('table a.empty');
		i=0;
		var link = arr[i];
		var href = link.href;
		if (href && href!= unsafeWindow.location.href)
			getTitle(arr,href,i);
	}
	
