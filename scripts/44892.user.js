//-----------------------------------------------------------------------//
// Kero-Kero Emoticon
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : unknown (I'm Forgot.. Sorry)
// ==UserScript==
// @name           Kero-Kero Emoticon 
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
	buttons += emoticonButton(":kero01:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero1.gif");
	buttons += emoticonButton(":kero02:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero2.gif");
	buttons += emoticonButton(":kero3:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero3.gif");
	buttons += emoticonButton(":kero4:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero4.gif");
	buttons += emoticonButton(":kero5:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero5.gif");
	buttons += emoticonButton(":kero6:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero6.gif");
	buttons += emoticonButton(":kero7:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero7.gif");
	buttons += emoticonButton(":kero8:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero8.gif");
	buttons += emoticonButton(":kero9:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero9.gif");
	buttons += emoticonButton(":kero10:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero10.gif");
	buttons += emoticonButton(":kero11:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero11.gif");
	buttons += emoticonButton(":kero12:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero12.gif");
	buttons += emoticonButton(":kero13:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero13.gif");
	buttons += emoticonButton(":kero14:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero14.gif");
	buttons += emoticonButton(":kero15:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero15.gif");
	buttons += emoticonButton(":kero16:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kero16.gif");

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

    
