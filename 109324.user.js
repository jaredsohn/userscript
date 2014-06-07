// Based on the original emoticonsforblogger by Kuribo
// Modified by (http://sc4you.blogspot.com) 

// FEATURES
// Works only in Compose Modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Crazy Rabbit Icon for Blogger
// @namespace      http://sc4you.blogspot.com
// @description    You can use Crazy Rabbit emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz01.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz02.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz03.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz04.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz05.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz06.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz07.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz08.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz09.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz10.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz11.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz12.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz13.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz14.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz15.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz16.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz17.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz18.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz19.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz21.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz22.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz23.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz24.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz25.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz26.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz27.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz28.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz29.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz30.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz31.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz32.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz33.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz34.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz35.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz36.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz37.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz38.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz39.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz40.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz41.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz42.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz43.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz44.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz45.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz46.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz47.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz48.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz49.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz50.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz51.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz52.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/crazy%20rabbit/cz53.gif");
   
	buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"\\\" height=\\\"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img width=\"25\" height=\"25\" src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);
