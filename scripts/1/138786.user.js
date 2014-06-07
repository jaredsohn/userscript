// ==UserScript==
// @name           derstandard.at: Disable "update your email address" message
// @namespace      http://userscripts.org/users/79816
// @description    Disables the "update your email address" message
// @version        1.0.1
// @copyright      2012, ulrichb
// @include        http*://derstandard.at/*
// ==/UserScript==

(function () {
  //console.log('EmailValidation:', unsafeWindow.EmailValidation);

  if (unsafeWindow.EmailValidation && unsafeWindow.EmailValidation.showDialog) {
    unsafeWindow.EmailValidation.showDialog =  function() {};
  }
})();
