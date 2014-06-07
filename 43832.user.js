//-----------------------------------------------------------------------//
// Small Boy Smileys
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : unknown (I'm Forgot.. Sorry)
// ==UserScript==
// @name           Small Boy Smileys 
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
	buttons += emoticonButton(":small_boy_1.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_1.gif");
	buttons += emoticonButton(":small_boy_2.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_2.gif");
	buttons += emoticonButton(":small_boy_3.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_3.gif");
	buttons += emoticonButton(":small_boy_4.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_4.gif");
	buttons += emoticonButton(":small_boy_5.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_5.gif");
	buttons += emoticonButton(":small_boy_6.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_6.gif");
	buttons += emoticonButton(":small_boy_7.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_7.gif");
	buttons += emoticonButton(":small_boy_8.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_8.gif");
	buttons += emoticonButton(":small_boy_9.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_9.gif");
	buttons += emoticonButton(":small_boy_10.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_10.gif");
	buttons += emoticonButton(":small_boy_11.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_11.gif");
	buttons += emoticonButton(":small_boy_12.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_12.gif");
	buttons += emoticonButton(":small_boy_13.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_13.gif");
	buttons += emoticonButton(":small_boy_14.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_14.gif");
	buttons += emoticonButton(":small_boy_15.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_15.gif");
	buttons += emoticonButton(":small_boy_16.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_16.gif");
	buttons += emoticonButton(":small_boy_17.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_17.gif");
	buttons += emoticonButton(":small_boy_18.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/small_boy_18.gif");

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

    
