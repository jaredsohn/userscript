//-----------------------------------------------------------------------//
// Weather Emo
// Aleesa Version
// Visit my blog at http://trisyaaleesasweeden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : Unknown (i'm forgot.. Sorryyy)

// ==UserScript==
// @name           Weather Emo (MySweetDen.com)
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
	buttons += emoticonButton(":thunderstorm:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/thunderstoms.gif");
	buttons += emoticonButton(":sunny:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/sunny.gif");
	buttons += emoticonButton(":rain:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/rain.gif");
	buttons += emoticonButton(":pcloudy:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/partlycloudy.gif");
	buttons += emoticonButton(":cloudy:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/cloudy.gif");
	
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

    
