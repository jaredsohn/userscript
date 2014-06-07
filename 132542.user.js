// ==UserScript==
// @name           CLoversHelper
// @namespace      http://yoksel.ru/
// @description    A little thing for colourlovers
// @include        *colourlovers.com*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

GM_addStyle(" \
    div.html-btns .customButtons { \
    clear: both; \
    float: none; \
    width: 400px; \
    height: 30px; \
    padding-top: 7px \
    } \
    div.html-btns .customButtons A { \
    width: auto !important; \
    padding: 0px 5px; \
    cursor: pointer; \
    font-weight: bold; \
    } \
");

            $.noConflict(); 
jQuery(document).ready(function($) {

    $(".blockquote").after("<div class='customButtons'><a id='createComment'>Show pattern</a><a id='addBadge'>Badge</a><a id='addPalette'>Palette</a></div>");                     

    var preview_url = $("a:contains('Preview')").attr("href");    
    var preview = "<img src='"+preview_url+"'>";                      
    var pattern_badge_orig = $(".badge-text-field").val();                       
    var palette_badge_orig = $(".pr-10.ulc").html();  

    var palette_badge = "";

    if(palette_badge_orig){ 
        palette_badge = palette_badge_orig.replace(/240/g,'238');   
        palette_badge = palette_badge.replace(/\n/g,'');
    }

    var pattern_badge = pattern_badge_orig.replace(/240/g,'238');

    $("#createComment").click(function() {

        $("#ajax-comments").val(palette_badge + pattern_badge +"\n"+ preview + preview);
        return false;
    });   
    $("#addBadge").click(function() {
        var comment_src = $("#ajax-comments").val();          
        $("#ajax-comments").val(comment_src + "\n" + pattern_badge_orig);
        return false;
    });   
    $("#addPalette").click(function() {
        var comment_src = $("#ajax-comments").val();          
        $("#ajax-comments").val(comment_src + "\n" + palette_badge_orig);
        return false;
    }); 

    $("#pattern-definition-search-query").val("yoksel");

});