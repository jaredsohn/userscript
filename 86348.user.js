

// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           babies
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
                      
	buttons += emoticonButton("baby01", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby01.gif");
buttons += emoticonButton("baby02", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby02.gif");
buttons += emoticonButton("baby03", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby03.gif");
buttons += emoticonButton("baby04", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby04.gif");
buttons += emoticonButton("baby05", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby05.gif");
buttons += emoticonButton("baby06", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby06.gif");
buttons += emoticonButton("baby07", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby07.gif");
buttons += emoticonButton("baby08", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby08.gif");
buttons += emoticonButton("baby09", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby09.gif");
buttons += emoticonButton("baby10", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby10.gif");
buttons += emoticonButton("baby11", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby11.gif");
buttons += emoticonButton("baby12", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby12.gif");
buttons += emoticonButton("baby13", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby13.gif");
buttons += emoticonButton("baby14", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby14.gif");
buttons += emoticonButton("baby15", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby15.gif");
buttons += emoticonButton("baby16", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby16.gif");
buttons += emoticonButton("baby17", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby17.gif");
buttons += emoticonButton("baby18", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby18.gif");
buttons += emoticonButton("baby19", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby19.gif");
buttons += emoticonButton("baby20", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby20.gif");
buttons += emoticonButton("baby21", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby21.gif");
buttons += emoticonButton("baby22", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby22.gif");
buttons += emoticonButton("baby23", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby23.gif");
buttons += emoticonButton("baby24", "http://i226.photobucket.com/albums/dd294/addina94/babies/baby24.gif");

        
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

