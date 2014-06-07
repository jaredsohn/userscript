// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by myra (http://belog-myra.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Ascii Emoticon
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
                     
        buttons += emoticonButton("emoticon01", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/text-line-smiley-121.gif");
buttons += emoticonButton("emoticon02", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/text-line-smiley-148.gif");
buttons += emoticonButton("emoticon03", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/text-line-smiley-029.gif");
buttons += emoticonButton("emoticon04", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/text-line-smiley-032.gif");
buttons += emoticonButton("emoticon05", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/text-line-smiley-083.gif");
buttons += emoticonButton("emoticon06", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/text-line-smiley-100.gif");
buttons += emoticonButton("emoticon07", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/text-line-smiley-119.gif");
buttons += emoticonButton("emoticon08", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/44-1.gif");
buttons += emoticonButton("emoticon09", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/43-1.gif");
buttons += emoticonButton("emoticon10", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/41-1.gif");
buttons += emoticonButton("emoticon11", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/38-1.gif");
buttons += emoticonButton("emoticon12", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/37-1.gif");
buttons += emoticonButton("emoticon13", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/36-1.gif");
buttons += emoticonButton("emoticon14", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/35-1.gif");
buttons += emoticonButton("emoticon15", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/33-1.gif");
buttons += emoticonButton("emoticon16", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/32-1.gif");
buttons += emoticonButton("emoticon17", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/31-1.gif");
buttons += emoticonButton("emoticon18", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/30-1.gif");
buttons += emoticonButton("emoticon19", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/27-1.gif");
buttons += emoticonButton("emoticon20", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/26-1.gif");
buttons += emoticonButton("emoticon21", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/25-1.gif");
buttons += emoticonButton("emoticon22", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/24-1.gif");
buttons += emoticonButton("emoticon23", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/21-1.gif");
buttons += emoticonButton("emoticon24", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/20-1.gif");
buttons += emoticonButton("emoticon25", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/19-1.gif");
buttons += emoticonButton("emoticon26", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/16-1.gif");
buttons += emoticonButton("emoticon27", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/15-1.gif");
buttons += emoticonButton("emoticon28", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/12-1.gif");
buttons += emoticonButton("emoticon29", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/10-1.gif");
buttons += emoticonButton("emoticon30", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/9-1.gif");
buttons += emoticonButton("emoticon31", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/7-1.gif");
buttons += emoticonButton("emoticon32", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/6-1.gif");
buttons += emoticonButton("emoticon33", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/3-1.gif");
buttons += emoticonButton("emoticon34", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/16.gif");
buttons += emoticonButton("emoticon35", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/11.gif");
buttons += emoticonButton("emoticon36", "http://i1209.photobucket.com/albums/cc398/myralyle/Ascii%20Emoticons/5.gif");
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