// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           PinkDrops Emoticons By Alyn
// @namespace      http://alynhyunnie.blogspot.com/
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

        buttons += emoticonButton("emoticon01", "http://www.anikaos.com/0005-pinky/kaos-pinky01.gif");
buttons += emoticonButton("emoticon02", "http://www.anikaos.com/0005-pinky/kaos-pinky02.gif");
buttons += emoticonButton("emoticon03", "http://www.anikaos.com/0005-pinky/kaos-pinky03.gif");
buttons += emoticonButton("emoticon04", "http://www.anikaos.com/0005-pinky/kaos-pinky04.gif");
buttons += emoticonButton("emoticon05", "http://www.anikaos.com/0005-pinky/kaos-pinky05.gif");
buttons += emoticonButton("emoticon06", "http://www.anikaos.com/0005-pinky/kaos-pinky09.gif");
buttons += emoticonButton("emoticon07", "http://www.anikaos.com/0005-pinky/kaos-pinky10.gif");
buttons += emoticonButton("emoticon08", "http://www.anikaos.com/0005-pinky/kaos-pinky08.gif");
buttons += emoticonButton("emoticon10", "http://www.anikaos.com/0005-pinky/kaos-pinky07.gif");
buttons += emoticonButton("emoticon11", "http://www.anikaos.com/0005-pinky/kaos-pinky06.gif");
buttons += emoticonButton("emoticon12", "http://www.anikaos.com/0005-pinky/kaos-pinky50.gif");
buttons += emoticonButton("emoticon14", "http://www.anikaos.com/0005-pinky/kaos-pinky49.gif");
buttons += emoticonButton("emoticon15", "http://www.anikaos.com/0005-pinky/kaos-pinky48.gif");
buttons += emoticonButton("emoticon16", "http://www.anikaos.com/0005-pinky/kaos-pinky11.gif");
buttons += emoticonButton("emoticon17", "http://www.anikaos.com/0005-pinky/kaos-pinky12.gif");
buttons += emoticonButton("emoticon18", "http://www.anikaos.com/0005-pinky/kaos-pinky13.gif");
buttons += emoticonButton("emoticon19", "http://www.anikaos.com/0005-pinky/kaos-pinky14.gif");
buttons += emoticonButton("emoticon20", "http://www.anikaos.com/0005-pinky/kaos-pinky15.gif");
buttons += emoticonButton("emoticon21", "http://www.anikaos.com/0005-pinky/kaos-pinky16.gif");
buttons += emoticonButton("emoticon22", "http://www.anikaos.com/0005-pinky/kaos-pinky17.gif");
buttons += emoticonButton("emoticon23", "http://www.anikaos.com/0005-pinky/kaos-pinky18.gif");
buttons += emoticonButton("emoticon24", "http://www.anikaos.com/0005-pinky/kaos-pinky19.gif");
buttons += emoticonButton("emoticon25", "http://www.anikaos.com/0005-pinky/kaos-pinky20.gif");
buttons += emoticonButton("emoticon26", "http://www.anikaos.com/0005-pinky/kaos-pinky21.gif");
buttons += emoticonButton("emoticon27", "http://www.anikaos.com/0005-pinky/kaos-pinky22.gif");
buttons += emoticonButton("emoticon28", "http://www.anikaos.com/0005-pinky/kaos-pinky23.gif");
buttons += emoticonButton("emoticon29", "http://www.anikaos.com/0005-pinky/kaos-pinky24.gif");
buttons += emoticonButton("emoticon30", "http://www.anikaos.com/0005-pinky/kaos-pinky25.gif");
buttons += emoticonButton("emoticon31", "http://www.anikaos.com/0005-pinky/kaos-pinky26.gif");
buttons += emoticonButton("emoticon32", "http://www.anikaos.com/0005-pinky/kaos-pinky27.gif");
buttons += emoticonButton("emoticon34", "http://www.anikaos.com/0005-pinky/kaos-pinky28.gif");
buttons += emoticonButton("emoticon35", "http://www.anikaos.com/0005-pinky/kaos-pinky29.gif");
buttons += emoticonButton("emoticon36", "http://www.anikaos.com/0005-pinky/kaos-pinky30.gif");
buttons += emoticonButton("emoticon37", "http://www.anikaos.com/0005-pinky/kaos-pinky31.gif");
buttons += emoticonButton("emoticon38", "http://www.anikaos.com/0005-pinky/kaos-pinky32.gif");
buttons += emoticonButton("emoticon39", "http://www.anikaos.com/0005-pinky/kaos-pinky33.gif");
buttons += emoticonButton("emoticon40", "http://www.anikaos.com/0005-pinky/kaos-pinky34.gif");
buttons += emoticonButton("emoticon41", "http://www.anikaos.com/0005-pinky/kaos-pinky35.gif");
buttons += emoticonButton("emoticon42", "http://www.anikaos.com/0005-pinky/kaos-pinky36.gif");
buttons += emoticonButton("emoticon43", "http://www.anikaos.com/0005-pinky/kaos-pinky37.gif");
buttons += emoticonButton("emoticon44", "http://www.anikaos.com/0005-pinky/kaos-pinky38.gif");
buttons += emoticonButton("emoticon45", "http://www.anikaos.com/0005-pinky/kaos-pinky39.gif");
buttons += emoticonButton("emoticon46", "http://www.anikaos.com/0005-pinky/kaos-pinky40.gif");
buttons += emoticonButton("emoticon47", "http://www.anikaos.com/0005-pinky/kaos-pinky41.gif");
buttons += emoticonButton("emoticon48", "http://www.anikaos.com/0005-pinky/kaos-pinky42.gif");
buttons += emoticonButton("emoticon49", "http://www.anikaos.com/0005-pinky/kaos-pinky43.gif");
buttons += emoticonButton("emoticon50", "http://www.anikaos.com/0005-pinky/kaos-pinky44.gif");
buttons += emoticonButton("emoticon51", "http://www.anikaos.com/0005-pinky/kaos-pinky45.gif");
buttons += emoticonButton("emoticon52", "http://www.anikaos.com/0005-pinky/kaos-pinky46.gif");
buttons += emoticonButton("emoticon53", "http://www.anikaos.com/0005-pinky/kaos-pinky47.gif");
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