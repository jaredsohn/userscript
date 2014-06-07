// ==UserScript==
// @name        Wolfram|Alpha Ads
// @description Removes ads from Wolfram|Alpha
// @author      arcyqwerty
// @include     http://www.wolframalpha.com/*
// @match       http://www.wolframalpha.com/*
// ==/UserScript==
var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
script.textContent = '(' + function(){$('#butane,#lightboxOverlay,#footerad,#headerad-pro-a').remove();} + ')();';
document.body.appendChild(script);
document.body.removeChild(script);