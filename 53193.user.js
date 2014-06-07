// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger2
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// @include        http://www.livejournal.com/update.bml
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("one", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi01.gif");
	buttons += emoticonButton("two", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi02.gif");
	buttons += emoticonButton("three", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi03.gif");
	buttons += emoticonButton("four", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi04.gif");
	buttons += emoticonButton("five", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi05.gif");
	buttons += emoticonButton("six", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi06.gif");
	buttons += emoticonButton("seven", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi07.gif");
	buttons += emoticonButton("eight", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi08.gif");
	buttons += emoticonButton("nine", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi09.gif");
	buttons += emoticonButton("ten", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi10.gif");
	buttons += emoticonButton("eleven", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi11.gif");
	buttons += emoticonButton("twelve", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi12.gif");
	buttons += emoticonButton("thirteen", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi13.gif");
	buttons += emoticonButton("fourteen", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi14.gif");
	buttons += emoticonButton("fifteen", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi15.gif");
	buttons += emoticonButton("sixteen", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-whiteusagi16.gif");

			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"auto\\\" height=\\\"auto\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img width=\"25\" height=\"25\" src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);