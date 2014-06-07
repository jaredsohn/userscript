// ==UserScript==
// @name       Digg Reader Clean
// @namespace  http://userscripts.org/users/529837
// @version    0.1
// @downloadURL http://userscripts.org/scripts/source/176632.user.js
// @updateURL http://userscripts.org/scripts/source/176632.meta.js
// @description  Removes the sidebar, ads, and other clutter from Digg Reader.
// @match      http://digg.com/reader
// @copyright  2013+, Chen Tianfei
// @grant          unsafeWindow
// @run-at document-start
// ==/UserScript==

(function() {
function appendStyle(css_url) {
  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = css_url;
  document.getElementsByTagName("head")[0].appendChild(css);
}

var url = "http://prisoner.github.io/stylesheets/diggreader.css";
appendStyle(url)
})();