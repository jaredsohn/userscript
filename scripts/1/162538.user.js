// ==UserScript==
// @name       Remover POPUP Folha
// @namespace  http:///
// @version    0.14
// @description  remove o popup que impede leitura da notícia (pedindo para assinar conteúdo)
// @include      http://*.folha.*.br/*
// @copyright  2013+, jgs
// ==/UserScript==

if(typeof unsafeWindow.jQuery == 'function' && unsafeWindow.jQuery('body > div[id^="article"]')){
    jQuery = unsafeWindow.jQuery;
    jQuery._oldAjax = jQuery.ajax;
    jQuery.ajax = function(d){
        if(typeof d == "object" && d.url.search("paywall.folha.uol.com.br/") >= 0) {
            d.jsonpCallback = "void";
            d.complete = function(){paywall.inicio({status:'ok', action:'granted'})};
            jQuery._oldAjax(d);
        } else {
            return jQuery._oldAjax.apply(unsafeWindow, arguments);
        }
   }
}