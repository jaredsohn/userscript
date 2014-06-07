// ==UserScript==
// @name           Hide iGoogle Attribution
// @namespace      http://www.stealthmonkey.com
// @description    Hides the Attribution / Created by / Author of user-made iGoogle themes
// @include        http*://www.google.*/ig*
// ==/UserScript==

if (document.getElementById('themeinfo') != null) {
  document.getElementById('themeinfo').style.display = 'none';
}
