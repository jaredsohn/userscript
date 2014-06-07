// ==UserScript==
// @name           GMail-Simple changes
// @description    Removes crappy extra spacing at the bottom
// @include        http://mail.google.com
// @include        https://mail.google.com
// @author         Ivo Jesus
// @require        http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

jQuery(document).ready(function(){
    var $ = jQuery;

    $(".l2.ov").css("padding-bottom",0);
});

