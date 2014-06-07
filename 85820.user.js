// ==UserScript==
// @name           GoogleTweetCounter
// @namespace      http://semifo.pa.land.to/
// @description    This script displays Tweets acquired from Topsy in the search result of Google. / GoogleiとYahoo!Japanの検索結果にTopsyから取得したTweet数を表示します。
// @version        3.1.1
// @include        http://www.google.*/search*
// @include        https://www.google.*/search*
// @include        http://search.yahoo.co.jp/search?*
// ==/UserScript==

(function (d, func) {
    var check = function() {
        if (typeof unsafeWindow.jQuery == 'undefined') return false;
        func(unsafeWindow.jQuery); return true;
    }
    if (check()) return;
    var s = d.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
    d.getElementsByTagName('head')[0].appendChild(s);
    (function() {
        if (check()) return;
        setTimeout(arguments.callee, 100);
    })();
})(document, function($) {
    // main
    
    const twitter_api = 'http://urls.api.twitter.com/1/urls/count.json?url=';
    var url = new Array();
    var url_t = new Array();
    var tweet_count = new Array();
    var xmlhttp = null;
    var count = 0;
    var show_check = true;

     function getJSON( xmlhttp ) {
        var responseText = xmlhttp.responseText;
        var response = JSON.parse(responseText);
       
        for (var i=0; i<url.length; i++) {
            
            if (url[i] == response['url']) {

                if (response['count'] == 0) {
                    tweet_count[i] = '';
                } else {
                    tweet_count[i] = response['count'];

                }                
            }
            
        }
        count++;
        if (count === url.length) {
            show();
            show_check = false;
        }
    }
    
    function topsy(url) {
        xmlhttp = GM_xmlhttpRequest({
                method: 'GET',
                url: twitter_api + encodeURIComponent(url),
                onload: getJSON
           });
    }

   
    function show() {
        if (show_check) {
            $('.load').remove();
            selector.each(function(i) {
                if (tweet_count[i] === 'topsy_error') {
                    $(this).after(br + '<div class="" style="margin:0px 0px 0px 10px;padding:0;border:0;display:inline;vertical-align:middle;">'
                                    +'<img src="http://semifo.pa.land.to/topsy_error.gif" /></div>');
                } else {
                    if (tweet_count[i] >= 10) {
                        $(this).after(br + '<div class="topsy" style="margin:0px 0px 0px 10px;padding:0;border:0;display:inline;">'
                                        +'<a href="'+url_t[i]+'" style="color:#002EFF;" target="_blank">'+tweet_count[i]
                                        +'&nbsp;tweets</a></div>');
                        $('.topsy').css('font-weight','bold').css('background-color','#A0D9FF').css('font-size','80%');
                    } else if (tweet_count[i] >= 1) {
                        $(this).after(br + '<div class="topsy_under10" style="margin:0px 0px 0px 10px;padding:0;border:0;display:inline;">'
                                        +'<a href="'+url_t[i]+'" style="color:#6B6DFF;" target="_blank">'+tweet_count[i]
                                        +'&nbsp;tweets</a></div>');
                        $('.topsy_under10').css('font-weight','bold').css('background-color','#E2F5FF').css('font-size','80%');
                    }
                }
            });
        }
    }
   
    function time_count(second) {
        second--;
        timer = setTimeout(function(){time_count(second);},1000);
        if (second == 0) {
            show();
            show_check = false;
            count = -10;
            clearTimeout(timer);
        }
    }
    
    var yahooUrl = 'http://search.yahoo.co.jp/search?'; 
    var selector;
    var br = "";
    if (location.href.indexOf(yahooUrl) === 0) {
        selector = $('.hd').children('h3').children('a');
    } else {
        selector = $('a.l');
        br = '<br />';
    }
    selector.each(function(i) {
        $(this).after('<div class="load" style="margin:0px 0px 0px 10px;padding:0;border:0;display:inline;vertical-align:middle;">'
                        +'<img src="http://semifo.pa.land.to/load.gif" /></div>');
        url[i] = $(this).attr('href');

        tweet_count[i] = 'topsy_error';
    });
    for (var i=0; i<url.length; i++) {
         
         topsy(url[i]);
    } 

//    var i = 0;
//    var id = setInterval(function(){
//                if (i < url.length) {
//                    topsy(url[i]);
//                } else {
//                    clearInterval(id);
//                }
//                i++;
//            },150);
//    time_count(8);
});

