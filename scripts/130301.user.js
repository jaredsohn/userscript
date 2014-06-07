// ==UserScript==
// @name           Open Gmail PDF attachments in Google Docs
// @namespace      http://userscripts.org/users/231879
// @description    Open PDF attachments with the Google Docs viewer instead of Chrome's PDF plugin
// @include        https://mail.google.com/mail/*?*view=att*
// @include        https://mail-attachment.googleusercontent.com/attachment/*?*view=att*
// ==/UserScript==

var p = unsafeWindow;

if(window.navigator.vendor.match(/Google/)) {
  var div = document.createElement("div");
  div.setAttribute("onclick", "return window;");
  p = div.onclick();
};

p.window.location.href = p.window.location.href.replace('view=att&', 'view=gvatt&');
