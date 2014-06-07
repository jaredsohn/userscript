// ==UserScript==
// @name           ilix.in Bypasser
// @namespace      http://slashdot.jp/~bicradash/
// @description    Skips the hold page / Shows the original page
// @include        http://ilix.in/*
// ==/UserScript==
//
// Skipping the hold page only works while captcha does not appear.

(function(){

var forms = document.getElementsByTagName("form");
var iframes = document.getElementsByTagName("iframe");

if (forms.length > 0) {
  if (!forms[0].innerHTML.match(/captcha/i)) {
    forms[0].submit();
  }
} else if (iframes.length > 0) {
  location.href = iframes[iframes.length - 1].src;
}

})();