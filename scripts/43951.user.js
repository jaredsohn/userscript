//-----------------------------------------------------------------------//
// Fire_Guy Smileys
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : unknown (I'm SOrry)

// ==UserScript==
// @name           Fire_Guy Smileys 
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
	buttons += emoticonButton(":fire_guy1:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy1.gif");
	buttons += emoticonButton(":fire_guy2:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy2.gif");
	buttons += emoticonButton(":fire_guy3:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy3.gif");
	buttons += emoticonButton(":fire_guy4:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy4.gif");
	buttons += emoticonButton(":fire_guy5:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy5.gif");
	buttons += emoticonButton(":fire_guy6:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy6.gif");
	buttons += emoticonButton(":fire_guy7:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy7.gif");
	buttons += emoticonButton(":fire_guy8:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy8.gif");
	buttons += emoticonButton(":fire_guy9:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy9.gif");
	buttons += emoticonButton(":fire_guy10:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy10.gif");
	buttons += emoticonButton(":fire_guy11:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy11.gif");
	buttons += emoticonButton(":fire_guy12:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy12.gif");
	buttons += emoticonButton(":fire_guy13:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy13.gif");
	buttons += emoticonButton(":fire_guy14:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy14.gif");
	buttons += emoticonButton(":fire_guy15:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy15.gif");
	buttons += emoticonButton(":fire_guy16:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy16.gif");
	buttons += emoticonButton(":fire_guy17:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy17.gif");
	buttons += emoticonButton(":fire_guy18:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy18.gif");
	buttons += emoticonButton(":fire_guy19:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy19.gif");
	buttons += emoticonButton(":fire_guy20:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy20.gif");
	buttons += emoticonButton(":fire_guy21:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy21.gif");
	buttons += emoticonButton(":fire_guy22:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy22.gif");
	buttons += emoticonButton(":fire_guy23:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy23.gif");
	buttons += emoticonButton(":fire_guy24:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy24.gif");
	buttons += emoticonButton(":fire_guy25:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy25.gif");
	buttons += emoticonButton(":fire_guy26:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy26.gif");
	buttons += emoticonButton(":fire_guy27:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy27.gif");
	buttons += emoticonButton(":fire_guy28:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy28.gif");
	buttons += emoticonButton(":fire_guy29:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy29.gif");
	buttons += emoticonButton(":fire_guy30:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fire-guy30.gif");

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

    
