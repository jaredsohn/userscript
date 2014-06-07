// ==UserScript==
// @name           MatthewBetterTheme
// @namespace      /
// @description    ;-)
// @include        http://blog.matthew.org.pl/*
// ==/UserScript==


var $;

// ładowanie jQuery
(function(jqueryScriptHref) {

	// Check if jQuery's loaded
	function GM_wait() {
	    if ('undefined' == typeof unsafeWindow.jQuery) {
	        window.setTimeout(GM_wait, 100);
	    } else {
	        $ = unsafeWindow.jQuery.noConflict(true);
	        jQueryLoadedCallback();
	    }
	};

    if ('undefined' == typeof unsafeWindow.jQuery) {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement;
        var GM_JQ = document.createElement('script');

        GM_JQ.src = jqueryScriptHref;
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    
    GM_wait();
    
})('http://jquery.local/jquery.1.6.4.min.js'); // eo ładowania jQuery



function jQueryLoadedCallback() {

	$("p#rss").css('top', '130px');
	$('.post .meta').css('padding-left', '50px');
	$(".post .storycontent").css('padding-left', '50px');
	$('#wrapper').attr('style', 'float: none; width: auto; margin: 0; padding-right: 230px;');
	$('#content').attr('style', 'position: relative; width: 700px; margin: 0 auto;');
	$('#rightsidebar').attr('style', 'position: absolute; float: none; top: 175px; right: 25px; margin: 0; padding: 0;');

};