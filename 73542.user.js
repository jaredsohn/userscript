// ==UserScript==
// @name            MUtoolbar Cookies
// @namespace       http://mutoolbar.blogspot.com
// @description     Get MegaUpload Happy Hour with this script...
// @version         0.04
// @include         http://megaupload.com/*
// @include         http://www.megaupload.com/*
// @include         http://megavideo.com/*
// @include         http://www.megavideo.com/*
// @include         http://megapix.com/*
// @include         http://www.megapix.com/*
// ==/UserScript==

<!-- MegaUpload Toolbar Cookies -->
<!-- Edited by tegasinho -->
<!-- Expires Sunday, 05-Apr-2099 00:00:00 GMT -->
// Thanks to the original author of the script ( I don´t know who is - unknow )


var muToolbarIdCookieName = "megauploadtoolbar_id"
var muToolbarIdCookieValue = "33E0D2A3F93C432683B7C51F875F4E97";
var muToolbarVisibilityCookieName = "megauploadtoolbar_visibility";
var muToolbarVisibilityCookieValue = "yes";
var cookieExpiration = "expires=Sunday, 05-Apr-2099 00:00:00 GMT";

var cookies = document.cookie.split(";");
if (!muToolbarCookiesSet(cookies)) {
    document.cookie = muToolbarIdCookieName + "=" + muToolbarIdCookieValue + "; " + cookieExpiration;
    document.cookie = muToolbarVisibilityCookieName + "=" + muToolbarVisibilityCookieValue + "; " + cookieExpiration;
    
    var reload = function(e) {
        window.location.reload(true);
    };
    if (window.addEventListener) {
        window.addEventListener("load", reload, false);
    } else if (window.attachEvent) {
        window.attachEvent("onload", reload);
    } else {
        window.onload = reload;
    }
}

function muToolbarCookiesSet(cookieArray) {
    var muToolbarIdCookieSet = false;
    var muToolbarVisibilityCookieSet = false;
    
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        if (cookie.indexOf("=") >= 0) {
            var cookieName = cookie.substring(
                ((cookie.charCodeAt(0) == 32) ? 1 : 0), cookie.indexOf("="));
            if ((!muToolbarIdCookieSet) && (cookieName == muToolbarIdCookieName)) {
                muToolbarIdCookieSet = true;
            } else if ((!muToolbarVisibilityCookieSet) && (cookieName == muToolbarVisibilityCookieName)) {
                muToolbarVisibilityCookieSet = true;
            }
        }
        
        if (muToolbarIdCookieSet && muToolbarVisibilityCookieSet) {
            return true;
        }
    }
    return false;
}
