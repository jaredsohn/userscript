// ==UserScript==
// @name          MegaUpLLoad
// @namespace     ide
// @description	  Enables users to use the MegaUpload Happy Hour feature
// @include       http://www.megaupload.com/*premium/?happyhour
// @include       http://megaupload.com/*premium/?happyhour
// ==/UserScript==

var muToolbarIdCookieName = "megauploadtoolbar_id"
var muToolbarIdCookieValue = "5EC3D5249145D83BB5BE5EAD07A52E67";
var muToolbarVisibilityCookieName = "megauploadtoolbar_visible";
var muToolbarVisibilityCookieValue = "yes";
var cookieExpiration = "expires=Sunday, 04-Apr-2010 05:00:00 GMT";

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