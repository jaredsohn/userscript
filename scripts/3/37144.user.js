// ==UserScript==
// @name           reddit motivation
// @namespace      System
// @description    Removes procrastination links from reddit
// @include        http://*.reddit.*
// ==/UserScript==

modules['myModule'] = {
	moduleID: 'EndProcastination',
	moduleName: 'End Procrastination',
	description: 'End procrastination by hiding /r/all and /r/random links from the top bar.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/http:\/\/www.reddit.com\/user\/[-\w\.]+/i,
		/http:\/\/www.reddit.com\/message\/inbox\/[-\w\.]+/i,
		/http:\/\/www.reddit.com\/message\/comments\/[-\w\.]+/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			RESUtils.getOptions(this.moduleID);
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
        		$("#RESStaticShortcuts a[href='/r/all/']").next(".separator").remove();
        		$("#RESStaticShortcuts a[href='/r/all/']").remove();
        		$("#RESStaticShortcuts a[href='/r/random/']").next(".separator").remove();
        		$("#RESStaticShortcuts a[href='/r/random/']").remove();

		}
	}
}; // note: you NEED this semicolon at the end!			