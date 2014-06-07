// ==UserScript==
// @name           NTVMSNBC Fotogaleri R1
// @namespace      http://userscripts.org/scripts/83255
// @include        http://fotogaleri.ntvmsnbc.com/*
// ==/UserScript==

var $;

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
            main();
        }
    }

    function main() {
	$("#InfoBody").remove();
	$("#Footer").remove();
	$("#Header").remove();

	$("body").append("<script>" +
			"$('#imgPicture').width(originalImageWidth);" +
			"$('#imgPicture').height(originalImageHeight);" +
			"$('#PhotoWrapper').height('');" +
			"$('#PhotoWrapper').width('');" +
			"$('#Photo').height('');" +
			"$('#Photo').width('')" +
			"</script>");
    }