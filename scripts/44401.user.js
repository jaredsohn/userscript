//-----------------------------------------------------------------------//
// emo Smileys
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : unknown (I'm SOrry)

// ==UserScript==
// @name           emo Smileys 
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
	buttons += emoticonButton(":no.01:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/emo1.gif");
	buttons += emoticonButton(":no.02:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/emo2.gif");
	buttons += emoticonButton(":no.03:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/emo3.gif");
	buttons += emoticonButton(":no.04:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/emo4.gif");
	buttons += emoticonButton(":no.05:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/emo5.gif");
	buttons += emoticonButton(":no.06:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/emo6.gif");
	buttons += emoticonButton(":no.07:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/emo7.gif");
	buttons += emoticonButton(":no.08:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/emo8.gif");
	buttons += emoticonButton(":no.09:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/emo9.gif");
	buttons += emoticonButton(":no.10:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/emo10.gif");
	buttons += emoticonButton(":no.11:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/emo11.gif");
	buttons += emoticonButton(":no.12:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/emo12.gif");
	buttons += emoticonButton(":no.13:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/emo13.gif");
	buttons += emoticonButton(":no.14:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/Animation14.gif");
	buttons += emoticonButton(":no.15:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/emo15.gif");
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

    
