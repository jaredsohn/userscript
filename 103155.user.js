// ==UserScript==
// @name           Magento Splash Intro Remover
// @namespace      e2digital.co.nz
// @description    Removes the new Javascript-based fullscreen splash intro, which breaks the Magento Wiki
// @include        http://www.magentocommerce.com/wiki/*
// ==/UserScript==

if (window.addEventListener) // W3C
{
  window.addEventListener("load", function() {
    document.getElementById("hpIntro").style.display = "none";
    document.getElementById("mainBody").style.visibility = "";
  }, false);
}
if (window.attachEvent) // MS
{
  window.attachEvent("onload", function() {
    document.getElementById("hpIntro").style.display = "none";
    document.getElementById("mainBody").style.visibility = "";
  }, false);
}
