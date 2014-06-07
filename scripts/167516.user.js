// ==UserScript==
// @name       bhwallpapers
// @namespace  bhwallpapers
// @version    1.0.1
// @description  Correct the URLs of fullscreen (or larger wallpapers)
// @include *www.bhwallpapers.info/*
// @include *www.bhwallpapers.net/*
// @include *zoomgirls.net/*
// @include *www.babewallpapershd.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==



$(document).ready(function (){
    $('object').remove();
    $('iframe').remove();
    $("#content .wallpaper-resolutions a").each(function () {
        var currentLocationPathName = window.location.pathname;
        var tempText = $(this).text();
        tempText = tempText.replace(/\s/g, '');
        var newHrefAttr = currentLocationPathName.substr(0, (currentLocationPathName.length - 15)) + tempText + ".jpg";
        newHrefAttr = "/wallpapers" + newHrefAttr;
        $(this).removeAttr("onclick");
        $(this).attr("href", newHrefAttr);
    });
    
    if (window.location.hostname == "www.zoomgirls.net") {
            $(".side-header2").remove();
        }
    if (window.location.hostname == "www.babewallpapershd.com")
        $('script[src="http://www.babewallpapershd.com/swfobject.js"]').remove();
});