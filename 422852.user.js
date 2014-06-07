// ==UserScript==
// @name       Google Code Fullmail
// @namespace  http://thejh.net/
// @version    0.2
// @description  persistent full mail addresses on google code
// @match      https://code.google.com/*
// @copyright  2012+, You
// ==/UserScript==

var pathparts = document.location.pathname.split('/');

// get current user and add him
var __jh_user;
if (pathparts[1]==='u' && pathparts.length >=3) __jh_user=document.getElementsByClassName("profile-container")[0];
if (__jh_user) __jh_user=[].slice.call(__jh_user.getElementsByTagName("span")).map(function(e){
    return e.innerText;
}).filter(function(s){
    return s.indexOf('@')!=-1;
})[0];
if (__jh_user && __jh_user.indexOf('...')==-1) {
    console.log("user "+pathparts[2]+" has email "+__jh_user);
    GM_setValue("emailof:"+pathparts[2], __jh_user);
}

// look for known users and fix them
[].slice.call(document.getElementsByClassName('userlink')).forEach(function(userlink) {
    if (typeof userlink.href !== 'string') return;
    var linkparts = userlink.href.split('/');
    if (linkparts.length == 6) linkparts = linkparts.slice(2)
    if (linkparts.length == 4 && linkparts[1] == 'u') {
        var new_text = GM_getValue("emailof:"+linkparts[2], userlink.innerText)
        if (new_text != userlink.innerText) {
            console.log('fixing '+userlink.innerText+' -> '+new_text)
        	userlink.innerText = new_text
        }
    }
});