// ==UserScript==
// @name           Y!Mail-Simple changes
// @description    Removes right side ads and top bar
// @include        http://*.mail.yahoo.*
// @include        https://*.mail.yahoo.*
// @author         Ivo Jesus
// @require        http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

jQuery(document).ready(function(){
    var $ = jQuery;

    $("#shellcontent").css("right",0);
    $("#yucs-top-bar").remove();
});
