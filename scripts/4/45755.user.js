//-----------------------------------------------------------------------//
// tsunaa Smileys
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : Unknown Sorry..

// ==UserScript==
// @name           tsunaa Smileys (trisyaaleesasweetden.blogspot.com)
// ==/UserScript==

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

window.addEventListener("load", function(e) {

function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton(":tsunaa-1:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-15.gif");
	buttons += emoticonButton(":tsunaa-2:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-2.gif");
	buttons += emoticonButton(":tsunaa-3:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-3.gif");
	buttons += emoticonButton(":tsunaa-4:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-4.gif");
	buttons += emoticonButton(":tsunaa-5:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-5.gif");
	buttons += emoticonButton(":tsunaa-6:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-6.gif");
	buttons += emoticonButton(":tsunaa-7:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-7.gif");
	buttons += emoticonButton(":tsunaa-8:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-8.gif");
	buttons += emoticonButton(":tsunaa-9:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-9.gif");
	buttons += emoticonButton(":tsunaa-10:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-10.gif");
	buttons += emoticonButton(":tsunaa-11:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-11.gif");
	buttons += emoticonButton(":tsunaa-12:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-12.gif");
	buttons += emoticonButton(":tsunaa-13:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-13.gif");
	buttons += emoticonButton(":tsunaa-14:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-14.gif");
	buttons += emoticonButton(":tsunaa-15:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-15.gif");
	buttons += emoticonButton(":tsunaa-16:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-16.gif");
	buttons += emoticonButton(":tsunaa-17:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-17.gif");
	buttons += emoticonButton(":tsunaa-18:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-18.gif");
	buttons += emoticonButton(":tsunaa-19:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-19.gif");
	buttons += emoticonButton(":tsunaa-20:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-20.gif");
	buttons += emoticonButton(":tsunaa-21:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-21.gif");
	buttons += emoticonButton(":tsunaa-22:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-22.gif");
	buttons += emoticonButton(":tsunaa-23:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-23.gif");
	buttons += emoticonButton(":tsunaa-24:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-24.gif");
	buttons += emoticonButton(":tsunaa-25:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-25.gif");
	buttons += emoticonButton(":tsunaa-26:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-26.gif");
	buttons += emoticonButton(":tsunaa-27:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-27.gif");
	buttons += emoticonButton(":tsunaa-28:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-28.gif");
	buttons += emoticonButton(":tsunaa-29:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/tsunaa-29.gif");
	
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

    
