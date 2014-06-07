// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Alyn (http://alynhyunnie.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kawaii Icons By Alyn
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

        buttons += emoticonButton("icon01", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/600.gif");
buttons += emoticonButton("icon2", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/599.gif");
buttons += emoticonButton("icon03", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/598.gif");
buttons += emoticonButton("emoticon04", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/597c.gif");
buttons += emoticonButton("emoticon05", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/597a.gif");
buttons += emoticonButton("emoticon06", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/596c.gif");
buttons += emoticonButton("emoticon07", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/596a.gif");
buttons += emoticonButton("emoticon08", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/595c.gif");
buttons += emoticonButton("emoticon10", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/595a.gif");
buttons += emoticonButton("emoticon11", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/594c.gif");
buttons += emoticonButton("emoticon12", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/594a.gif");
buttons += emoticonButton("emoticon14", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/593c.gif");
buttons += emoticonButton("emoticon15", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/593a.gif");
buttons += emoticonButton("emoticon16", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/592c.gif");
buttons += emoticonButton("emoticon17", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/592a.gif");
buttons += emoticonButton("emoticon18", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/591c.gif");
buttons += emoticonButton("emoticon19", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/591a.gif");
buttons += emoticonButton("emoticon20", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/590.gif");
buttons += emoticonButton("emoticon21", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/589.gif");
buttons += emoticonButton("emoticon22", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/588.gif");
buttons += emoticonButton("emoticon23", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/587.gif");
buttons += emoticonButton("emoticon24", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/586.gif");
buttons += emoticonButton("emoticon25", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/585.gif");
buttons += emoticonButton("emoticon26", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/584.gif");
buttons += emoticonButton("emoticon27", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/583a.gif");
buttons += emoticonButton("emoticon28", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/583.gif");
buttons += emoticonButton("emoticon29", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/582.gif");
buttons += emoticonButton("emoticon30", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/581.gif");
buttons += emoticonButton("emoticon31", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/580a.gif");
buttons += emoticonButton("emoticon32", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/580.gif");
buttons += emoticonButton("emoticon34", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/579.gif");
buttons += emoticonButton("emoticon35", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/578.gif");
buttons += emoticonButton("emoticon36", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/577.gif");
buttons += emoticonButton("emoticon37", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/576.gif");
buttons += emoticonButton("emoticon38", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/575.gif");
buttons += emoticonButton("emoticon39", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/574.gif");
buttons += emoticonButton("emoticon40", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/573.gif");
buttons += emoticonButton("emoticon41", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/572.gif");
buttons += emoticonButton("emoticon42", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/571.gif");
buttons += emoticonButton("emoticon43", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/570b.gif");
buttons += emoticonButton("emoticon44", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/570.gif");
buttons += emoticonButton("emoticon45", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/569.gif");
buttons += emoticonButton("emoticon46", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/568.gif");
buttons += emoticonButton("emoticon47", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/566.gif");
buttons += emoticonButton("emoticon48", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/565.gif");
buttons += emoticonButton("emoticon49", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/564.gif");
buttons += emoticonButton("emoticon50", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/563.gif");
buttons += emoticonButton("emoticon51", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/561.gif");
buttons += emoticonButton("emoticon52", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/560.gif");
buttons += emoticonButton("emoticon53", "http://i1013.photobucket.com/albums/af259/princessellynn/Cute%20Icons/562.gif");
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