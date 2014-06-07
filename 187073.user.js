// ==UserScript==
// @name        Turn off Facebook Messaging
// @namespace   https://zornco.com/
// @include     https://*.facebook.com/*
// @include     https://facebook.com/*
// @include     http://*.facebook.com/*
// @include     http://facebook.com/*
// @require     https://code.jquery.com/jquery.js
// @require     https://userscripts.org/scripts/source/100842.user.js
// @downloadURL	https://userscripts.org/scripts/source/187073.user.js
// @updateURL	https://userscripts.org/scripts/source/187073.meta.js
// @version     1.2.1
// @grant       none
// ==/UserScript==

$  = jQuery.noConflict(true); //stop jQuery from breaking some pages that use $ as a var already
unsafeWindow.IUHgrohgIOHNGWOENBEOGH = $;

$(function() {
    
    function hrhnmrkhnNIWNIINsetup() {
        if(typeof window.top.Chat == "undefined" ||
          typeof window.top.ChatVisibility == "undefined")
        {
            setTimeout(hrhnmrkhnNIWNIINsetup,500);
            return;
        }
        $ = IUHgrohgIOHNGWOENBEOGH;
        delete IUHgrohgIOHNGWOENBEOGH;
        $("#pagelet_ticker").css("height","calc(100% - 80px)");
        if(window.top.Chat.isOnline())
        {
            
            console.log('7');
            window.top.ChatVisibility.goOffline();
        }
        delete hrhnmrkhnNIWNIINsetup;
    }
    
    hrhnmrkhnNIWNIINsetup();
})();
