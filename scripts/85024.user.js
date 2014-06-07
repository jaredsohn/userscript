

// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           cutie, girly
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
                      
	buttons += emoticonButton("01", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/01.gif");
buttons += emoticonButton("02", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/02.gif");
buttons += emoticonButton("03", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/03.gif");
buttons += emoticonButton("04", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/04.gif");
buttons += emoticonButton("05", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/05.gif");
buttons += emoticonButton("06", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/06.jpg");
buttons += emoticonButton("07", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/07.jpg");
buttons += emoticonButton("08", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/08.gif");
buttons += emoticonButton("09", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/09.gif");
buttons += emoticonButton("10", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/10.gif");
buttons += emoticonButton("11", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/11.gif");
buttons += emoticonButton("12", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/12.gif");
buttons += emoticonButton("13", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/13.gif");
buttons += emoticonButton("14", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/14.gif");
buttons += emoticonButton("15", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/15.gif");
buttons += emoticonButton("16", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/16.gif");
buttons += emoticonButton("17", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/17.gif");
buttons += emoticonButton("18", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/18.gif");
buttons += emoticonButton("19", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/19.gif");
buttons += emoticonButton("20", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/20.gif");
buttons += emoticonButton("21", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/21.gif");
buttons += emoticonButton("22", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/22.gif");
buttons += emoticonButton("23", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/23.gif");
buttons += emoticonButton("24", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/24.gif");
buttons += emoticonButton("25", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/25.gif");
buttons += emoticonButton("26", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/26.gif");
buttons += emoticonButton("27", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/27.gif");
buttons += emoticonButton("28", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/28.gif");
buttons += emoticonButton("29", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/29.gif");
buttons += emoticonButton("30", "http://i226.photobucket.com/albums/dd294/addina94/cutiegirly/30.gif");
        
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

