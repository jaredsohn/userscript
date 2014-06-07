Ã¯Â»Â¿// ==UserScript==
// @name            Myspace Auto-Login
// @namespace       http://slashetc.net/code/
// @description     Auto-login to Myspace, assuming Firefox is set to remember your password. Update: 2005-12-03
// @include         http://myspace.com/*
// @include         http://*.myspace.com/*
// ==/UserScript==
// To report bugs or suggestions, go to http://slashetc.net/home/contact

var pwFocus = false;

function autoLogin(){
    if(pwFocus==false){
        if(document.forms[1].elements.namedItem("password").value.length>1){document.forms[1].submit();}
        else{setTimeout(autoLogin,100);}
    }
}

function focusEvent(){
    pwFocus = true;
}

if(document.forms[1] && document.forms[1].elements.namedItem("password")){
    document.forms[1].elements.namedItem("password").addEventListener("keypress", focusEvent, false);
    window.addEventListener("load", autoLogin, false);
}