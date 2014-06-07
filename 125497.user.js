// ==UserScript==
// @name            Google Autologin
// @namespace       kleinerChemiker.net
// @description     Auto-login to Google, assuming Firefox is set to remember your password. Based on Facebook Autologin v2.
// @include         https://accounts.google.com/*
// ==/UserScript==
// Last edited 2012-02-11 by kleinerChemiker
// 

var pwFocus = false;

function autoLogin(){
    if(pwFocus==false){
        if(document.forms.gaia_loginform.elements.namedItem("Passwd").value.length>1){document.forms.gaia_loginform.submit();}
        else{setTimeout(autoLogin,75);}
    }
}

function focusEvent(){
    pwFocus = true;
}

if(document.forms.gaia_loginform && document.forms.gaia_loginform.elements.namedItem("Passwd")){
    document.forms.gaia_loginform.elements.namedItem("Passwd").addEventListener("keypress", focusEvent, false);
    window.addEventListener("load", autoLogin, false);
}