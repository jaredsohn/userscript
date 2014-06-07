// ==UserScript==
// @name           smilies
// @namespace      smile
// @description    forblogger
// @include        http://userscripts.org/topics/*
// ==/UserScript==







// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Cahya Prastyanto (http://blogger-emoticon.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger Onion 3.0
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger. by Blogger-Emoticon.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
        
buttons += emoticonButton("1", "http://i959.photobucket.com/albums/ae76/Onimomo159/Crystals%20smilies%20are%20so%20cute/zDswE.png");
buttons += emoticonButton("2", "http://i959.photobucket.com/albums/ae76/Onimomo159/Crystals%20smilies%20are%20so%20cute/Yl4qN.png");
buttons += emoticonButton("3", "http://i959.photobucket.com/albums/ae76/Onimomo159/Crystals%20smilies%20are%20so%20cute/sx6uJ.png");
buttons += emoticonButton("4", "http://i959.photobucket.com/albums/ae76/Onimomo159/Crystals%20smilies%20are%20so%20cute/qoLyB.png");
buttons += emoticonButton("5", "http://i959.photobucket.com/albums/ae76/Onimomo159/Crystals%20smilies%20are%20so%20cute/qk7fD.png");
buttons += emoticonButton("6", "http://i959.photobucket.com/albums/ae76/Onimomo159/Crystals%20smilies%20are%20so%20cute/p97BN.png");
buttons += emoticonButton("7", "http://i959.photobucket.com/albums/ae76/Onimomo159/Crystals%20smilies%20are%20so%20cute/P5eHX.png");
buttons += emoticonButton("8", "http://i959.photobucket.com/albums/ae76/Onimomo159/Crystals%20smilies%20are%20so%20cute/LGXHL.png");
buttons += emoticonButton("9", "http://i959.photobucket.com/albums/ae76/Onimomo159/Crystals%20smilies%20are%20so%20cute/jYMy7.png");
buttons += emoticonButton("10", "http://i959.photobucket.com/albums/ae76/Onimomo159/Crystals%20smilies%20are%20so%20cute/JfT0p.png");
buttons += emoticonButton("11", "http://i959.photobucket.com/albums/ae76/Onimomo159/Crystals%20smilies%20are%20so%20cute/HqRLz.png");
buttons += emoticonButton("12", "http://i959.photobucket.com/albums/ae76/Onimomo159/Crystals%20smilies%20are%20so%20cute/HiPlC.png");
buttons += emoticonButton("13", "http://i959.photobucket.com/albums/ae76/Onimomo159/Crystals%20smilies%20are%20so%20cute/hIKUz.png");
buttons += emoticonButton("14", "http://i959.photobucket.com/albums/ae76/Onimomo159/Crystals%20smilies%20are%20so%20cute/GmlZV.png");
buttons += emoticonButton("15", "http://i959.photobucket.com/albums/ae76/Onimomo159/Crystals%20smilies%20are%20so%20cute/f9Vog.png");
buttons += emoticonButton("16", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/83.jpg");
buttons += emoticonButton("17", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/82.jpg");
buttons += emoticonButton("18", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/72.jpg");
buttons += emoticonButton("19", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/69.jpg");
buttons += emoticonButton("20", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/58.jpg");
buttons += emoticonButton("21", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/61-2.jpg");
buttons += emoticonButton("22", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/57.jpg");
buttons += emoticonButton("23", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/32-1.jpg");
buttons += emoticonButton("24", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/030.gif");
buttons += emoticonButton("25", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/26.jpg");
buttons += emoticonButton("26", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/10-2.jpg");
buttons += emoticonButton("27", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/06.jpg");
buttons += emoticonButton("28", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/95.jpg");
buttons += emoticonButton("29", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/96f88g.jpg");
buttons += emoticonButton("30", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/kawaii.gif");
buttons += emoticonButton("31", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/84-1.jpg");
buttons += emoticonButton("32", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/80-1.jpg");
buttons += emoticonButton("33", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/65-1.jpg");
buttons += emoticonButton("34", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/063-1.gif");
buttons += emoticonButton("35", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/052.gif");
buttons += emoticonButton("36", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/32.gif");
buttons += emoticonButton("37", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/28-1.jpg");
buttons += emoticonButton("38", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/025-1.gif");
buttons += emoticonButton("39", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/25.gif");
buttons += emoticonButton("40", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/24.gif");
buttons += emoticonButton("41", "http://i959.photobucket.com/albums/ae76/Onimomo159/Paperplanes/45-1.jpg");
        
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
