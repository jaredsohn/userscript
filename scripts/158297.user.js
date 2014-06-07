// ==UserScript==
// @name       ThomScript
// @namespace  http://thom.vndv.com
// @version    0.1
// @description  Bot
// @match      *plug.dj/*
// @copyright  2012+, You
// ==/UserScript==

var jsCode = document.createElement('script'); 
jsCode.setAttribute('id', 'thombot'); 
jsCode.setAttribute('src', 'http://raw.github.com/thxmxx/ThomScript/master/script.js'); 
document.body.appendChild(jsCode);