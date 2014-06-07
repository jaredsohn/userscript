// ==UserScript==
// @name           HSBC Password Easyfier
// @namespace      hsbc
// @description    Let's you input your Security Key with your keyboard
// @include        https://www.us.hsbc.com/*
// @include        https://www.hsbcdirect.com/*
// ==/UserScript==

window.addEventListener('load', init, false);

function init() {
    var oldPassInput = document.getElementById("password");
    if(undefined != oldPassInput){
        oldPassInput.setAttribute("onkeydown", function(e){})
    }
}
