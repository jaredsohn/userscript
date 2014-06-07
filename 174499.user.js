// ==UserScript==
// @name           Some Developers Stuff for Livejournal.com
// @namespace      http://yoksel.ru/
// @description    The script adds titles on the journal style settings pages and link to customize your journal style
// @include        *livejournal.com*
// @include        *livejournal.ru*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_listValues
// @grant          GM_addStyle
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==


$.noConflict(); 
jQuery(document).ready(function($) {
    
    // Add name of section in title of page
    // Useful when many pages are opened
    
    if( $("#customize_theme_nav_links").length > 0 ){
        var my_title = document.title;    
        var section = $("#customize_theme_nav_links .on A").text();    
        document.title = section + " - " + my_title;
    }
    
    // Add link to customize theme in controlstrip
    var elem = "";
    var customize_url = "http://www.livejournal.com/customize/options.bml";
    
    if ( $(".w-cs-i-entries").length > 0 ){
        elem = $(".w-cs-i-entries");
    }
    else if ( $(".w-cs-i-members").length > 0 ){
        elem = $(".w-cs-i-members");
        var user = $(".js-controlstrip-status .ljuser").attr("lj:user");
        customize_url = customize_url + "?authas=" + user;
    }
        
   if ( elem.length > 0 ) {
   		var customize_item = "<li class=\"w-cs-i-account\"><a href=\"" + customize_url + "\" target=\"_blank\">Настроить стиль журнала</a></li>";
        $( elem ).after ( customize_item );
   }
    
});