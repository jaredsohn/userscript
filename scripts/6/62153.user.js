// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://ceritabasiaisya.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           gile2 Emoticons
// @namespace      http://ceritabasiaisya.blogspot.com
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
                     
buttons += emoticonButton("emoticon01", "http://i620.photobucket.com/albums/tt281/aisya99/1.gif");
buttons += emoticonButton("emoticon02", "http://i620.photobucket.com/albums/tt281/aisya99/10.gif");
buttons += emoticonButton("emoticon03", "http://i620.photobucket.com/albums/tt281/aisya99/111e7b5d0ca6e22bee18b51084855be2.gif");
buttons += emoticonButton("emoticon04", "http://i620.photobucket.com/albums/tt281/aisya99/13.gif");
buttons += emoticonButton("emoticon05", "http://i620.photobucket.com/albums/tt281/aisya99/14.gif");
buttons += emoticonButton("emoticon06", "http://i620.photobucket.com/albums/tt281/aisya99/15.gif");
buttons += emoticonButton("emoticon07", "http://i620.photobucket.com/albums/tt281/aisya99/3.gif");
buttons += emoticonButton("emoticon08", "http://i620.photobucket.com/albums/tt281/aisya99/31.gif");
buttons += emoticonButton("emoticon09", "http://i620.photobucket.com/albums/tt281/aisya99/4.gif");
buttons += emoticonButton("emoticon10", "http://i620.photobucket.com/albums/tt281/aisya99/5.gif");
buttons += emoticonButton("emoticon11", "http://i620.photobucket.com/albums/tt281/aisya99/6.gif");
buttons += emoticonButton("emoticon12", "http://i620.photobucket.com/albums/tt281/aisya99/8.gif");
buttons += emoticonButton("emoticon13", "http://i620.photobucket.com/albums/tt281/aisya99/thstressball.gif");



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