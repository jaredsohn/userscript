// ==UserScript==
// @name		Show Password On Mouse Over
// Last Edited		December 2013
// ==/UserScript==

/*
This script was modified in December 2013.
While the original version is I do not know anymore who the creator.
I'm Sorry...!
*/

window.setTimeout(function() {
  var passFields = document.querySelectorAll("input[type='Password']");
  if (!passFields.length) return;
  for (var i = 0; i < passFields.length; i++) {
    passFields[i].addEventListener("mouseover", function() {
      this.type = "Text";
    }, false);
    passFields[i].addEventListener("mouseout", function() {
      this.type = "Password";
    }, false);
  }
}, 1000)