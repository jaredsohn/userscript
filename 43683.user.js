//-----------------------------------------------------------------------//
// Grunge Monkey Smileys
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : The Primitives movie (http://www.theprimitivesmovie.com/)

// ==UserScript==
// @name           Grunge Monkey Smileys (trisyaaleesasweetden.blogspot.com)
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
	buttons += emoticonButton(":grunge_001:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_001.gif");
	buttons += emoticonButton(":grunge_002:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_002.gif");
	buttons += emoticonButton(":grunge_003:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_003.gif");
	buttons += emoticonButton(":grunge_005:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_005.gif");
	buttons += emoticonButton(":grunge_006:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_006.gif");
	buttons += emoticonButton(":grunge_007:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_007.gif");
	buttons += emoticonButton(":grunge_008:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_008.gif");
	buttons += emoticonButton(":grunge_009:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_009.gif");
	buttons += emoticonButton(":grunge_011:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_011.gif");
	buttons += emoticonButton(":grunge_012:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_012.gif");
	buttons += emoticonButton(":grunge_013:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_013.gif");
	buttons += emoticonButton(":grunge_015:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_015.gif");
	buttons += emoticonButton(":grunge_016:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_016.gif");
	buttons += emoticonButton(":grunge_017:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_017.gif");
	buttons += emoticonButton(":grunge_019:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_019.gif");
	buttons += emoticonButton(":grunge_020:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_020.gif");
	buttons += emoticonButton(":grunge_021:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_021.gif");
	buttons += emoticonButton(":grunge_022:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_022.gif");
	buttons += emoticonButton(":grunge_023:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_023.gif");
	buttons += emoticonButton(":grunge_024:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_024.gif");
	buttons += emoticonButton(":grunge_025:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_025.gif");
	buttons += emoticonButton(":grunge_026:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_026.gif");
	buttons += emoticonButton(":grunge_027:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_027.gif");
	buttons += emoticonButton(":grunge_028:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_028.gif");
	buttons += emoticonButton(":grunge_029:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_029.gif");
	buttons += emoticonButton(":grunge_030:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_030.gif");
	buttons += emoticonButton(":grunge_031:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_031.gif");
	buttons += emoticonButton(":grunge_032:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_032.gif");
	buttons += emoticonButton(":grunge_033:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_033.gif");
	buttons += emoticonButton(":grunge_034:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_034.gif");
	buttons += emoticonButton(":grunge_035:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/grunge_035.gif");

	
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

    
