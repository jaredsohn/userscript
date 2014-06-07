// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Sary Day (http://sary-day.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           BungaKecil Script
// @namespace      http://kuribo.info
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
	buttons += emoticonButton("001", "http://sary.melati.googlepages.com/0001.gif");
	buttons += emoticonButton("002", "http://sary.melati.googlepages.com/0002.gif");
	buttons += emoticonButton("003", "http://sary.melati.googlepages.com/0003.gif");
	buttons += emoticonButton("004", "http://sary.melati.googlepages.com/0004.gif");
	buttons += emoticonButton("005", "http://sary.melati.googlepages.com/0005.gif");
	buttons += emoticonButton("006", "http://sary.melati.googlepages.com/0006.gif");
	buttons += emoticonButton("007", "http://sary.melati.googlepages.com/0007.gif");
	buttons += emoticonButton("008", "http://sary.melati.googlepages.com/0008.gif");
	buttons += emoticonButton("009", "http://sary.melati.googlepages.com/0009.gif");
	buttons += emoticonButton("010", "http://sary.melati.googlepages.com/0010.gif");
	buttons += emoticonButton("011", "http://sary.melati.googlepages.com/0011.gif");
	buttons += emoticonButton("012", "http://sary.melati.googlepages.com/0012.gif");
	buttons += emoticonButton("013", "http://sary.melati.googlepages.com/0013.gif");
	buttons += emoticonButton("014", "http://sary.melati.googlepages.com/0014.gif");
	buttons += emoticonButton("015", "http://sary.melati.googlepages.com/0015.gif");
	buttons += emoticonButton("016", "http://sary.melati.googlepages.com/0016.gif");
	buttons += emoticonButton("017", "http://sary.melati.googlepages.com/0017.gif");
	buttons += emoticonButton("018", "http://sary.melati.googlepages.com/0018.gif");
	buttons += emoticonButton("019", "http://sary.melati.googlepages.com/0019.gif");
	buttons += emoticonButton("020", "http://sary.melati.googlepages.com/0020.gif");
	buttons += emoticonButton("021", "http://i236.photobucket.com/albums/ff22/bima77/smiley/AddEmoticons07621.gif");
	buttons += emoticonButton("022", "http://i236.photobucket.com/albums/ff22/bima77/smiley/AddEmoticons07622.gif");
	buttons += emoticonButton("023", "http://i236.photobucket.com/albums/ff22/bima77/smiley/AddEmoticons07623.gif");
	buttons += emoticonButton("024", "http://i236.photobucket.com/albums/ff22/bima77/smiley/AddEmoticons07624.gif");
	buttons += emoticonButton("025", "http://i236.photobucket.com/albums/ff22/bima77/smiley/AddEmoticons07625.gif");
	buttons += emoticonButton("026", "http://i236.photobucket.com/albums/ff22/bima77/smiley/AddEmoticons07626.gif");
	buttons += emoticonButton("027", "http://i236.photobucket.com/albums/ff22/bima77/smiley/AddEmoticons07627.gif");
	buttons += emoticonButton("028", "http://i236.photobucket.com/albums/ff22/bima77/smiley/AddEmoticons07628.gif");
	buttons += emoticonButton("029", "http://i236.photobucket.com/albums/ff22/bima77/smiley/AddEmoticons07629.gif");
	buttons += emoticonButton("030", "http://i236.photobucket.com/albums/ff22/bima77/smiley/AddEmoticons07630.gif");
	buttons += emoticonButton("031", "http://i236.photobucket.com/albums/ff22/bima77/smiley/AddEmoticons07631.gif");
	buttons += emoticonButton("032", "http://i236.photobucket.com/albums/ff22/bima77/smiley/AddEmoticons07632.gif");
	buttons += emoticonButton("033", "http://i236.photobucket.com/albums/ff22/bima77/smiley/AddEmoticons07633.gif");
	buttons += emoticonButton("034", "http://i236.photobucket.com/albums/ff22/bima77/smiley/AddEmoticons07634.gif");
	buttons += emoticonButton("035", "http://i236.photobucket.com/albums/ff22/bima77/smiley/AddEmoticons07635.gif");
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"20\\\" height=\\\"26\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);