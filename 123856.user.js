// ==UserScript==
// @name           FSHelperPlus
// @namespace      www.fallensword.com
// @description    FS Helper Plus
// @include        http://www.fallensword.com/*
// @include        http://guide.fallensword.com/*
// @include        http://fallensword.com/*
// @include        http://*.fallensword.com/*
// @include        http://local.huntedcow.com/fallensword/*
// @exclude        http://forum.fallensword.com/*
// @exclude        http://wiki.fallensword.com/*
// ==/UserScript==

var main = function() {

var Helper = {
    onPageLoad: function(anEvent) {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
        
        /*
         * No more Auto Update needed! We'll always load the last version of the script directly from google.
         * This improvement is essential to immediately be warned or update when HCS try to modify the content in order 
         * to break the script or try to trace your activity.
         */
        
        GM_JQ.src = 'http://fs-plus.googlecode.com/svn/trunk/fsplus.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
}

Helper.onPageLoad(null);

};

if (navigator.userAgent.indexOf("Firefox")>0) {
	var $ ;
	var jqcounter = 0;
	// Check if jQuery's loaded
	function GM_wait() {
		if (typeof unsafeWindow.jQuery == 'undefined' && jqcounter < 10) {
			jqcounter++;
			if (jqcounter == 5) { // 1/2 second, must be some error, try to load our own jquery
				var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
					GM_JQ = document.createElement('script');

				GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
				GM_JQ.type = 'text/javascript';
				GM_JQ.async = true;

				GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
			}
			window.setTimeout(GM_wait, 100);
		} else {
			$ = unsafeWindow.jQuery;
			$T = unsafeWindow.Tipped;
			if (jqcounter>=0) {
				jqcounter = -1000; // prevent running main twice due to setTimeout effect
				main();
			}
		}
	}
	GM_wait();
}

function insertJS(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}
// load jQuery and execute the main function
if (navigator.userAgent.indexOf("Chrome")>0) insertJS(main);
