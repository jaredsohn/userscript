// ==UserScript==
// @name            ASU Network Autologin
// @namespace       
// @description     Auto-login to ASU network for Greasemonkey 0.5.3, assuming Firefox is set to remember your password. 
// @include         https://ssrls.asu.edu/auth/perfigo_weblogin.jsp*
// ==/UserScript==
// Based on the myspaceautologin.user.js script.  This file by Alan Hogan.

var pwFocus = false;

function autoLogin(){
    if(pwFocus==false){
        if(document.forms[0].elements.namedItem("password").value.length>1){document.forms[0].submit();}
        else{setTimeout(autoLogin,25);}
    }
}

function focusEvent(){
    pwFocus = true;
}

if(document.forms[0] && document.forms[0].elements.namedItem("password")){
    document.forms[0].elements.namedItem("password").addEventListener("keypress", focusEvent, false);
    window.addEventListener("load", autoLogin, false);
}