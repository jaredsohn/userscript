

// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           simple
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
                      
	buttons += emoticonButton("01", "http://i226.photobucket.com/albums/dd294/addina94/simple/01.gif");
buttons += emoticonButton("02", "http://i226.photobucket.com/albums/dd294/addina94/simple/02.gif");
buttons += emoticonButton("03", "http://i226.photobucket.com/albums/dd294/addina94/simple/03.gif");
buttons += emoticonButton("04", "http://i226.photobucket.com/albums/dd294/addina94/simple/04.gif");
buttons += emoticonButton("05", "http://i226.photobucket.com/albums/dd294/addina94/simple/05.gif");
buttons += emoticonButton("06", "http://i226.photobucket.com/albums/dd294/addina94/simple/06.gif");
buttons += emoticonButton("07", "http://i226.photobucket.com/albums/dd294/addina94/simple/07.gif");
buttons += emoticonButton("08", "http://i226.photobucket.com/albums/dd294/addina94/simple/08.gif");
buttons += emoticonButton("09", "http://i226.photobucket.com/albums/dd294/addina94/simple/09.gif");
buttons += emoticonButton("10", "http://i226.photobucket.com/albums/dd294/addina94/simple/10.gif");
buttons += emoticonButton("11", "http://i226.photobucket.com/albums/dd294/addina94/simple/11.gif");
buttons += emoticonButton("12", "http://i226.photobucket.com/albums/dd294/addina94/simple/12.gif");
buttons += emoticonButton("13", "http://i226.photobucket.com/albums/dd294/addina94/simple/13.gif");
buttons += emoticonButton("14", "http://i226.photobucket.com/albums/dd294/addina94/simple/14.gif");
buttons += emoticonButton("15", "http://i226.photobucket.com/albums/dd294/addina94/simple/15.gif");
buttons += emoticonButton("16", "http://i226.photobucket.com/albums/dd294/addina94/simple/16.gif");
buttons += emoticonButton("17", "http://i226.photobucket.com/albums/dd294/addina94/simple/17.gif");
buttons += emoticonButton("18", "http://i226.photobucket.com/albums/dd294/addina94/simple/18.gif");
buttons += emoticonButton("19", "http://i226.photobucket.com/albums/dd294/addina94/simple/19.gif");
buttons += emoticonButton("20", "http://i226.photobucket.com/albums/dd294/addina94/simple/20.gif");
buttons += emoticonButton("21", "http://i226.photobucket.com/albums/dd294/addina94/simple/21.gif");
buttons += emoticonButton("22", "http://i226.photobucket.com/albums/dd294/addina94/simple/22.gif");
buttons += emoticonButton("23", "http://i226.photobucket.com/albums/dd294/addina94/simple/23.gif");
buttons += emoticonButton("24", "http://i226.photobucket.com/albums/dd294/addina94/simple/24.gif");
buttons += emoticonButton("25", "http://i226.photobucket.com/albums/dd294/addina94/simple/25.gif");
buttons += emoticonButton("26", "http://i226.photobucket.com/albums/dd294/addina94/simple/26.gif");
buttons += emoticonButton("27", "http://i226.photobucket.com/albums/dd294/addina94/simple/27.gif");
buttons += emoticonButton("28", "http://i226.photobucket.com/albums/dd294/addina94/simple/28.gif");
buttons += emoticonButton("29", "http://i226.photobucket.com/albums/dd294/addina94/simple/29.gif");
buttons += emoticonButton("30", "http://i226.photobucket.com/albums/dd294/addina94/simple/30.gif");
buttons += emoticonButton("31", "http://i226.photobucket.com/albums/dd294/addina94/simple/31.gif");
buttons += emoticonButton("32", "http://i226.photobucket.com/albums/dd294/addina94/simple/32.gif");
buttons += emoticonButton("33", "http://i226.photobucket.com/albums/dd294/addina94/simple/33.gif");
buttons += emoticonButton("34", "http://i226.photobucket.com/albums/dd294/addina94/simple/34.gif");
buttons += emoticonButton("35", "http://i226.photobucket.com/albums/dd294/addina94/simple/35.gif");
buttons += emoticonButton("36", "http://i226.photobucket.com/albums/dd294/addina94/simple/36.gif");
buttons += emoticonButton("37", "http://i226.photobucket.com/albums/dd294/addina94/simple/37.gif");
buttons += emoticonButton("38", "http://i226.photobucket.com/albums/dd294/addina94/simple/38.gif");
buttons += emoticonButton("39", "http://i226.photobucket.com/albums/dd294/addina94/simple/39.gif");
buttons += emoticonButton("40", "http://i226.photobucket.com/albums/dd294/addina94/simple/40.gif");
buttons += emoticonButton("41", "http://i226.photobucket.com/albums/dd294/addina94/simple/41.gif");
buttons += emoticonButton("42", "http://i226.photobucket.com/albums/dd294/addina94/simple/42.gif");
buttons += emoticonButton("43", "http://i226.photobucket.com/albums/dd294/addina94/simple/43.gif");
buttons += emoticonButton("44", "http://i226.photobucket.com/albums/dd294/addina94/simple/44.gif");
buttons += emoticonButton("45", "http://i226.photobucket.com/albums/dd294/addina94/simple/45.gif");
buttons += emoticonButton("46", "http://i226.photobucket.com/albums/dd294/addina94/simple/46.gif");
buttons += emoticonButton("47", "http://i226.photobucket.com/albums/dd294/addina94/simple/47.gif");
buttons += emoticonButton("48", "http://i226.photobucket.com/albums/dd294/addina94/simple/48.gif");
buttons += emoticonButton("49", "http://i226.photobucket.com/albums/dd294/addina94/simple/49.gif");
buttons += emoticonButton("50", "http://i226.photobucket.com/albums/dd294/addina94/simple/50.gif");
buttons += emoticonButton("51", "http://i226.photobucket.com/albums/dd294/addina94/simple/51.gif");
buttons += emoticonButton("52", "http://i226.photobucket.com/albums/dd294/addina94/simple/52.gif");
buttons += emoticonButton("53", "http://i226.photobucket.com/albums/dd294/addina94/simple/53.gif");
buttons += emoticonButton("54", "http://i226.photobucket.com/albums/dd294/addina94/simple/54.gif");
buttons += emoticonButton("55", "http://i226.photobucket.com/albums/dd294/addina94/simple/55.gif");
buttons += emoticonButton("56", "http://i226.photobucket.com/albums/dd294/addina94/simple/56.gif");
buttons += emoticonButton("57", "http://i226.photobucket.com/albums/dd294/addina94/simple/57.gif");
buttons += emoticonButton("58", "http://i226.photobucket.com/albums/dd294/addina94/simple/58.gif");
buttons += emoticonButton("59", "http://i226.photobucket.com/albums/dd294/addina94/simple/59.gif");
buttons += emoticonButton("60", "http://i226.photobucket.com/albums/dd294/addina94/simple/60.gif");
buttons += emoticonButton("61", "http://i226.photobucket.com/albums/dd294/addina94/simple/61.gif");
buttons += emoticonButton("62", "http://i226.photobucket.com/albums/dd294/addina94/simple/62.gif");
buttons += emoticonButton("63", "http://i226.photobucket.com/albums/dd294/addina94/simple/63.gif");
buttons += emoticonButton("64", "http://i226.photobucket.com/albums/dd294/addina94/simple/64.gif");
buttons += emoticonButton("65", "http://i226.photobucket.com/albums/dd294/addina94/simple/65.gif");
buttons += emoticonButton("66", "http://i226.photobucket.com/albums/dd294/addina94/simple/66.gif");


        
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

