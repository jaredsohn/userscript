//-----------------------------------------------------------------------//
// Emily Pink ribbon Smileys
// Emoticons in Blogger Only by Eun Dear Diary.com (16)
// Visit my blog at http://frankymuffins.blogspot.com/
//-----------------------------------------------------------------------//

//Credits to original author : Eun Dear Diary (http://frankymuffins.blogspot.com/)

// ==UserScript==
// @name          Emily pink ribbon Smileys
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
	buttons += emoticonButton(":girl_1:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-001.gif");
	buttons += emoticonButton(":girl_2:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-002.gif");
	buttons += emoticonButton(":girl_3:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-003.gif");
	buttons += emoticonButton(":girl_4:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-004.gif");
	buttons += emoticonButton(":girl_5:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-005.gif");
	buttons += emoticonButton(":girl_6:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-006.gif");
	buttons += emoticonButton(":girl_7:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-007.gif");
	buttons += emoticonButton(":girl_8:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-008.gif");
	buttons += emoticonButton(":girl_9:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-009.gif");
	buttons += emoticonButton(":girl_10:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-010.gif");
	buttons += emoticonButton(":girl_11:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-011.gif");
	buttons += emoticonButton(":girl_12:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-012.gif");
	buttons += emoticonButton(":girl_13:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-013.gif");
	buttons += emoticonButton(":girl_14:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-014.gif");
	buttons += emoticonButton(":girl_15:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-015.gif");
	buttons += emoticonButton(":girl_16:", "http://i237.photobucket.com/albums/ff28/CTRUFAI/Emily%20-%20girl%20emoticon/girl-016.gif");
        buttons += emoticonButton(":Oishie:(", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/anigif-2.gif");
	
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

