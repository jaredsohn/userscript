// ==UserScript==
// @name           Grooveshark dammit!
// @namespace      Grooveshark dammit
// @match          http://grooveshark.com/*
// @include        http://grooveshark.com/*
// @match          https://grooveshark.com/*
// @include        https://grooveshark.com/*
// @match          http://*.grooveshark.com/*
// @include        http://*.grooveshark.com/*
// @match          https://*.grooveshark.com/*
// @include        https://*.grooveshark.com/*
// @version        1.0
// @description    Automatically clicks the 'Resume Playback' button when it stops playing.
// @author         lainverse
// @require      http://code.jquery.com/jquery-2.0.3.min.js
// @license        GNU GENERAL PUBLIC LICENSE
// ==/UserScript==

window.checkForInactivityWarning = function(){
    var $btn = $(".btn.btn-large.submit.btn-primary");
    if ($btn.length > 0) $btn[0].click();
};

var setGroovesharkCallback = function(){
  if(window.Grooveshark) {
    window.setInterval("window.checkForInactivityWarning()", 5000);
  } else {
    setTimeout(setGroovesharkCallback, 1000);
  };
};

$(window).ready(setGroovesharkCallback());

