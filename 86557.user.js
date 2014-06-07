// ==UserScript==
// @name           BingTweetCounter
// @namespace      http://semifo.pa.land.to/
// @description    This script displays Tweets acquired from Topsy in the search result of Bing. / Bingの検索結果にTopsyから取得したTweet数を表示します。
// @version        1.0.0
// @include        http://www.bing.com/search*
// ==/UserScript==

(function(d, func) {
    var check = function() {
        if (typeof unsafeWindow.jQuery == 'undefined') return false;
        func(unsafeWindow.jQuery); return true;
    }
    if (check()) return;
    var s = d.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
    d.getElementsByTagName('head')[0].appendChild(s);
    (function() {
        if (check()) return;
        setTimeout(arguments.callee, 100);
    })();
})(document, function($) {
    // main
    const topsyUrl = 'http://otter.topsy.com/urlinfo.json?url=';
    var g_data = new Array();
    var url = new Array();
    var url_t = new Array();
    var tweet_count = new Array();
    var xmlhttp = null;
    var count = 0;
    
   function getJSON( xmlhttp ) {
        var responseText = xmlhttp.responseText;
        var response = eval('('+responseText+')');
       
        for (var i=0; i<url.length; i++) {
        	if (url[i] === response['request']['parameters']['url'] || url[i] === response['request']['parameters']['orig_url']) {
        		if (response['response']['trackback_total'] === 0) {
        			tweet_count[i] = '';
        		} else {
        			tweet_count[i] = response['response']['trackback_total'] + '<span style="margin-left:5px;">tweets<span>';
        		}
        		url_t[i] = response['response']['topsy_trackback_url'].replace('?utm_source=otter','');
        	}
        	
        }
    	count++;
    	if (count === url.length) {
    		show();
    	}
    }
    
    function topsy(url) {
    	xmlhttp = GM_xmlhttpRequest({
                method : 'GET',
                url : topsyUrl + encodeURIComponent(url),
                onload : getJSON
           });
    }
     
    function show() {
    	$('h3>a[onmousedown]').map(function(i) {
			$('.load').remove();
			$(this).after('<div class="topsy" style="margin:0px 0px 0px 10px;padding:0;border:0;display:inline;"><a href="'+url_t[i]+'">'+tweet_count[i]+'</a></div>');
    		$('.topsy').css('font-weight','bold').css('background-color','#BEFFF6').css('font-size','75%');
    	});
    }
    
	$('h3>a[onmousedown]').map(function(i) {
		$(this).after('<div class="load" style="margin:0px 0px 0px 10px;padding:0;border:0;display:inline;vertical-align:middle;"><img src="http://semifo.pa.land.to/load.gif" /></div>');
		g_data[i] = $(this).clone(); //maybe no need
		url[i] = g_data[i].attr('href');
    });
    for (var i=0; i<g_data.length; i++) {
     	
     	topsy(url[i]);
    } 
    
});

