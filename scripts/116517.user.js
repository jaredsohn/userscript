// ==UserScript==
// @name        Facebook replace redirect links
// @description Replaces redirecting site for external links on Facebook with direct links (2011-10-27). Be aware of security problems and lost referer protection from Facebooks redirect page!
// @namespace   http://blog.php-web-developer.de
// @include     *facebook.com*
// @creator     Nico Siebler [mail@nico-siebler.de]
// @version     0.1
// @date        2011-10-27
// ==/UserScript==


var $;
var lastClickedUrl = '';
var regExpUrl = /.*?\/l.php\?u=(.*)&h.*/;

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

    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

    function letsJQuery() {
    	$('a[href^="http://www.facebook.com/l.php?u="]').live('click', setRealUrl);
    }
    
    function setRealUrl() {
		lastClickedUrl = $(this).attr('href');
		regExpUrl.exec(lastClickedUrl);
      realUrl = unescape(RegExp.$1);
		$(this).attr('href', realUrl);
    }
