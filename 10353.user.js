// ==UserScript==
// @name            Apple Discussions Autologin v1
// @namespace       
// @description     Auto-login to Apple's Discussions site (forums) for Greasemonkey, assuming Firefox is set to remember your password. Based on FacebookAutoLogin.
// @include         http://support.apple.com/*
// ==/UserScript==
// Last edited 2006-06-30 by Doug Stewart to essentially rip
// off the facebookautologin.user.js script.

var pwFocus = false;

function autoLogin(){
    if(pwFocus==false){
        if(document.forms[0].elements.namedItem("theAccountPW").value.length>1){document.forms[0].submit();}
        else{setTimeout(autoLogin,75);}
    }
}

function focusEvent(){
    pwFocus = true;
}

if(document.forms[0] && document.forms[0].elements.namedItem("theAccountPW")){
    document.forms[0].elements.namedItem("theAccountPW").addEventListener("keypress", focusEvent, false);
    window.addEventListener("load", autoLogin, false);
}