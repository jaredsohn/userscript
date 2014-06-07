// ==UserScript==
// @name       extra facebook password
// @namespace  http://facebook.com
// @version    0.1
// @description adds an extra facebook password to change the password simply change whats in the first set of quotes /still working out the bugs im new at this/
// @match      http://facebook.com/
// @copyright  2012+, You
// ==/UserScript==

var the_password = "let me out";

var answer = prompt("What's the password?","");

if (answer != the_password) {
    document.write("access denied.<p>");
  } else {
    confirm("access granted");
  }