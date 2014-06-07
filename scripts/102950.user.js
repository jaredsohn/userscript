// ==UserScript==
// @name           Fixed Facebook Style
// @description    This script fix Blue bar and Left column on your Facebook.
// @include        http*://*facebook.com/*
// @exclude        http*://www.facebook.com/index.php*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        1.4
// @copyright      Yoshifumi Shiiba
// ==/UserScript==
(function() {

  var css, head, inner, style;
  css = '\n.uiComposerMessageBox .input {\n    font-size: 16px;\n    height: 20px;\n    color: #444;\n}\n.uiSideNav .item, .uiSideNav .subitem {\n    border-bottom: 1px solid transparent;\n}\n#headNav{\n    background: -moz-linear-gradient(top, #5871A7, #455882);\n    background: -webkit-gradient(linear, left top, left bottom, from(#5871A7), to(#455882));\n    \n    shadow: 0px -7px 15px #1B3C7E;\n    -webkit-box-shadow: 0px -7px 15px #1B3C7E;\n    box-shadow: 0px -7px 15px #1B3C7E;\n    width:799px;\n}\n#leftCol {\n    position:fixed;\n}\n#blueBar {\n    -webkit-box-shadow: 0 0 7px #333;\n    position:fixed;\n    z-index:3;\n}\n#pageHead {\n    position:fixed;\n    z-index:3;\n}\n#content {\n    padding-top:41px;\n}\n#contentCol {\n    shadow: 0px 0px 30px #CCC;\n    -webkit-box-shadow: 0px 0px 30px #CCC;\n    box-shadow: 0px 0px 30px #CCC;\n}\n.hideWhenFixed{\n    display:none;\n}';
  style = document.createElement('style');
  style.type = "text/css";
  inner = document.createTextNode(css);
  style.appendChild(inner);
  head = document.head;
  head.appendChild(style);
}).call(this);
