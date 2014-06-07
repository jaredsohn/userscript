// ==UserScript==
// @name AdultChecker
// @namespace Xxpicss
// @summary The script is check if you are adult or not
// @include        htt*://*.*
// @grant		   none
// @match          http://*.*
// @match          https://*.*
// @version        1.1
// @encoding       UTF-8
// ==/UserScript==


var c=confirm("Are you over 18?");
if(c==true)
  {
  alert("Now you can enjoy porn!");
  }
else
  {
  window.location.href = "http://google.com/";
  }