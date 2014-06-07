//-----------------------------------------------------------------------//
// Chibi Monkey Smileys
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : The Primitives movie (http://www.theprimitivesmovie.com/)

// ==UserScript==
// @name           Chibi Monkey Smileys 
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
	buttons += emoticonButton(":chibi_001:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/chibi_001.gif");
	buttons += emoticonButton(":chibi_002:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/chibi_002.gif");
	buttons += emoticonButton(":chibi_003:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/chibi_003.gif");
	buttons += emoticonButton(":chibi_004:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/chibi_004.gif");
	buttons += emoticonButton(":chibi_005:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/chibi_005.gif");
	buttons += emoticonButton(":chibi_006:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/chibi_006.gif");
	buttons += emoticonButton(":chibi_007:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/chibi_007.gif");
	buttons += emoticonButton(":chibi_008:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/chibi_008.gif");
	buttons += emoticonButton(":chibi_009:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/chibi_009.gif");
	buttons += emoticonButton(":chibi_010:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/chibi_010.gif");
	
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

    
