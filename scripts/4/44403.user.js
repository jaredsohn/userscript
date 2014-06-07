//-----------------------------------------------------------------------//
// kawaii Smileys
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : unknown (I'm SOrry)

// ==UserScript==
// @name           kawaii Smileys 
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
	buttons += emoticonButton(":no.01:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/1.gif");
	buttons += emoticonButton(":no.02:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/2.gif");
	buttons += emoticonButton(":no.03:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/3.gif");
	buttons += emoticonButton(":no.04:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/4.gif");
	buttons += emoticonButton(":no.05:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/5.gif");
	buttons += emoticonButton(":no.06:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/6.gif");
	buttons += emoticonButton(":no.07:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/7.gif");
	buttons += emoticonButton(":no.08:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/8.gif");
	buttons += emoticonButton(":no.09:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/9.gif");
	buttons += emoticonButton(":no.10:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/10.gif");
	buttons += emoticonButton(":no.11:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/11.gif");
	buttons += emoticonButton(":no.12:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/12.gif");
	buttons += emoticonButton(":no.13:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/13.gif");
	buttons += emoticonButton(":no.14:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/14.gif");
	buttons += emoticonButton(":no.15:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/15.gif");
	buttons += emoticonButton(":no.17:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/16.gif");
	buttons += emoticonButton(":no.18:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/17.gif");
	buttons += emoticonButton(":no.19:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/18.gif");
	buttons += emoticonButton(":no.20:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/19.gif");
	buttons += emoticonButton(":no.21:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/21.gif");
	buttons += emoticonButton(":no.22:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/22.gif");
	buttons += emoticonButton(":no.23:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/23.gif");
	buttons += emoticonButton(":no.24:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/24.gif");
	buttons += emoticonButton(":no.25:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/ciao.gif");
	buttons += emoticonButton(":no.26:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/hello.gif");
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

    
