//-----------------------------------------------------------------------//
// Buddy Emoticon
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : unknown (I'm Forgot.. Sorry)
// ==UserScript==
// @name           buddy Emoticon 
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
	buttons += emoticonButton(":buddy00:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons.gif");
	buttons += emoticonButton(":buddy01:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-1.gif");
	buttons += emoticonButton(":buddy02:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-2.gif");
	buttons += emoticonButton(":buddy03:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-3.gif");
	buttons += emoticonButton(":buddy04:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-4.gif");
	buttons += emoticonButton(":buddy05:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-5.gif");
	buttons += emoticonButton(":buddy06:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-6.gif");
	buttons += emoticonButton(":buddy07:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-7.gif");
	buttons += emoticonButton(":buddy08:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-8.gif");
	buttons += emoticonButton(":buddy09:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-9.gif");
	buttons += emoticonButton(":buddy10:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-10.gif");
	buttons += emoticonButton(":buddy11:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-11.gif");
	buttons += emoticonButton(":buddy12:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-12.gif");
	buttons += emoticonButton(":buddy13:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-13.gif");
	buttons += emoticonButton(":buddy14:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-14.gif");
	buttons += emoticonButton(":buddy15:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-15.gif");
	buttons += emoticonButton(":buddy16:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-16.gif");
	buttons += emoticonButton(":buddy17:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-17.gif");
	buttons += emoticonButton(":buddy18:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-18.gif");
	buttons += emoticonButton(":buddy19:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/white-msn-buddy-emoticons-19.gif");


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

    
