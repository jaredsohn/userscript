// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by ainurnajwa (http://najwaowhnajwa.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kawaiiiiii Emoticons
// @namespace      http://najwaowhnajwa.blogspot.com/
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
                      
        buttons += emoticonButton("101", "http://i.imgur.com/yDZp7.png");
buttons += emoticonButton("102", "http://i.imgur.com/OUtMm.png");
buttons += emoticonButton("103", "http://i.imgur.com/gCMxO.png");
buttons += emoticonButton("104", "http://i.imgur.com/h1AYW.png");
buttons += emoticonButton("105", "http://i.imgur.com/xLrCu.png");
buttons += emoticonButton("106", "http://i.imgur.com/JTofV.png");
buttons += emoticonButton("107", "http://i.imgur.com/ATuXX.png");
buttons += emoticonButton("108", "http://i.imgur.com/YGs6e.png");
buttons += emoticonButton("109", "http://i.imgur.com/LcKox.png");
buttons += emoticonButton("110", "http://i.imgur.com/P58pT.png");
buttons += emoticonButton("111", "http://i.imgur.com/b2waz.png");
buttons += emoticonButton("112", "http://i.imgur.com/fnm4Q.png");
buttons += emoticonButton("113", "http://i.imgur.com/hktOp.png");
buttons += emoticonButton("114", "http://i.imgur.com/ir7vH.png");
buttons += emoticonButton("115", "http://i.imgur.com/2IV9f.png");
buttons += emoticonButton("116", "http://i.imgur.com/3V4n6.png");
        
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