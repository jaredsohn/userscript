// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Pailin
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
                      
	buttons += emoticonButton("themoticon-2", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/themoticon-2.jpg");
buttons += emoticonButton("themoticon-4", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/themoticon-4.jpg");
buttons += emoticonButton("themoticon-6", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/themoticon-6.jpg");
buttons += emoticonButton("themoticon-7", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/themoticon-7.jpg");
buttons += emoticonButton("themoticon-8", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/themoticon-8.jpg");
buttons += emoticonButton("themoticon-9", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/themoticon-9.jpg");
buttons += emoticonButton("themoticon-10", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/themoticon-10.jpg");
buttons += emoticonButton("themoticon-11", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/themoticon-11.jpg");
buttons += emoticonButton("themoticon-12", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/themoticon-12.jpg");
buttons += emoticonButton("themoticon-15", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/themoticon-15.jpg");
buttons += emoticonButton("themoticon-17", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/themoticon-17.jpg");
buttons += emoticonButton("thmisc-1", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-1.jpg");
buttons += emoticonButton("thmisc-2", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-2.jpg");
buttons += emoticonButton("thmisc-3", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-3.jpg");
buttons += emoticonButton("thmisc-4", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-4.jpg");
buttons += emoticonButton("thmisc-6", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-6.jpg");
buttons += emoticonButton("thmisc-7", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-7.jpg");
buttons += emoticonButton("thmisc-8", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-8.jpg");
buttons += emoticonButton("thmisc-9", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-9.jpg");
buttons += emoticonButton("thmisc-10", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-10.jpg");
buttons += emoticonButton("thmisc-11", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-11.jpg");
buttons += emoticonButton("thmisc-12", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-12.jpg");
buttons += emoticonButton("thmisc-13", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-13.jpg");
buttons += emoticonButton("thmisc-14", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-14.jpg");
buttons += emoticonButton("thmisc-15", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-15.jpg");
buttons += emoticonButton("thmisc-16", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-16.jpg");
buttons += emoticonButton("thmisc-17", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-17.jpg");
buttons += emoticonButton("thmisc-18", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-18.jpg");
buttons += emoticonButton("thmisc-19", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-19.jpg");
buttons += emoticonButton("thmisc-20", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-20.jpg");
buttons += emoticonButton("thmisc-21", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-21.jpg");
buttons += emoticonButton("thmisc-22", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-22.jpg");
buttons += emoticonButton("thmisc-23", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-23.jpg");
buttons += emoticonButton("thmisc-24", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-24.jpg");
buttons += emoticonButton("thmisc-25", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-25.jpg");
buttons += emoticonButton("thmisc-26", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-26.jpg");
buttons += emoticonButton("thmisc-27", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-27.jpg");
buttons += emoticonButton("thmisc-28", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-28.jpg");
buttons += emoticonButton("thmisc-30", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thmisc-30.jpg");
buttons += emoticonButton("thUntitled-1", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-1.png");
buttons += emoticonButton("thUntitled-1-1", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-1-1.png");
buttons += emoticonButton("thUntitled-2", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-2.png");
buttons += emoticonButton("thUntitled-2-1", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-2-1.png");
buttons += emoticonButton("thUntitled-3", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-3.png");
buttons += emoticonButton("thUntitled-3-1", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-3-1.png");
buttons += emoticonButton("thUntitled-4", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-4.png");
buttons += emoticonButton("thUntitled-4-1", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-4-1.png");
buttons += emoticonButton("thUntitled-5", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-5.png");
buttons += emoticonButton("thUntitled-5-1", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-5-1.png");
buttons += emoticonButton("thUntitled-6", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-6.png");
buttons += emoticonButton("thUntitled-6-1", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-6-1.png");
buttons += emoticonButton("thUntitled-7", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-7.png");
buttons += emoticonButton("thUntitled-7-1", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-7-1.png");
buttons += emoticonButton("thUntitled-8", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-8.png");
buttons += emoticonButton("thUntitled-8-1", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-8-1.png");
buttons += emoticonButton("thUntitled-9", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-9.png");
buttons += emoticonButton("thUntitled-9-1", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-9-1.png");
buttons += emoticonButton("thUntitled-10", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-10.png");
buttons += emoticonButton("thUntitled-10-1", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-10-1.png");
buttons += emoticonButton("thUntitled-11", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-11.png");
buttons += emoticonButton("thUntitled-11-1", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-11-1.png");
buttons += emoticonButton("thUntitled-12", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-12.png");
buttons += emoticonButton("thUntitled-12-1", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-12-1.png");
buttons += emoticonButton("thUntitled-13", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-13.png");
buttons += emoticonButton("thUntitled-13-1", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-13-1.png");
buttons += emoticonButton("thUntitled-14", "http://i226.photobucket.com/albums/dd294/addina94/Pailin/thUntitled-14.png");

        
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

