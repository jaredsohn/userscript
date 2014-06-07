// ==UserScript==
// @name       Okta stay logged in.
// @namespace  http://okta.stay.logged.in.please/
// @version    0.1
// @description  Keeps you signed into Okta, if you leave the page open. 
// @match      https://*.okta.com/*
// @copyright  2012+, Ben
// ==/UserScript==

var iMBack = function(){
    var button = document.getElementById('session-timeout-ok');
    if(button){
       var evt = document.createEvent("HTMLEvents");
       evt.initEvent('click', true, true ); 
       button.dispatchEvent(evt);
    }
}

window.setInterval(iMBack,60000);