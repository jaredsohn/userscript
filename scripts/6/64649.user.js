// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Pink Kawaii 2 Emoticons
// @namespace      http://n-a-j-w-a.blogspot.com/
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
                     
        buttons += emoticonButton("emoticon01", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/1b2dab7c.gif");
buttons += emoticonButton("emoticon02", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/ea91c641.gif");
buttons += emoticonButton("emoticon03", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/d91d1603.gif");
buttons += emoticonButton("emoticon04", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/2.gif");
buttons += emoticonButton("emoticon05", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/1.gif");
buttons += emoticonButton("emoticon06", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/fe988963.gif");
buttons += emoticonButton("emoticon07", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/5e9d0be6.gif");
buttons += emoticonButton("emoticon08", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/1aa1673b.gif");
buttons += emoticonButton("emoticon09", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/4e2f493a.gif");
buttons += emoticonButton("emoticon10", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/OK-1.gif");
buttons += emoticonButton("emoticon11", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/w.gif");
buttons += emoticonButton("emoticon12", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/f107dc5d.gif");
buttons += emoticonButton("emoticon13", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/16a25a0a.gif");
buttons += emoticonButton("emoticon14", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/ab383aeb.gif");
buttons += emoticonButton("emoticon15", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/04334964.gif");
buttons += emoticonButton("emoticon16", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/d337fcb0.gif");
buttons += emoticonButton("emoticon17", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/--4.gif");
buttons += emoticonButton("emoticon18", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/--5.gif");
buttons += emoticonButton("emoticon19", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/--4.gif");
buttons += emoticonButton("emoticon20", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/--4.gif");
buttons += emoticonButton("emoticon21", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/--4.gif");
buttons += emoticonButton("emoticon22", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/--4.gif");
buttons += emoticonButton("emoticon23", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/--4.gif");
buttons += emoticonButton("emoticon24", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/--4.gif");
buttons += emoticonButton("emoticon25", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/--4.gif");
buttons += emoticonButton("emoticon26", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/--8.gif");
buttons += emoticonButton("emoticon27", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/--9.gif");
buttons += emoticonButton("emoticon28", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/--10.gif");
buttons += emoticonButton("emoticon29", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/--16.gif");
buttons += emoticonButton("emoticon30", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/--19.gif");
buttons += emoticonButton("emoticon31", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/-0001-1.gif");
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
