// ==UserScript==
// @name          View Add-on Compatibility Reports
// @namespace     http://userscripts.org/scripts/show/61398
// @description   Adds a link to add-on compatibility reports on addons.mozilla.org.
// @version       0.2
// @author        http://userscripts.org/users/fcp
// @developer     LouCypher
// @license       public domain
// @screenshot    http://i.imgur.com/ADw2E.png
// @icon          https://addons.cdn.mozilla.net/img/uploads/addon_icons/15/15003-48.png
// @icon64URL     https://addons.cdn.mozilla.net/img/uploads/addon_icons/15/15003-64.png
// @homepageURL   http://userscripts.org/scripts/show/105858
// @supportURL    http://userscripts.org/scripts/discuss/105858
// @updateURL     https://userscripts.org/scripts/source/105858.meta.js
// @downloadURL   https://userscripts.org/scripts/source/105858.user.js
// @include       https://addons.mozilla.org/*/addon/*
// @grant         none
// ==/UserScript==

var addon = document.getElementById("addon");
var button = document.querySelector(".install-button > a.button");
if (addon && button) {
  var parent = button.parentNode.parentNode.parentNode.parentNode;
  var div = parent.appendChild(document.createElement("div"));
  div.style.fontFamily = "'Helvetica Neue', Arial, sans-serif";
  div.style.fontSize = "12px";
  var a = div.appendChild(document.createElement('a'));
  a.href = '../../compatibility/reporter?guid=' + addon.dataset.id;
  a.textContent = 'View compatibility reports';
}