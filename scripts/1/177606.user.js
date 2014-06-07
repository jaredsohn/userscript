// ==UserScript==
// @name           Strims.pl - DropdownOptions
// @namespace      strims_dropdownoptions
// @downloadurl    http://userscripts.org/scripts/source/177606.user.js
// @updateurl      http://userscripts.org/scripts/source/177606.meta.js 
// @description    Zamienia rozciągnięte menu z "Zapisanymi" / "Konwersacjami" etc. na piękne menu dropdown
// @include        *strims.pl*
// @version        1.0
// @grant          none
// ==/UserScript==

$(function() {
    var topContent = $( "#top_user_menu li:gt(2)" ).clone();
    $( "#top_user_menu li:gt(2)" ).addClass("no_display");
    var profileURL = $( ".user_name" ).attr("href");
    $( "#top_user_menu li a.user_name").attr("href", "");
    var profileLI = $('<li />').append( $('<a />').attr("href", profileURL).text(profileURL) );
    $("#top_user_menu li a.user_name").click(function(event) {
        event.preventDefault();
        var a = $(this);
        var ul = $("ul.simivar_profile");
        if( ul.hasClass("no_display")){
            ul.removeClass("no_display");
            $( "#top_user_menu li:eq(2)" ).css({"background-color":"#FFFFFF","border-width":"1px 1px 0","border-style":"solid","border-color":"#C8C8C8"});
        } else {
            ul.addClass("no_display");
            $( "#top_user_menu li:eq(2)" ).css({"background-color":"transparent","border-width":"1px 1px 0","border-style":"solid","border-color":"#DDEAF5"});
        }
    });
    $( "#top_user_menu li:eq(2)" )
        .append ( 
            $('<ul />' )
            .append( profileLI )
            .append( topContent ) 
            .addClass( "simivar_profile no_display" )
        );
    if( $(window).width() < 1014 )
         $( "#top_user_menu a.user_name span.link" ).css("display","inherit");
    $( "#top_user_menu li:eq(2)" ).css({"min-width": "101px", "border-width":"1px 1px 0","border-style":"solid","border-color":"#DDEAF5","padding-left":"5px","margin-left":"8px"});
    $(".simivar_profile").css({"min-width" : "106px","margin-left":"-6px","z-index": "60", "position":"absolute", "background-color":"#FFFFFF","border":"1px solid #C8C8C8","box-shadow":"0 6px 4px -4px rgba(0, 0, 0, 0.2)"});
    $(".simivar_profile li a").css({"height":"24px","line-height":"24px","padding":"0 8px","display":"block"});
    $("ul.simivar_profile a").removeClass("no_underline");
    $("ul.simivar_profile a span").removeClass("link");
});