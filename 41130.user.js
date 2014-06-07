// ==UserScript==
// @name           Time LinksOut
// @namespace      http://www.gabrielroth.com
// @description    Removes links from text of Time.com articles
// @version        1.0
// @include        http://www.time.com/*
// @include        http://time.com/*
// ==/UserScript==

// add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// check if jQuery is loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// all GreaseMonkey code goes inside this function
    function letsJQuery() {

// remove all links containing the words 'See' or 'Read'
		$('a:contains(See)').remove();
		$('a:contains(Read)').remove();

// remove the pairs of parens that are left behind when those links are removed
		$('p').each(function() {
			var content = $(this).html();
			$(this).html(content.replace(/\(\)/, ''));
		}); // end each

// remove the <a> tags from links in text
		$('p').each(function() {
			$(this).html(
				$(this).html().replace(/<a.+?>/gi,"")
			); // end html
		}); // end each
    }	// end letsJQuery