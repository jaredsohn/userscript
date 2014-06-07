// ==UserScript==
// @name           Skip youtube age check
// @namespace      http://bmeakings.dyndns.org
// @description    Automatically submits the birth date confirmation on YouTube as well as hiding the unsuitable for minors notice
// @include        http://www.youtube.com/watch?*
// @include        http://www.youtube.com/verify_age?*
// ==/UserScript==

var ageCheckDiv = document.getElementById("verify-age");

if (ageCheckDiv != undefined)
{
  var ageCheckForm = ageCheckDiv.getElementsByTagName("form")[0];
  ageCheckForm.getElementsByTagName("input")[1].click();
}

var thinkOfTheChildren = document.getElementById("watch-highlight-racy-box");

if (thinkOfTheChildren != undefined)
{
  thinkOfTheChildren.style.display = "none";
}

