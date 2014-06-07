// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kawaii Emoticons
// @namespace      http://dieyna-afieyna.blogspot.com/
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
                     
        buttons += emoticonButton("Rain", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/ame.gif");
buttons += emoticonButton("Tengkorak", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/dokuro.gif");
buttons += emoticonButton("Down", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/down.gif");
buttons += emoticonButton("Up", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/up.gif");
buttons += emoticonButton("What", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/hatena04.gif");
buttons += emoticonButton("Chic", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/hiyoko.gif");
buttons += emoticonButton("Frog", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/kaeru.gif");
buttons += emoticonButton("HP", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/keitai05.gif");
buttons += emoticonButton("Blink", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/kira01.gif");
buttons += emoticonButton("Flower", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/sakura.gif");
buttons += emoticonButton("Bunny", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/usagi.gif");
buttons += emoticonButton("Save", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/disk2.gif");
buttons += emoticonButton("Boy", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/boy.gif");
buttons += emoticonButton("girl", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/girl.gif");
buttons += emoticonButton("love", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/heart09.gif");
buttons += emoticonButton("angry", "http://i293.photobucket.com/albums/mm74/hyuana13/Cute%20Emoticons/okoru.gif");
buttons += emoticonButton("mush", "http://i217.photobucket.com/albums/cc310/Rainbows142/emoticons/mushroom.gif");
buttons += emoticonButton("cute girl", "http://i55.photobucket.com/albums/g143/curlybreadstick/Emoticons%20I%20made/cute-smile.gif");
buttons += emoticonButton("kiss", "http://i166.photobucket.com/albums/u83/bravewave/cute%20world%20of%20cute%20things%20XD/cute%20emoticons/004.gif");
buttons += emoticonButton("like", "http://i166.photobucket.com/albums/u83/bravewave/cute%20world%20of%20cute%20things%20XD/cute%20emoticons/009.gif");
buttons += emoticonButton("buekk", "http://i166.photobucket.com/albums/u83/bravewave/cute%20world%20of%20cute%20things%20XD/cute%20emoticons/010.gif");
buttons += emoticonButton("robot", "http://i125.photobucket.com/albums/p53/giorgiaD/cute%20emoticons/throbot.gif");

       
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
