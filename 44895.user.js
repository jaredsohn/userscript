//-----------------------------------------------------------------------//
// Grey-Kitty Emoticon
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : unknown (I'm Forgot.. Sorry)
// ==UserScript==
// @name           Grey-Kitty Emoticon 
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
	buttons += emoticonButton(":Kitty01:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-1.gif");
	buttons += emoticonButton(":Kitty02:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-2.gif");
	buttons += emoticonButton(":Kitty03:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-3.gif");
	buttons += emoticonButton(":Kitty04:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-4.gif");
	buttons += emoticonButton(":Kitty05:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-5.gif");
	buttons += emoticonButton(":Kitty06:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-6.gif");
	buttons += emoticonButton(":Kitty07:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-7.gif");
	buttons += emoticonButton(":Kitty08:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-8.gif");
	buttons += emoticonButton(":Kitty09:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-9.gif");
	buttons += emoticonButton(":Kitty10:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-10.gif");
	buttons += emoticonButton(":Kitty11:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-11.gif");
	buttons += emoticonButton(":Kitty12:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-12.gif");
	buttons += emoticonButton(":Kitty13:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-13.gif");
	buttons += emoticonButton(":Kitty14:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-14.gif");
	buttons += emoticonButton(":Kitty15:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-15.gif");
	buttons += emoticonButton(":Kitty16:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-16.gif");
	buttons += emoticonButton(":Kitty17:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kitten-grey-17.gif");

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

    
