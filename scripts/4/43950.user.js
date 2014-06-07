//-----------------------------------------------------------------------//
// Pirate Smileys
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : unknown (I'm SOrry)

// ==UserScript==
// @name           Pirate Smileys 
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
	buttons += emoticonButton(":h1:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h1.gif");
	buttons += emoticonButton(":h2:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h2.gif");
	buttons += emoticonButton(":h3:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h3.gif");
	buttons += emoticonButton(":h4:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h4.gif");
	buttons += emoticonButton(":h5:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h5.gif");
	buttons += emoticonButton(":h6:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h6.gif");
	buttons += emoticonButton(":h7:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h7.gif");
	buttons += emoticonButton(":h8:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h8.gif");
	buttons += emoticonButton(":h9:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h9.gif");
	buttons += emoticonButton(":h10:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h10.gif");
	buttons += emoticonButton(":h11:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h11.gif");
	buttons += emoticonButton(":h12:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h12.gif");
	buttons += emoticonButton(":h13:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h13.gif");
	buttons += emoticonButton(":h14:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h14.gif");
	buttons += emoticonButton(":h15:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h15.gif");
	buttons += emoticonButton(":h16:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h16.gif");
	buttons += emoticonButton(":h17:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h17.gif");
	buttons += emoticonButton(":h18:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h18.gif");
	buttons += emoticonButton(":h19:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h19.gif");
	buttons += emoticonButton(":h20:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h20.gif");
	buttons += emoticonButton(":h21:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h21.gif");
	buttons += emoticonButton(":h22:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/h22.gif");

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

    
