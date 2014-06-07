// ==UserScript==
// @name           Facebook Good Bye Right Column
// @description    This script clear Right column on your Facebook.
// @include        http*://*facebook.com/*
// @exclude        http*://www.facebook.com/index.php*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        1.0
// @copyright      Yoshifumi Shiiba
// ==/UserScript==

(function() {
  var css, head, inner, style;
  css = '.fbx #globalContainer {\n    width: 794px;\n}\n#headNav {\n    width: 612px;\n}\n.hasLeftCol #contentArea {\n    padding-left:59px;\n}\n.hasLeftCol #headerArea {\n    width: 568px;\n}\n#rightCol{\n    display:none;\n}';
  style = document.createElement('style');
  style.type = "text/css";
  inner = document.createTextNode(css);
  style.appendChild(inner);
  head = document.head;
  head.appendChild(style);
}).call(this);
