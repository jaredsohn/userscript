// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by tinkerbell (http://tinkerbell-cafe.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Crazy Girl Icon Set
// @namespace      http://tinkerbell-cafe.blogspot.com/
// @description    You can use emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("1", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-001.gif");
	buttons += emoticonButton("2", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-002.gif");
	buttons += emoticonButton("3", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-005.gif");
	buttons += emoticonButton("4", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-006.gif");
	buttons += emoticonButton("5", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-008.gif");
	buttons += emoticonButton("6", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-009.gif");
	buttons += emoticonButton("7", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-011.gif");
	buttons += emoticonButton("8", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-013.gif");
	buttons += emoticonButton("9", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-015.gif");
	buttons += emoticonButton("10", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-018.gif");
	buttons += emoticonButton("11", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-020.gif");
	buttons += emoticonButton("12", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-023.gif");
	buttons += emoticonButton("13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-025.gif");
	buttons += emoticonButton("14", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-030.gif");
	buttons += emoticonButton("15", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-032.gif");
	buttons += emoticonButton("16", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-034.gif");
	buttons += emoticonButton("17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-035.gif");
	buttons += emoticonButton("18", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-036.gif");
	buttons += emoticonButton("19", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-041.gif");
	buttons += emoticonButton("20", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-043.gif");
	buttons += emoticonButton("21", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-046.gif");
	buttons += emoticonButton("22", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-049.gif");
	buttons += emoticonButton("23", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-050.gif");
	buttons += emoticonButton("24", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-051.gif");
	buttons += emoticonButton("25", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-052.gif");
	buttons += emoticonButton("26", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-054.gif");
	buttons += emoticonButton("27", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-057.gif");
	buttons += emoticonButton("28", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-059.gif");
	buttons += emoticonButton("29", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-061.gif");
	buttons += emoticonButton("30", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-064.gif");
	buttons += emoticonButton("31", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-066.gif");
	buttons += emoticonButton("32", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-070.gif");
	buttons += emoticonButton("33", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-001.gif");
	buttons += emoticonButton("34", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-002.gif");
	buttons += emoticonButton("35", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-003.gif");
	buttons += emoticonButton("36", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-004.gif");
	buttons += emoticonButton("37", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-005.gif");
	buttons += emoticonButton("38", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-006.gif");
	buttons += emoticonButton("39", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-007.gif");
	buttons += emoticonButton("40", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-009.gif");
	buttons += emoticonButton("41", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-010.gif");
	buttons += emoticonButton("42", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-012.gif");
	
				
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