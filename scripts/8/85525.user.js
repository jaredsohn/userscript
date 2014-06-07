

// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Notebook Emoticon
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
                      
	buttons += emoticonButton("thcat", "http://i226.photobucket.com/albums/dd294/addina94/Notebook%20Emoticon/thcat.gif");
buttons += emoticonButton("thcoffee", "http://i226.photobucket.com/albums/dd294/addina94/Notebook%20Emoticon/thcoffee.gif");
buttons += emoticonButton("thdrink", "http://i226.photobucket.com/albums/dd294/addina94/Notebook%20Emoticon/thdrink.gif");
buttons += emoticonButton("thfighting", "http://i226.photobucket.com/albums/dd294/addina94/Notebook%20Emoticon/thfighting.gif");
buttons += emoticonButton("thgood_bye", "http://i226.photobucket.com/albums/dd294/addina94/Notebook%20Emoticon/thgood_bye.gif");
buttons += emoticonButton("thhi.gif", "http://i226.photobucket.com/albums/dd294/addina94/Notebook%20Emoticon/thhi.gif");
buttons += emoticonButton("thi_love_you", "http://i226.photobucket.com/albums/dd294/addina94/Notebook%20Emoticon/thi_love_you.gif");
buttons += emoticonButton("thno.gif", "http://i226.photobucket.com/albums/dd294/addina94/Notebook%20Emoticon/thno.gif");
buttons += emoticonButton("thnote", "http://i226.photobucket.com/albums/dd294/addina94/Notebook%20Emoticon/thnote.gif");
buttons += emoticonButton("thtonge", "http://i226.photobucket.com/albums/dd294/addina94/Notebook%20Emoticon/thtonge.gif");

        
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

