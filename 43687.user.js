//-----------------------------------------------------------------------//
// Gorgeous Monkey Smileys
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : The Primitives movie (http://www.theprimitivesmovie.com/)

// ==UserScript==
// @name           Gorgeous Monkey Smileys (trisyaaleesasweetden.blogspot.com)
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
	buttons += emoticonButton(":gorgeous_002:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/gorgeous_002.gif");
	buttons += emoticonButton(":gorgeous_003:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/gorgeous_003.gif");
	buttons += emoticonButton(":gorgeous_004:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/gorgeous_004.gif");
	buttons += emoticonButton(":gorgeous_005:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/gorgeous_005.gif");
	buttons += emoticonButton(":gorgeous_006:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/gorgeous_006.gif");
	buttons += emoticonButton(":gorgeous_007:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/gorgeous_007.gif");
	buttons += emoticonButton(":gorgeous_009:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/gorgeous_009.gif");
	buttons += emoticonButton(":gorgeous_010:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/gorgeous_010.gif");
	buttons += emoticonButton(":gorgeous_011:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/gorgeous_011.gif");
	buttons += emoticonButton(":gorgeous_012:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/gorgeous_012.gif");

	
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

    
