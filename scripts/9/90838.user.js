// ==UserScript==
// @name           DCU: Focus member number field.
// @description    Jumps automatically into the member number input field.
// @date           2013-05-21
// @author         r2r
// @version        1.0.2
// @match          http://www.dcu.org
// @match          http://www.dcu.org/index.html
// @match          https://www.dcu.org
// @match          https://www.dcu.org/index.html
// ==/UserScript==

(function() { 

  var element = document.getElementById('userid');
  element.focus();

})();
