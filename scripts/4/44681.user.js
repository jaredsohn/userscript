//-----------------------------------------------------------------------//
// Lion Emoticon
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : unknown (I'm Forgot.. Sorry)
// ==UserScript==
// @name           Lion Emoticon 
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
	buttons += emoticonButton(":th01:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/th01.gif");
	buttons += emoticonButton(":th02:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/th02.gif");
	buttons += emoticonButton(":th03:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/th03.gif");
	buttons += emoticonButton(":th04:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/th04.gif");
	buttons += emoticonButton(":th05:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/th05.gif");
	buttons += emoticonButton(":th06:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/th06.gif");
	buttons += emoticonButton(":th07:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/th07.gif");
	buttons += emoticonButton(":th08:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/th08.gif");
	buttons += emoticonButton(":th09:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/th09.gif");
	buttons += emoticonButton(":th10:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/th10.gif");
	buttons += emoticonButton(":th11:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/th11.gif");
	buttons += emoticonButton(":th12:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/th12.gif");
	buttons += emoticonButton(":th13:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/th13.gif");
	buttons += emoticonButton(":th14:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/th14.gif");
	buttons += emoticonButton(":th15:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/th15.gif");

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

    
