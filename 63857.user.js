// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by TheNurinAdlina (http://nurinadlina.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons beside the last text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           CrazyCat (Nurin)
// @namespace      http://nurinadlina.blogspot.com/
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
                      
        buttons += emoticonButton("01", "http://i569.photobucket.com/albums/ss139/newryn/nurin/angry.png");
buttons += emoticonButton("02", "http://i569.photobucket.com/albums/ss139/newryn/nurin/beadyeyed.png");
buttons += emoticonButton("03", "http://i569.photobucket.com/albums/ss139/newryn/nurin/confused.png");
buttons += emoticonButton("04", "http://i569.photobucket.com/albums/ss139/newryn/nurin/content.png");
buttons += emoticonButton("05", "http://i569.photobucket.com/albums/ss139/newryn/nurin/crafty.png");
buttons += emoticonButton("06", "http://i569.photobucket.com/albums/ss139/newryn/nurin/cry.png");
buttons += emoticonButton("07", "http://i569.photobucket.com/albums/ss139/newryn/nurin/happy.png");
buttons += emoticonButton("08", "http://i569.photobucket.com/albums/ss139/newryn/nurin/king.png");
buttons += emoticonButton("09", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kissy.png");
buttons += emoticonButton("10", "http://i569.photobucket.com/albums/ss139/newryn/nurin/laughing.png");
buttons += emoticonButton("11", "http://i569.photobucket.com/albums/ss139/newryn/nurin/love.png");
buttons += emoticonButton("12", "http://i569.photobucket.com/albums/ss139/newryn/nurin/oh.png");
buttons += emoticonButton("13", "http://i569.photobucket.com/albums/ss139/newryn/nurin/phew.png");
buttons += emoticonButton("14", "http://i569.photobucket.com/albums/ss139/newryn/nurin/proud.png");
buttons += emoticonButton("15", "http://i569.photobucket.com/albums/ss139/newryn/nurin/sad.png");
buttons += emoticonButton("16", "http://i569.photobucket.com/albums/ss139/newryn/nurin/serious.png");
buttons += emoticonButton("17", "http://i569.photobucket.com/albums/ss139/newryn/nurin/singing.png");
buttons += emoticonButton("18", "http://i569.photobucket.com/albums/ss139/newryn/nurin/smile.png");
buttons += emoticonButton("19", "http://i569.photobucket.com/albums/ss139/newryn/nurin/stunned.png");
buttons += emoticonButton("20", "http://i569.photobucket.com/albums/ss139/newryn/nurin/tounge.png");
buttons += emoticonButton("21", "http://i569.photobucket.com/albums/ss139/newryn/nurin/weird.png");
buttons += emoticonButton("22", "http://i569.photobucket.com/albums/ss139/newryn/nurin/wink.png");

        
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