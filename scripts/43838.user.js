//-----------------------------------------------------------------------//
// days Emo
// Aleesa Version
// Visit my blog at http://trisyaaleesasweeden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : unknown (I'm Forgot... Sorry)
// ==UserScript==
// @name         days Emo (MySweetDen.com)
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
	buttons += emoticonButton(":monday:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/ctg_monday.gif");
	buttons += emoticonButton(":tuesday:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/ctg_tuesday.gif");
	buttons += emoticonButton(":wednesday:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/ctg_wednesday.gif");
	buttons += emoticonButton(":thursday:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/ctg_thursday.gif");
	buttons += emoticonButton(":friday:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/ctg_friday.gif");
	buttons += emoticonButton(":saturday:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/ctg_saturday.gif");
	buttons += emoticonButton(":sunday:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/ctg_sunday.gif");
	
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

    
