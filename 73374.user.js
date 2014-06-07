
Inline Attachment Follows: sample script.txt
?// Based on the original script by miss.mika (http://chrispy-cookies.blogspot.com/)
// Modified by  (http://urblogurl/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name          smilies
// @namespace      http://www.chrispy-cookies.blogspot.com/
// @description    You can use emoticons in Blogger. by chrispy-cookies.blogspot.com
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname)
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
   

buttons += emoticonButton(":1:", "http://i1006.photobucket.com/albums/af181/wanaliaa/lovelytogetherbotton1.png");
buttons += emoticonButton(":1:", "http://www.imageurl.com");
buttons += emoticonButton(":1:", "http://www.imageurl.com");
buttons += emoticonButton(":1:", "http://www.imageurl.com");
   
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

}, false);