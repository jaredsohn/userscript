// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by myra

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Small Kawaii Numbers
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
                     
        buttons += emoticonButton("00", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/b0b97240.png");
buttons += emoticonButton("01", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/1.png");
buttons += emoticonButton("02", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/2.png");
buttons += emoticonButton("03", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/3.png");
buttons += emoticonButton("04", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/4.png");
buttons += emoticonButton("05", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/5.png");
buttons += emoticonButton("06", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/6.png");
buttons += emoticonButton("07", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/7.png");
buttons += emoticonButton("08", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/8.png");
buttons += emoticonButton("09", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/9.png");
buttons += emoticonButton("emoticon10", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/10.png");
buttons += emoticonButton("1", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/th1-1.gif");
buttons += emoticonButton("2", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/th2-1.gif");
buttons += emoticonButton("3", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/th3-1.gif");
buttons += emoticonButton("4", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/th4-1.gif");
buttons += emoticonButton("5", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/5-1.gif");
buttons += emoticonButton("6", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/th6.gif");
buttons += emoticonButton("7", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/th7.gif");
buttons += emoticonButton("8", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/th8.gif");
buttons += emoticonButton("9", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/th9.gif");
buttons += emoticonButton("0", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/db095bfd.gif");
buttons += emoticonButton("1", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/1-1.gif");
buttons += emoticonButton("2", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/2-1.gif");
buttons += emoticonButton("3", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/3-1.gif");
buttons += emoticonButton("4", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/4-1.gif");
buttons += emoticonButton("5", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/5-2.gif");
buttons += emoticonButton("6", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/6-1.gif");
buttons += emoticonButton("7", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/7-1.gif");
buttons += emoticonButton("8", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/8-1.gif");
buttons += emoticonButton("9", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/9-1.gif");
buttons += emoticonButton("0", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/1e0eb8950ea22eb58c043d7b6238939a.gif");
buttons += emoticonButton("1", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/863287d81fb051ea1973530885a469fa.gif");
buttons += emoticonButton("2", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/d408702d44383ed4394ce8a19356b435.gif");
buttons += emoticonButton("3", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/4199061f501eca26b90b5269a52bb4f5.gif");
buttons += emoticonButton("4", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/4b5fbfda470b94ce413638d9b844d384.gif");
buttons += emoticonButton("5", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/b24d2d4df87e15282ddae0015c37cb08.gif");
buttons += emoticonButton("6", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/a9017f2016d43e92886505be6e13ce91.gif");
buttons += emoticonButton("7", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/5d6aeee1616b03df739f60030db4aa9f.gif");
buttons += emoticonButton("8", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/20e46b0d052dce749fb7dbfe0ba12cc3.gif");
buttons += emoticonButton("9", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20numbers/9599f8fc00f63e21dce2ae3667181d19.gif");
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