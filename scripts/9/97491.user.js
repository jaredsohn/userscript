// ==UserScript==
// @name           UEF.colorfy
// @namespace      http://unofficialetsyforums.proboards.com/
// @include        http://unofficialetsyforums.proboards.com/index.cgi?*action=display*
// ==/UserScript==
// Add jQuery

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

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
        //to add more people copy the below line and change the name
		$('form').submit(function(){
			var e=$('textarea[name=message]');
			if(e.length>0){
				if(e[0].value.indexOf('[font=')  == -1)
					e[0].value='[font=Arial Black][color=Deeppink]'+e[0].value+'[/color][/font]';
			}
		});
        
    }