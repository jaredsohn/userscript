//-----------------------------------------------------------------------//
// Beauty Smileys
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : unknown (I'm SOrry)

// ==UserScript==
// @name           Beauty Smileys 
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
	buttons += emoticonButton(":beauty1:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty1.gif");
	buttons += emoticonButton(":beauty2:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty2.gif");
	buttons += emoticonButton(":beauty3:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty3.gif");
	buttons += emoticonButton(":beauty4:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty4.gif");
	buttons += emoticonButton(":beauty5:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty5.gif");
	buttons += emoticonButton(":beauty6:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty6.gif");
	buttons += emoticonButton(":beauty7:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty7.gif");
	buttons += emoticonButton(":beauty8:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty8.gif");
	buttons += emoticonButton(":beauty9:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty9.gif");
	buttons += emoticonButton(":beauty10:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty10.gif");
	buttons += emoticonButton(":beauty11:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty11.gif");
	buttons += emoticonButton(":beauty12:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty12.gif");
	buttons += emoticonButton(":beauty13:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty13.gif");
	buttons += emoticonButton(":beauty14:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty14.gif");
	buttons += emoticonButton(":beauty15:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty15.gif");
	buttons += emoticonButton(":beauty16:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty16.gif");
	buttons += emoticonButton(":beauty17:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty17.gif");
	buttons += emoticonButton(":beauty18:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/beauty18.gif");

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

    
