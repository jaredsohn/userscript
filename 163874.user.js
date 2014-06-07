// ==UserScript==
// @name        ForumFix
// @namespace   Name
// @include     http://eusaforums.com/forum/index.php?action=post;topic=*
// @version     1
// ==/UserScript==


function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};

AddStyle("#BBCBox_message_button_1_1 {display:none}");
AddStyle("#BBCBox_message_button_1_2 {display:none}");
