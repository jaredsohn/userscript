// ==UserScript==
// @name            ssAutologin 
// @namespace       
// @description     Login for snapstream.net
// @include         http://*.snapstream.net/*
// ==/UserScript==
// Ripped off autologin Facebook

var pwFocus = false;

function autoLogin(){
    if(pwFocus==false){
        if(document.forms[0].elements.namedItem("_passwordBox").value.length>1){document.getElementsByTagName("INPUT").namedItem("ctl00").click();}
        else{setTimeout(autoLogin,75);}
    }
}

function focusEvent(){
    pwFocus = true;
}

if(document.forms[0] && document.forms[0].elements.namedItem("_passwordBox")){
    document.forms[0].elements.namedItem("_passwordBox").addEventListener("keypress", focusEvent, false);
    window.addEventListener("load", autoLogin, false);
}
