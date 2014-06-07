// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui (cuimingda(at)126(dot)com || http://cuimingda.com)
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Blogger Source Code Formatter
// @namespace       http://kitrule.blogspot.com
// @version         0.2
// @description     Format source code in HTML edit area.
// @include         htt*://*blogger.com/blogger.g?*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
//
// Changelog:
//   Mingda Cui (http://cuimingda.com / https://userscripts.org/scripts/show/39190)
//   0.1 @ 2008/12/25 # Initial Release
//
//   Kit Rule (http://kitrule.blogspot.com/)
//   0.2 @ 2012/03/25 # Updated to work on new template system.
//                    Removed icon dependency for letter C.
//                    Previews of code box in compose mode.
//
// Todo:
//   A good icon instead of '[#]'.
//   Direct insertion in to compose mode.
//   Fix 'escaping' code so I can successfully post this source code on blogger.
//
// Some work is based on http://www.blogger.com/common/js/2296960907-richedit-bundle.js
// 0.1 Tested on Firefox 3.05 and Greasemonkey 0.8
// 0.2 Tested on Chromium 17 and Tampermonkey 2.4
//
// Usage - Modify CSS Styles and add them into your Blogger template
//
// pre.source-code {
//   background:#f5f8fa;
//   border: solid #5C7B90;
//   border-width: 1px 1px 1px 10px;
//   color: #000000;
//   font: 13px fixed, monospace;
//   margin: 10px;
//   max-height: 500px;
//   min-height: 16px;
//   overflow: auto;
//   padding: 10px;
//   width: 90%;
//   word-wrap: normal;
// }
// pre.source-code:hover {
//   background: #fafafa;
// }
//
// --------------------------------------------------------------------------------

function iframeReady() {
  var $head = $("iframe#postingComposeBox").contents().find("head");
  if ($head.length != 1) {
    setTimeout(iframeReady, 100);
    console.log($head);
    return;
  }
  var $css = '<STYLE type="text/css">\
    pre.source-code {\
      background:#f5f8fa;\
      border: solid #5C7B90;\
      border-width: 1px 1px 1px 10px;\
      color: #000000;\
      font: 13px fixed, monospace;\
      margin: 10px;\
      max-height: 500px;\
      min-height: 16px;\
      overflow: auto;\
      padding: 10px;\
      width: 90%;\
      word-wrap: normal;\
    }\
    pre.source-code:hover {\
      background: #fafafa;\
    }\
  </STYLE>';
  $head.append($css);
}
iframeReady();

$(document).ready(function() {
  if($(this).attr("title") === "") return;
  $(".toolbarHolder")
    .append('<span id="htmlbar_formatter">[#]</span>');
  $("#htmlbar_formatter")
    .click(function(event)  { Textbar.formatSourceCode(); });
});

var Textbar = {};

Textbar.formatSourceCode = function() {
  var textarea = $("#postingHtmlBox").get(0);

  var v = textarea.value;

  var selLength = textarea.textLength;
  var selStart = textarea.selectionStart;
  var selEnd = textarea.selectionEnd;
  var scroll = textarea.scrollTop;

  var s1 = (v).substring(0,selStart);
  var s2 = (v).substring(selStart, selEnd)
  var s3 = (v).substring(selEnd, selLength);

  s2 = s2.replace(/<code[^>]*>|<\/code>|<pre[^>]*>|<\/pre>/g, "");
  s2 = s2.replace(/</g, "&lt;");
  s2 = s2.replace(/>/g, "&gt;");

  var lft = "<pre class=\"source-code\"><code>";
  var gft = "</code></pre>";

  textarea.value = s1 + "<pre class=\"source-code\"><code>" + s2 + "</code></pre>" + s3;
  textarea.setSelectionRange(s1.length, s1.length + lft.length + s2.length + gft.length);
  textarea.scrollTop = scroll;
  textarea.focus();
};