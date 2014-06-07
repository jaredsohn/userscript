// ==UserScript==
// @name           headcase chat
// @include http://www.head-case.org/forums/chat/
// @include http://head-case.org/forums/chat/
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};
AddStyle ("#chat-submit {display:none !important; }");
AddStyle ("#message_toolbar_2 {display:none !important;}");
AddStyle ("#message_controls {display:none !important;}");
AddStyle ("#online-chat-count {display:none !important;}");
AddStyle ("#chatters-online-wrap {height:20px !important;}");
