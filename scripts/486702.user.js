// ==UserScript==
// @name       tuicool Clean
// @namespace  http://userscripts.org/users/486702
// @version    0.1
// @downloadURL http://userscripts.org/scripts/source/486702.user.js
// @updateURL http://userscripts.org/scripts/source/486702.meta.js
// @description  Removes the sidebar, ads, and other clutter from Xianguo Reader.
// @match      http://www.tuicool.com/articles/*
// @copyright  2014+, Chen Tianfei
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

function appendjs(js_url) {
  var css = document.createElement('script');
  css.type = 'text/javascript';
  css.src = js_url;
  document.getElementsByTagName("head")[0].appendChild(css);
}

var url = "http://test-6sm7c.qiniudn.com/userscript/tuicool.css";
appendStyle(url);
})();
