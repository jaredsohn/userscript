// ==UserScript==
// @name       Cinemassacre Layout Tightener
// @namespace  http://patorjk.com/
// @version    0.1
// @description  Unofficial Cinemassacre add-on. Good if you check the site every so often for new videos. It adjusts Cinemassacre's layout so you do less scrolling and you see the latest videos and blogs when you visit the page. Video viewing pages will auto-adjust so you don't have to scroll down manually.
// @match      http://cinemassacre.com/*
// @copyright  2012+, patorjk
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$(function() {
    
    // change the positions of the login and search bar, update their styles to match the new positions
    
    $("#navArea").append( $("#userOptions") );
    $("#navArea").append( $("#search") );

    $("#search, #search fieldset").css({
        "padding":"8px",
        "margin-top":"-10px",
        "height":"48px"
        
    });
    
    $("#userOptions").css({
        "margin-left":"80px"
    });
    
    $("#userOptions a").css({
        "text-decoration":"underline",
        "line-height":"40px"
    });
    
    // Remove random stuff we don't need to see
    
    $("#bannerAd").remove();
    $("#adBlock").remove();
    
    $("#featured").remove();
    if (window.location.pathname === "/" && window.location.search === "") {
        $("#featuredImg").remove();
    }
    $("#userArea").remove();
    
    // Adjust margins and paddings for the new layout to save space
    
    $("#header").css({
        "margin":"0px" 
    });
    
    $("#menu-main-menu").css({
        "margin-top":"10px" 
    });
    
    $(".footercontainer1 .footeritem:first,.footercontainer2 .footeritem:first,.footercontainer3 .footeritem:first").css({
        "margin-top":"-20px" 
    });
    
    // If we're viewing a video, move the scroll bar down slightly so we don't have to do it oursevles
    
    if ( /^\/\d{4}/.test(window.location.pathname) ) {
        setTimeout(function() {
            $(document).scrollTop(140);            
        }, 1000);
    }
});
