// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by tinkerbell (http://tinkerbell-cafe.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Various Icon Set
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
	buttons += emoticonButton("1", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai1.gif");
	buttons += emoticonButton("2", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai3.gif");
	buttons += emoticonButton("3", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai4.gif");
	buttons += emoticonButton("4", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai6.gif");
	buttons += emoticonButton("5", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai7.gif");
	buttons += emoticonButton("6", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai11.gif");
	buttons += emoticonButton("7", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai12.gif");
	buttons += emoticonButton("8", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai15.gif");
	buttons += emoticonButton("9", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai17.gif");
	buttons += emoticonButton("10", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai19.gif");
	buttons += emoticonButton("11", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai20.gif");
	buttons += emoticonButton("12", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai23.gif");
	buttons += emoticonButton("13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai27.gif");
	buttons += emoticonButton("14", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai28.gif");
	buttons += emoticonButton("15", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai31.gif");
	buttons += emoticonButton("16", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai32.gif");
	buttons += emoticonButton("17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai33.gif");
	buttons += emoticonButton("18", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girlkawai/kawai35.gif");

				
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