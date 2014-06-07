// ==UserScript==
// @name            MUtoolbar Cookies
// @namespace       http://wawasaw.blogspot.com
// @description     Get MegaUpload Happy Hour with this script...
// @include         http://megaupload.com/*
// @include         http://www.megaupload.com/*
// @include         http://megavideo.com/*
// @include         http://www.megavideo.com/*
// @include         http://megapix.com/*
// @include         http://www.megapix.com/*
// @include         http://megarotic.com/*
// @include         http://www.megarotic.com/*
// ==/UserScript==

<!-- MegaUpload Toolbar Cookies -->
<!-- Edited by tegasinho -->
<!-- Version 0.01 - Build 2 -->
<!-- Expires Sunday, 05-Apr-2099 05:00:00 GMT -->



var muToolbarIdCookieName = "Wawasaw-premium"
var muToolbarIdCookieValue = "FIC0Y5WJCS-YNVJACJLJNVV.K3TOOXWJ";
var muToolbarVisibilityCookieName = "megauploadtoolbar_visibility";
var muToolbarVisibilityCookieValue = "yes";


var cookies = document.cookie.split(";");
if (!muToolbarCookiesSet(cookies)) {
    document.cookie = mu-Premium + "=" + mu-Premium-By-wawasaw + "; " + cookieExpiration;
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