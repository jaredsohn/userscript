//-----------------------------------------------------------------------//
// yuupan Smileys
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : Unknown Sorry..

// ==UserScript==
// @name           yuupan Smileys (trisyaaleesasweetden.blogspot.com)
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
	buttons += emoticonButton(":Yuupan-1:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-1.gif");
	buttons += emoticonButton(":Yuupan-2:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-2.gif");
	buttons += emoticonButton(":Yuupan-3:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-3.gif");
	buttons += emoticonButton(":Yuupan-4:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-4.gif");
	buttons += emoticonButton(":Yuupan-5:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-5.gif");
	buttons += emoticonButton(":Yuupan-6:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-6.gif");
	buttons += emoticonButton(":Yuupan-7:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-7.gif");
	buttons += emoticonButton(":Yuupan-8:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-8.gif");
	buttons += emoticonButton(":Yuupan-9:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-9.gif");
	buttons += emoticonButton(":Yuupan-10:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-10.gif");
	buttons += emoticonButton(":Yuupan-11:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-11.gif");
	buttons += emoticonButton(":Yuupan-12:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-12.gif");
	buttons += emoticonButton(":Yuupan-13:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-13.gif");
	buttons += emoticonButton(":Yuupan-14:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-14.gif");
	buttons += emoticonButton(":Yuupan-15:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-15.gif");
	buttons += emoticonButton(":Yuupan-16:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-16.gif");
	buttons += emoticonButton(":Yuupan-17:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-17.gif");
	buttons += emoticonButton(":Yuupan-18:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-18.gif");
	buttons += emoticonButton(":Yuupan-19:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-19.gif");
	buttons += emoticonButton(":Yuupan-20:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-20.gif");
	buttons += emoticonButton(":Yuupan-21:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-21.gif");
	buttons += emoticonButton(":Yuupan-22:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-22.gif");
	buttons += emoticonButton(":Yuupan-23:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-23.gif");
	buttons += emoticonButton(":Yuupan-24:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-24.gif");
	buttons += emoticonButton(":Yuupan-25:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-25.gif");
	buttons += emoticonButton(":Yuupan-26:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-26.gif");
	buttons += emoticonButton(":Yuupan-27:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-27.gif");
	buttons += emoticonButton(":Yuupan-28:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-28.gif");
	buttons += emoticonButton(":Yuupan-29:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-29.gif");
	buttons += emoticonButton(":Yuupan-30:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-30.gif");
	buttons += emoticonButton(":Yuupan-31:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-31.gif");
	buttons += emoticonButton(":Yuupan-32:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-32.gif");
	buttons += emoticonButton(":Yuupan-33:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-33.gif");
	buttons += emoticonButton(":Yuupan-34:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-34.gif");
	buttons += emoticonButton(":Yuupan-35:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-35.gif");
	buttons += emoticonButton(":Yuupan-36:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-36.gif");
	buttons += emoticonButton(":Yuupan-37:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-37.gif");
	buttons += emoticonButton(":Yuupan-38:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-38.gif");
	buttons += emoticonButton(":Yuupan-39:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-39.gif");
	buttons += emoticonButton(":Yuupan-40:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-40.gif");
	buttons += emoticonButton(":Yuupan-41:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-41.gif");
	buttons += emoticonButton(":Yuupan-42:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-42.gif");
	buttons += emoticonButton(":Yuupan-43:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/Yuupan-43.gif");
	
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

    
