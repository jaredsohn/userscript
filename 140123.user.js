// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by myra

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Small Kawaii Emoticons for Blog
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
                     
        buttons += emoticonButton("0", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/YGs6e.png");
buttons += emoticonButton("1", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/yDZp7.png");
buttons += emoticonButton("2", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/xgkeS.png");
buttons += emoticonButton("3", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/up-blue.png");
buttons += emoticonButton("4", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/free_avatar___apple__3_by_kiki_myaki-d2ygnkm.gif");
buttons += emoticonButton("5", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/tdo-1.gif");
buttons += emoticonButton("6", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/StrawberryUpdated.gif");
buttons += emoticonButton("7", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/StarBackButtonBlue.gif");
buttons += emoticonButton("8", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/sick.gif");
buttons += emoticonButton("9", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/OUtMm.png");
buttons += emoticonButton("10", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/mg142.gif");
buttons += emoticonButton("11", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/JTofV.png");
buttons += emoticonButton("12", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/ir7vH.png");
buttons += emoticonButton("13", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/h1AYW.png");
buttons += emoticonButton("14", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/gCMxO.png");
buttons += emoticonButton("15", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/fnm4Q.png");
buttons += emoticonButton("16", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/f107dc5d.gif");
buttons += emoticonButton("17", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/doctor.gif");
buttons += emoticonButton("18", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/cherryhappy.png");
buttons += emoticonButton("19", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/camera-1.gif");
buttons += emoticonButton("20", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/bulletyellow.gif");
buttons += emoticonButton("21", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/bulletpurple.gif");
buttons += emoticonButton("22", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/bulletpink.gif");
buttons += emoticonButton("23", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/bulletblue.gif");
buttons += emoticonButton("24", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/blinkies-1.gif");
buttons += emoticonButton("25", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/b2waz.png");
buttons += emoticonButton("26", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/ATuXX.png");
buttons += emoticonButton("27", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/a1a.gif");
buttons += emoticonButton("28", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/068.gif");
buttons += emoticonButton("29", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/067.gif");
buttons += emoticonButton("30", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/16a25a0a.gif");
buttons += emoticonButton("31", "http://i1209.photobucket.com/albums/cc398/myralyle/kamiocake1-1.gif");
buttons += emoticonButton("32", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/4gaJP.png");
buttons += emoticonButton("33", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/2gHzY.png");
buttons += emoticonButton("34", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/weolcome1.png");
buttons += emoticonButton("35", "http://i1209.photobucket.com/albums/cc398/myralyle/435917mgna5pq4wj.gif");
buttons += emoticonButton("36", "http://i1209.photobucket.com/albums/cc398/myralyle/thminiventilador.gif");
buttons += emoticonButton("37", "http://i1209.photobucket.com/albums/cc398/myralyle/tenki8.gif");
buttons += emoticonButton("38", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/facebook.png");
buttons += emoticonButton("39", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/bulletyellow.gif");
buttons += emoticonButton("40", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/bulletpurple.gif");
buttons += emoticonButton("41", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/bulletpink.gif");
buttons += emoticonButton("42", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/bulletblue.gif");
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