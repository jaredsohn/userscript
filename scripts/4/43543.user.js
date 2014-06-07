//-----------------------------------------------------------------------//
// cute Bunny Emo Smileys
// trisya_aleesa Version
//-----------------------------------------------------------------------//


// ==UserScript==
// @name           Cute Bunny Emo (MySweetDen.com)
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
	buttons += emoticonButton(":bunny_1:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/71.gif");
	buttons += emoticonButton(":bunny_2:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/72.gif");
	buttons += emoticonButton(":bunny_3:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/73.gif");
	buttons += emoticonButton(":bunny_4:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/74.gif");
	buttons += emoticonButton(":bunny_5:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/75.gif");
	buttons += emoticonButton(":bunny_6:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/76.gif");
	buttons += emoticonButton(":bunny_7:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/77.gif");
	buttons += emoticonButton(":bunny_8:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/61.gif");
	buttons += emoticonButton(":bunny_9:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/62.gif");
	buttons += emoticonButton(":bunny10:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/63.gif");
	buttons += emoticonButton(":bunny11:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/64.gif");
	buttons += emoticonButton(":bunny12:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/65.gif");
	buttons += emoticonButton(":bunny13:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/66.gif");
	buttons += emoticonButton(":bunny14:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/67.gif");
	buttons += emoticonButton(":bunny15:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/68.gif");
	buttons += emoticonButton(":bunny16:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/69.gif");
	buttons += emoticonButton(":bunny17:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/70.gif");
	buttons += emoticonButton(":bunny18:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/51.gif");
	buttons += emoticonButton(":bunny19:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/52.gif");
	buttons += emoticonButton(":bunny20:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/53.gif");
	buttons += emoticonButton(":bunny21:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/55.gif");
	buttons += emoticonButton(":bunny22:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/56.gif");
	buttons += emoticonButton(":bunny23:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/57.gif");
	buttons += emoticonButton(":bunny24:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/58.gif");
	buttons += emoticonButton(":bunny25:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/59.gif");
	buttons += emoticonButton(":bunny26:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/60.gif");
	buttons += emoticonButton(":bunny27:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/41.gif");
	buttons += emoticonButton(":bunny28:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/42.gif");
	buttons += emoticonButton(":bunny29:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/43.gif");
	buttons += emoticonButton(":bunny30:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/44.gif");
	buttons += emoticonButton(":bunny31:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/45.gif");
	buttons += emoticonButton(":bunny32:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/46.gif");
	buttons += emoticonButton(":bunny33:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/47.gif");
	buttons += emoticonButton(":bunny34:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/48.gif");
	buttons += emoticonButton(":bunny35:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/49.gif");
	buttons += emoticonButton(":bunny36:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/50.gif");
	buttons += emoticonButton(":bunny37:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/31.gif");
	buttons += emoticonButton(":bunny38:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/32.gif");
	buttons += emoticonButton(":bunny39:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/34.gif");
	buttons += emoticonButton(":bunny40:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/35.gif");
	buttons += emoticonButton(":bunny41:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/37.gif");
	buttons += emoticonButton(":bunny42:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/38.gif");
	buttons += emoticonButton(":bunny43:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/26.gif");
	buttons += emoticonButton(":bunny44:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/18.gif");
	buttons += emoticonButton(":bunny45:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/19.gif");
	buttons += emoticonButton(":bunny46:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/21.gif");
	buttons += emoticonButton(":bunny47:", "http://i261.photobucket.com/albums/ii55/Trisya_aleesa/16.gif");
	
	
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

    
