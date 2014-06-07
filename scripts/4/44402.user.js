//-----------------------------------------------------------------------//
// Word Bubbles Smileys
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : unknown (I'm SOrry)

// ==UserScript==
// @name           Word Bubbles Smileys 
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
	buttons += emoticonButton(":no.01:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/wah.gif");
	buttons += emoticonButton(":no.02:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/thx.gif");
	buttons += emoticonButton(":no.03:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/swt.gif");
	buttons += emoticonButton(":no.04:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/sry.gif");
	buttons += emoticonButton(":no.05:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/sob.gif");
	buttons += emoticonButton(":no.06:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/question-1.gif");
	buttons += emoticonButton(":no.07:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/peace.gif");
	buttons += emoticonButton(":no.08:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/omg.gif");
	buttons += emoticonButton(":no.09:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/ok.gif");
	buttons += emoticonButton(":no.10:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/no1.gif");
	buttons += emoticonButton(":no.11:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/money.gif");
	buttons += emoticonButton(":no.12:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/lv2.gif");
	buttons += emoticonButton(":no.13:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kis2.gif");
	buttons += emoticonButton(":no.14:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/an.gif");
	buttons += emoticonButton(":no.15:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/hmm.gif");
	buttons += emoticonButton(":no.16:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/heh.gif");
	buttons += emoticonButton(":no.17:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/hand.gif");
	buttons += emoticonButton(":no.18:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/gg.gif");
	buttons += emoticonButton(":no.19:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/fist.gif");
	buttons += emoticonButton(":no.20:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/exclaim.gif");
	buttons += emoticonButton(":no.21:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/e5.gif");
	buttons += emoticonButton(":no.22:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/drool.gif");
	buttons += emoticonButton(":no.23:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/dot.gif");
	buttons += emoticonButton(":no.24:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/lvie2.gif");
	buttons += emoticonButton(":no.25:", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/kissieh2.gif");
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

    
