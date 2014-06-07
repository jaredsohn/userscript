// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by theaisya (http://ain-pinkhouse.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           aind
// @namespace      http://ain-pinkhouse.blogspot.com.blogspot.com
// @description    You can use emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname)
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
                     
buttons += emoticonButton("emotikon01", "http://i774.photobucket.com/albums/yy29/aind97/aind%20emoticons/05-1.gif");
buttons += emoticonButton("emotikon02", "http://i774.photobucket.com/albums/yy29/aind97/aind%20emoticons/01-2.gif");
buttons += emoticonButton("emotikon03", "http://i774.photobucket.com/albums/yy29/aind97/aind%20emoticons/10.gif");
buttons += emoticonButton("emotikon04", "http://i774.photobucket.com/albums/yy29/aind97/aind%20emoticons/11.gif");
buttons += emoticonButton("emotikon03a", "http://i774.photobucket.com/albums/yy29/aind97/aind%20emoticons/31.gif");
buttons += emoticonButton("emotikon03f", "http://i774.photobucket.com/albums/yy29/aind97/aind%20emoticons/13-1.gif");
buttons += emoticonButton("emotikon03q", "http://i774.photobucket.com/albums/yy29/aind97/aind%20emoticons/46.gif");
buttons += emoticonButton("emotikon03w", "http://i774.photobucket.com/albums/yy29/aind97/aind%20emoticons/39.gif");





    buttons += separator();
    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"\\\" height=\\\"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);