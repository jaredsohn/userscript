// ==UserScript==
// @name           ub-login-helper
// @namespace      universalbank
// @description    Makes Universal Bank clientbank login form more user friendly
// @include        https://ebanking.universalbank.com.ua/netbanking/
// ==/UserScript==

var $;
var KEY_CODE_RETURN = 13;

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
			augmentLoginForm();
        }
    }

function augmentLoginForm(){
	var loginInput = $("input[name=fldLoginUserId]").attr("tabindex", "1").focus();
	var passwordInput = $("input:password").attr("tabindex", "2");
	$("a[href=#]").attr("tabindex", "3");
	passwordInput.bind("keypress", function(evt){
		if(evt.keyCode == KEY_CODE_RETURN){
			$("a[href=#]").click();
		}
	});
}
