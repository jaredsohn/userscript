//-----------------------------------------------------------------------//
// girl Smileys
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : unknown (I'm Forgot.. Sorry)
// ==UserScript==
// @name           girl Smileys 
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
	buttons += emoticonButton(":vv1.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv1.gif");
	buttons += emoticonButton(":vv2.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv2.gif");
	buttons += emoticonButton(":vv3.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv3.gif");
	buttons += emoticonButton(":vv4.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv4.gif");
	buttons += emoticonButton(":vv5.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv5.gif");
	buttons += emoticonButton(":vv6.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv6.gif");
	buttons += emoticonButton(":vv7.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv7.gif");
	buttons += emoticonButton(":vv8.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv8.gif");
	buttons += emoticonButton(":vv9.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv9.gif");
	buttons += emoticonButton(":vv10.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv10.gif");
	buttons += emoticonButton(":vv11.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv11.gif");
	buttons += emoticonButton(":vv12.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv12.gif");
	buttons += emoticonButton(":vv13.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv13.gif");
	buttons += emoticonButton(":vv14.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv14.gif");
	buttons += emoticonButton(":vv15.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv15.gif");
	buttons += emoticonButton(":vv16.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv16.gif");
	buttons += emoticonButton(":vv17.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv17.gif");
	buttons += emoticonButton(":vv18.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv18.gif");
	buttons += emoticonButton(":vv19.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv19.gif");
	buttons += emoticonButton(":vv20.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv20.gif");
	buttons += emoticonButton(":vv21.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv21.gif");
	buttons += emoticonButton(":vv22.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv22.gif");
	buttons += emoticonButton(":vv23.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv23.gif");
	buttons += emoticonButton(":vv24.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv24.gif");
	buttons += emoticonButton(":vv25.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv25.gif");
	buttons += emoticonButton(":vv26.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv26.gif");
	buttons += emoticonButton(":vv27.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv27.gif");
	buttons += emoticonButton(":vv28.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv28.gif");
	buttons += emoticonButton(":vv29.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv29.gif");
	buttons += emoticonButton(":vv30.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv30.gif");
	buttons += emoticonButton(":vv31.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv31.gif");
	buttons += emoticonButton(":vv32.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv32.gif");
	buttons += emoticonButton(":vv33.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv33.gif");
	buttons += emoticonButton(":vv34.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv34.gif");
	buttons += emoticonButton(":vv35.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv35.gif");
	buttons += emoticonButton(":vv36.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv36.gif");
	buttons += emoticonButton(":vv37.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv37.gif");
	buttons += emoticonButton(":vv38.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv38.gif");
	buttons += emoticonButton(":vv39.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv39.gif");
	buttons += emoticonButton(":vv40.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv40.gif");
	buttons += emoticonButton(":vv41.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv41.gif");
	buttons += emoticonButton(":vv42.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv42.gif");
	buttons += emoticonButton(":vv43.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv43.gif");
	buttons += emoticonButton(":vv44.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv44.gif");
	buttons += emoticonButton(":vv45.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv45.gif");
	buttons += emoticonButton(":vv46.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv46.gif");
	buttons += emoticonButton(":vv47.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv47.gif");
	buttons += emoticonButton(":vv48.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv48.gif");
	buttons += emoticonButton(":vv49.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv49.gif");
	buttons += emoticonButton(":vv50.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv50.gif");
	buttons += emoticonButton(":vv51.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv51.gif");
	buttons += emoticonButton(":vv52.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv52.gif");
	buttons += emoticonButton(":vv53.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv53.gif");
	buttons += emoticonButton(":vv54.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv54.gif");
	buttons += emoticonButton(":vv55.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv55.gif");
	buttons += emoticonButton(":vv56.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv56.gif");
	buttons += emoticonButton(":vv57.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv57.gif");
	buttons += emoticonButton(":vv58.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv58.gif");
	buttons += emoticonButton(":vv59.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv59.gif");
	buttons += emoticonButton(":vv60.gif:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/vv60.gif");

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

    
