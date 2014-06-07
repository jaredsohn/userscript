// ==UserScript==
// @description RIP in peace "Captcha incorreto".
// @grant       none
// @include     /ch(an)?\.(info|com|net|org|tk)/
// @name        Captcha Auto-Update
// @version     0.1.0
// ==/UserScript==

var captchaImage, input, onClick;
input = document.getElementsByName('captcha')[0];
if (input !== undefined) {
  input.onfocus = function () {
    "use strict";
    if (this.value === '') {
      captchaImage = document.getElementById('captchaimage');
      if (captchaImage !== null) {
        onClick = captchaImage.parentElement.onclick;
        if (typeof onClick === 'function') {
          onClick.call(input);
        }
      }
    }
  };
}
