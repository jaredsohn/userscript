// ==UserScript==
// @name           fixedbuttons.user.js
// @namespace      -
// @description    Fluther fixed buttons
// @include        http://www.fluther.com/*
// ==/UserScript==

function addScriptToBody(js) {
    var body = document.body, script = document.createElement('script');
    if (!body) {return}
    script.type = 'text/javascript';
    try {script.innerHTML = js}
    catch(x) {script.innerText = js}
    body.appendChild(script);
}

var scriptje = 'var backtotopper = document.createElement("a");backtotopper.setAttribute("href", "#container");backtotopper.setAttribute("id", "fixed_backtotopper");backtotopper.setAttribute("title", "Click here to scroll back to the top of the page!");backtotopper.setAttribute("style", "position:fixed;top:5px;right:5px;display:block;width:90px;height:29px;background:transparent url(http://i.imgur.com/XwdP4.png) no-repeat;");document.body.appendChild(backtotopper);';

addScriptToBody('javascript:( function() { '+scriptje+' } )();');