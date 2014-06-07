// Based on the original emoticons for blogger by kumako (http://ishihara-kumako.blogspot.com)
// Modified by Ishihara Kumako (http://ishihara-kumako.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name          Kumako's Kawaii Emoticon 
// @namespace     http://ishihara-kumako.blogspot.com/
// @description   You can use emoticons in Blogger. by ishihara-kumako.blogspot.com
// @include       http://*.blogger.com/post-edit.g?*
// @include       http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname)
{
var editbar = document.getElementById(domname);
if (editbar) {

var buttons = "<br/>";

buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/b90ad9ca.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/c84bda3c.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/a55c8d02-1.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/a55c8d02.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/357c3622.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/83d1b55e.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/8b6fa1ba.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/14fdbb1e.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/f7ae5553-1.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/7495d772.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/9c3ea7f1.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/f7ae5553.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/90c9b787.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/ead62787.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/a68c38a1.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/11c2034e.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/0202e350-1.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/0202e350.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/2568f8a1.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/4866a3b0.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/0aaac0ea.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/d8e18bc8.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/dbb0c760.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/cbbacd7d.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/12ac3d50.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/lawl-button1.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/hyrunysaaa-button6.gif");
buttons += emoticonButton("kumako", "http://i966.photobucket.com/albums/ae144/beela910/cute/Jaslyn-button11.gif");




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