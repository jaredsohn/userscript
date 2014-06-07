// ==UserScript==
// @name           LongerURL
// @namespace      http://weibo.com/dndx
// @include        http://weibo.com/*
// @include        http://www.renren.com/*
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://www.twitter.com/*
// @include        https://www.twitter.com/*
// @require        http://appstack.sinaapp.com/static/jquery.min.js
// @description    自动将Twitter、新浪微博以及人人网的短链接还原，让你看的清清楚楚，点的明明白白。
// @version        0.0.3
// @author         Dndx(idndx.com)
// ==/UserScript==

var url = window.location.href;
var site;

if (url.indexOf('weibo') != -1){
	site = 'weibo';
} else if (url.indexOf('renren') != -1){
	site = 'renren';
} else if (url.indexOf('twitter') != -1){
	site = 'twitter';
}

function scrollToTop(){
	$('html').animate({
				scrollTop: 0
			}, 1000);
	return false;
}

switch (site){
	case 'weibo':
	    function urlreverse(){
            $('a[action-type=feed_list_url]').each(function(i, e){
	            var trueurl = $(this).attr('title');
	            $(this).text(trueurl).attr('href', trueurl);
            });
        }
        $('#base_scrollToTop').attr('id', 'dndx_scrollToTop').click(function(){
			return scrollToTop();
        });
        break;
    
    case 'renren':
        function urlreverse(){
            $('h3 > a, .original-stauts > a').each(function(i, e){
    	        if ($(this).attr('href').indexOf('rrurl.cn') != -1){
    	            var trueurl = $(this).attr('title');
	                $(this).text(trueurl).attr('href', trueurl);
    	        }
            });
        }
        $('#toolBackTo > a').removeAttr('onclick').click(function(){
			return scrollToTop();
        });
        break;
    
    case 'twitter':
        function urlreverse(){
            $('a.twitter-timeline-link').each(function(i, e){
    	        var trueurl = $(this).attr('data-ultimate-url');
	            $(this).text(trueurl).attr('href', trueurl);
            });
        }
        break;
}

setInterval(function(){urlreverse()}, 5000);
