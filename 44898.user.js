//-----------------------------------------------------------------------//
// mimio Emoticon
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : unknown (I'm Forgot.. Sorry)
// ==UserScript==
// @name           mimio Emoticon 
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
	buttons += emoticonButton(":mimio01:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-1.gif");
	buttons += emoticonButton(":mimio02:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-2.gif");
	buttons += emoticonButton(":mimio03:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-3.gif");
	buttons += emoticonButton(":mimio04:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-4.gif");
	buttons += emoticonButton(":mimio05:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-5.gif");
	buttons += emoticonButton(":mimio06:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-6.gif");
	buttons += emoticonButton(":mimio07:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-7.gif");
	buttons += emoticonButton(":mimio08:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-8.gif");
	buttons += emoticonButton(":mimio09:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-9.gif");
	buttons += emoticonButton(":mimio10:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-10.gif");
	buttons += emoticonButton(":mimio11:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-11.gif");
	buttons += emoticonButton(":mimio12:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-12.gif");
	buttons += emoticonButton(":mimio13:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-13.gif");
	buttons += emoticonButton(":mimio14:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-14.gif");
	buttons += emoticonButton(":mimio15:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-15.gif");
	buttons += emoticonButton(":mimio16:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-16.gif");
	buttons += emoticonButton(":mimio17:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-17.gif");
	buttons += emoticonButton(":mimio18:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-18.gif");
	buttons += emoticonButton(":mimio19:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-19.gif");
	buttons += emoticonButton(":mimio20:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-20.gif");
	buttons += emoticonButton(":mimio21:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-21.gif");
	buttons += emoticonButton(":mimio22:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-22.gif");
	buttons += emoticonButton(":mimio23:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-23.gif");
	buttons += emoticonButton(":mimio24:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-24.gif");
	buttons += emoticonButton(":mimio25:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-25.gif");
	buttons += emoticonButton(":mimio26:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-26.gif");
	buttons += emoticonButton(":mimio27:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-27.gif");
	buttons += emoticonButton(":mimio28:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-28.gif");
	buttons += emoticonButton(":mimio29:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-29.gif");
	buttons += emoticonButton(":mimio30:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-30.gif");
	buttons += emoticonButton(":mimio31:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-31.gif");
	buttons += emoticonButton(":mimio32:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-32.gif");
	buttons += emoticonButton(":mimio33:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-33.gif");
	buttons += emoticonButton(":mimio34:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-34.gif");
	buttons += emoticonButton(":mimio35:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-35.gif");
	buttons += emoticonButton(":mimio36:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-36.gif");
	buttons += emoticonButton(":mimio37:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-37.gif");
	buttons += emoticonButton(":mimio38:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-38.gif");
	buttons += emoticonButton(":mimio39:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-39.gif");
	buttons += emoticonButton(":mimio40:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-40.gif");
	buttons += emoticonButton(":mimio41:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-41.gif");
	buttons += emoticonButton(":mimio42:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-42.gif");
	buttons += emoticonButton(":mimio43:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-43.gif");
	buttons += emoticonButton(":mimio44:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-44.gif");
	buttons += emoticonButton(":mimio45:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-45.gif");
	buttons += emoticonButton(":mimio46:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-46.gif");
	buttons += emoticonButton(":mimio47:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-47.gif");
	buttons += emoticonButton(":mimio48:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-48.gif");
	buttons += emoticonButton(":mimio49:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-49.gif");
	buttons += emoticonButton(":mimio50:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thmimio-50.gif");

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

    
