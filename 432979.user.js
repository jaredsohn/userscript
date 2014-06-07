// ==UserScript==
// @name           Morgan Stanley - Benefitaccess: Focus user name field.
// @description    Jumps automatically into the user name input field.
// @date           2014-03-28
// @author         r2r
// @version        1.0
// @match          https://www.benefitaccess.com/
// ==/UserScript==

(function() { 

  var element = document.getElementById('username');
  element.focus();

})();
