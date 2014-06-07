// Based on the original emoticonsforblogger by Yahoo (http://www.yahoo.co.id)
// Modified by Faiz (http://www.facebook.com/SapaYgPnyaUserNameTrpnjangDPlanetBumiAyo.PstiaFAIZ?ref=tn_tnmn) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Yahoo Icon for Blogger
// @namespace      http://www.share-xd.com / http://wwww.id-fb.com
// @description    You can use Yahoo emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/1-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/2-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/3-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/4-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/5.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/6-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/7.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/8.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/9-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/10-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/11.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/12-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/13.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/14.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/15.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/16.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/17-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/18.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/19.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/20.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/21-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/22-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/23-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/24-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/25-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/26-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/27-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/28-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/29-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/30-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/31-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/32-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/33-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/34-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/35-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/36-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/37-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/38-1.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/39.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/40.gif");
        buttons += emoticonButton("Emoticon bY Faiz", "http://i1091.photobucket.com/albums/i385/Faizzzzzzz/41-1.png");


	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);