//-----------------------------------------------------------------------//
// Cute bear Emo
// Aleesa Version
// Visit my blog at http://trisyaaleesasweeden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : unknown (i'm forgot...sorry)

// ==UserScript==
// @name           Cute bear Emo (MySweetDen.com)
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
	buttons += emoticonButton(":angry:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/ANGRY.gif");
	buttons += emoticonButton(":fashion:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/FASHION.gif");
	buttons += emoticonButton(":glup:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/GULP.gif");
	buttons += emoticonButton(":happychocki:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/HAPPY.gif");
	buttons += emoticonButton(":happygirl:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/HAPPYGIRL.gif");
	buttons += emoticonButton(":SAD:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/SAD.gif");
	buttons += emoticonButton(":shocked:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/SHOCKED.gif");
	buttons += emoticonButton(":ZZZ:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/SLEEP.gif");
	
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

    
