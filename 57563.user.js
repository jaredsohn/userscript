// ==UserScript==
// @name           external links for hackernews
// @namespace      http://userscripts.org/users/wookiehangover
// @description    external links for hackernews
// @include        http://news.ycombinator.com/
// @include        http://news.ycombinator.com/
// ==/UserScript==


    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; initJQuery(); }
    }
    GM_wait();

    function initJQuery() {
		$('td.title a').live('click',openExternals);
		function openExternals(e){
			window.open(this.href);
			return false;
		}
    }


