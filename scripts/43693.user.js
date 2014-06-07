//-----------------------------------------------------------------------//
// Bongo Monkey Smileys
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : The Primitives movie (http://www.theprimitivesmovie.com/)

// ==UserScript==
// @name           Bongo Monkey Smileys 
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
	buttons += emoticonButton(":bongo_001:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_001.gif");
	buttons += emoticonButton(":bongo_002:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_002.gif");
	buttons += emoticonButton(":bongo_003:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_003.gif");
	buttons += emoticonButton(":bongo_005:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_005.gif");
	buttons += emoticonButton(":bongo_006:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_006.gif");
	buttons += emoticonButton(":bongo_010:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_010.gif");
	buttons += emoticonButton(":bongo_011:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_011.gif");
	buttons += emoticonButton(":bongo_012:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_012.gif");
	buttons += emoticonButton(":bongo_013:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_013.gif");
	buttons += emoticonButton(":bongo_016:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_016.gif");
	buttons += emoticonButton(":bongo_017:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_017.gif");
	buttons += emoticonButton(":bongo_022:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_022.gif");
	buttons += emoticonButton(":bongo_023:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_023.gif");
	buttons += emoticonButton(":bongo_024:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_024.gif");
	buttons += emoticonButton(":bongo_025:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_025.gif");
	buttons += emoticonButton(":bongo_026:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_026.gif");
	buttons += emoticonButton(":bongo_028:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_028.gif");
	buttons += emoticonButton(":bongo_029:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_029.gif");
	buttons += emoticonButton(":bongo_031:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_031.gif");
	buttons += emoticonButton(":bongo_032:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_32.gif");
	buttons += emoticonButton(":bongo_033:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_33.gif");
	buttons += emoticonButton(":bongo_034:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_34.gif");
	buttons += emoticonButton(":bongo_035:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_35.gif");
	buttons += emoticonButton(":bongo_036:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_36.gif");
	buttons += emoticonButton(":bongo_037:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_37.gif");
	buttons += emoticonButton(":bongo_038:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_38.gif");
	buttons += emoticonButton(":bongo_039:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_39.gif");
	buttons += emoticonButton(":bongo_040:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_40.gif");
	buttons += emoticonButton(":bongo_041:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_41.gif");
	buttons += emoticonButton(":bongo_042:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_42.gif");
	buttons += emoticonButton(":bongo_043:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_43.gif");
	buttons += emoticonButton(":bongo_044:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_44.gif");
	buttons += emoticonButton(":bongo_045:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/bongo_45.gif");

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

    
