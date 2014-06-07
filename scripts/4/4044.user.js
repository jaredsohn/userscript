// ==UserScript==
// @name            Facebook Autologin v2
// @namespace       
// @description     Auto-login to Facebook for Greasemonkey 0.5.3, assuming Firefox is set to remember your password. Updated, more reliable version of the original; based on MySpaceAutoLogin.
// @include         http://*.facebook.com/*
// ==/UserScript==
// Last edited 2006-05-07 by Alan Hogan to essentially rip
// off the myspaceautologin.user.js script.

var pwFocus = false;

function autoLogin(){
    if(pwFocus==false){
        if(document.forms[0].elements.namedItem("pass").value.length>1){document.forms[0].submit();}
        else{setTimeout(autoLogin,75);}
    }
}

function focusEvent(){
    pwFocus = true;
}

if(document.forms[0] && document.forms[0].elements.namedItem("pass")){
    document.forms[0].elements.namedItem("pass").addEventListener("keypress", focusEvent, false);
    window.addEventListener("load", autoLogin, false);
}