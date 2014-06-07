

// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           emoticons and hearts
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
                      
	buttons += emoticonButton("01", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/01.gif");
buttons += emoticonButton("02", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/02.gif");
buttons += emoticonButton("03", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/03.gif");
buttons += emoticonButton("04", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/04.gif");
buttons += emoticonButton("05", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/05.gif");
buttons += emoticonButton("06", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/06.gif");
buttons += emoticonButton("07", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/07.gif");
buttons += emoticonButton("08", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/08.gif");
buttons += emoticonButton("09", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/09.gif");
buttons += emoticonButton("10", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/10.gif");
buttons += emoticonButton("11", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/11.gif");
buttons += emoticonButton("12", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/12.gif");
buttons += emoticonButton("13", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/13.gif");
buttons += emoticonButton("14", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/14.gif");
buttons += emoticonButton("15", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/15.gif");
buttons += emoticonButton("16", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/16.gif");
buttons += emoticonButton("17", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/17.gif");
buttons += emoticonButton("18", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/18.gif");
buttons += emoticonButton("19", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/19.gif");
buttons += emoticonButton("20", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/20.gif");
buttons += emoticonButton("21", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/21.gif");
buttons += emoticonButton("22", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/22.gif");
buttons += emoticonButton("23", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/23.gif");
buttons += emoticonButton("24", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/24.gif");
buttons += emoticonButton("25", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/25.gif");
buttons += emoticonButton("26", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/26.gif");
buttons += emoticonButton("27", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/27.gif");
buttons += emoticonButton("28", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/28.gif");
buttons += emoticonButton("29", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/29.gif");
buttons += emoticonButton("30", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/30.gif");
buttons += emoticonButton("31", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/31.gif");
buttons += emoticonButton("32", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/32.gif");
buttons += emoticonButton("33", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/33.gif");
buttons += emoticonButton("34", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/34.gif");
buttons += emoticonButton("35", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/35.gif");
buttons += emoticonButton("36", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/36.gif");
buttons += emoticonButton("37", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/37.gif");
buttons += emoticonButton("38", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/38.gif");
buttons += emoticonButton("39", "http://i226.photobucket.com/albums/dd294/addina94/emoticons%20and%20hearts/39.gif");
        
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

