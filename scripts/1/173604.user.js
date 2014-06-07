// ==UserScript==
// @name Realto.Ru Adsense
// @description Adds visual wrapping for adsense blocks
// @namespace realto
// @version 0.3
// @include http://*.realto.ru/*
// @require http://code.jquery.com/jquery-latest.js
// @updateURL http://realto.ru/static/js/adsense_userscript.js
// ==/UserScript==

$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function() {
    $.each($(".adsense"), function () {
        $(this).wrap(
            '<div style="outline: 3px solid yellow; background: yellow;" />');
        $(this).before(
            "<div><span>ID:"+$(this).data('id')+"&nbsp;"+$(this).data('description')+"</span></div>"
        );
    });
});