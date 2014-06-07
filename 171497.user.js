// ==UserScript==
// @name        HDW_Sign
// @namespace   htt://userscripts.org/users/wet2
// @include     https://hdwing.com/*
// @include     http://hdwing.com/*
// @include     https://www.hdwing.com/*
// @include     http://www.hdwing.com/*
// @version     1
// ==/UserScript==

function sign(){
    if(document.getElementById("sign_button"))
    document.getElementById("sign_button").click();
}
setTimeout(sign,200);