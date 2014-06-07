// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by myra

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kawaii Face Emoticons for Blog
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
                     
        buttons += emoticonButton("0", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/Untitled-4.png");
buttons += emoticonButton("1", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/waa.jpg");
buttons += emoticonButton("2", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/uhmm.jpg");
buttons += emoticonButton("3", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/tsk.jpg");
buttons += emoticonButton("4", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/tongue.jpg");
buttons += emoticonButton("5", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-14.png");
buttons += emoticonButton("6", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-12-1.png");
buttons += emoticonButton("7", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-11-1.png");
buttons += emoticonButton("8", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/face23.jpg");
buttons += emoticonButton("9", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-11.png");
buttons += emoticonButton("10", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-10-1.png");
buttons += emoticonButton("11", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-10.png");
buttons += emoticonButton("12", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-9-1.png");
buttons += emoticonButton("13", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-9.png");
buttons += emoticonButton("14", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-8-1.png");
buttons += emoticonButton("15", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-8.png");
buttons += emoticonButton("16", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-7-1.png");
buttons += emoticonButton("17", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-6-1.png");
buttons += emoticonButton("18", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-5.png");
buttons += emoticonButton("19", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/Copyofeyebag.jpg");
buttons += emoticonButton("20", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-3-1.png");
buttons += emoticonButton("21", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-3.png");
buttons += emoticonButton("22", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-2-1.png");
buttons += emoticonButton("23", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-1-1.png");
buttons += emoticonButton("24", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-1.png");
buttons += emoticonButton("25", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/spark.jpg");
buttons += emoticonButton("26", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/shygry.jpg");
buttons += emoticonButton("27", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/shy.jpg");
buttons += emoticonButton("28", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/Copyofeew.jpg");
buttons += emoticonButton("29", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/oo.jpg");
buttons += emoticonButton("30", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/huh.jpg");
buttons += emoticonButton("31", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/dizzy.jpg");
buttons += emoticonButton("32", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/cutiepie6.gif");
buttons += emoticonButton("33", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/cutiepie5.gif");
buttons += emoticonButton("34", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/cutiepie1.gif");
buttons += emoticonButton("35", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/Copyofeyelashes.jpg");
buttons += emoticonButton("36", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/391.jpg");
buttons += emoticonButton("37", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/131.gif");
buttons += emoticonButton("38", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/face72-1.png");
buttons += emoticonButton("39", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/thUntitled-2-1.png");
buttons += emoticonButton("39", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/face54.jpg");
buttons += emoticonButton("39", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/face49.gif");
buttons += emoticonButton("39", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20faces/face37.jpg");
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