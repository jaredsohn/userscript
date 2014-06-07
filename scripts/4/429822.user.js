// ==UserScript==
// @name         The Upper Floor Auto-HD
// @namespace    http://www.t0x1cDu5t.com
// @version      2.2
// @description  Automatically upgrades all video players to HD
// @match        *://*.theupperfloor.com/*
// @copyright    2014+, t0x1cDu5t
// @require      http://code.jquery.com/jquery-2.1.0.min.js
// @updateURL    https://gist.githubusercontent.com/t0x1cDu5t/9779727/raw/cc111f5f8078ae767658ddc994f446d69de32f11/kink.user.js
// @downloadURL  https://gist.githubusercontent.com/t0x1cDu5t/9779727/raw/cc111f5f8078ae767658ddc994f446d69de32f11/kink.user.js
// ==/UserScript==

function userscriptEventTrigger(element, event) {
  var eventObj = document.createEvent('MouseEvents');
  eventObj.initEvent(event, true, true);
  element.dispatchEvent(eventObj);
}

$.fn.click = function() {
  this.each(function() {
    userscriptEventTrigger(this, 'click')
  });
}

$('#hdQualityTab>a').click();
