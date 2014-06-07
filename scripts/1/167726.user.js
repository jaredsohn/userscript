// ==UserScript==
// @name       fr
// @version    0.9
// @description  rm
// @match      http://*.folha.uol.com.br/*
// @copyright  2013+, jgs
// ==/UserScript==


unsafeWindow.removePopup = removePopup = function(){
    jQuery = window.jQuery?window.jQuery:unsafeWindow.jQuery;
    jQuery('body >div:has(>div:has(>map[name="paywallimage"]))').empty().css('height', '0px');
    jQuery("body").attr('style', 'overflow: auto !important');
    window.onscroll = window.onresize = function(){};
}

if(typeof unsafeWindow.jQuery == 'function' && unsafeWindow.jQuery('body > div[id^="article"]')){
    jQuery = unsafeWindow.jQuery;
    jQuery(document).ready(function(){
        window.setTimeout(removePopup, 200);
        unsafeWindow.setTimeout(function(){
            jQuery('body >div:has(>div:has(>map[name=\"paywallimage\"]))').click(removePopup)
       	}, 2000);
    });
}