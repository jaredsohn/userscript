// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Parampaa Emoticons for Blogger
// @namespace      http://www.kuribo.info/
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
	buttons += emoticonButton(":nyesel", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/nyesel.gif?t=1293435769");
	buttons += emoticonButton(":D", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/woot.gif?t=1293435769");
	buttons += emoticonButton(":surprise", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/surprise.gif?t=1293435769");
	buttons += emoticonButton(":smile", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/smile.gif?t=1293435769");
	buttons += emoticonButton(":sleep", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/sleep.gif?t=1293435769");
	buttons += emoticonButton(":nyucuk", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/nyucuk.gif?t=1293435769");
	buttons += emoticonButton(":ngantuk", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/ngantuk.gif?t=1293435769");
	buttons += emoticonButton(":music", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/music.gif?t=1293435769");
	buttons += emoticonButton(":twisted", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/icon_twisted.gif?t=1293435769");
	buttons += emoticonButton(":terkejut", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/icon_surprised.gif?t=1293435769");
	buttons += emoticonButton(":sad", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/icon_sad.gif?t=1293436019");
	buttons += emoticonButton(":rolleyes", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/icon_rolleyes.gif?t=1293436019");
	buttons += emoticonButton(":redface", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/icon_redface.gif?t=1293436019");
	buttons += emoticonButton(":razz", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/icon_razz.gif?t=1293436019");
	buttons += emoticonButton(":question", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/icon_question.gif?t=1293436019");
	buttons += emoticonButton(":mad", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/icon_mad.gif?t=1293436019");
	buttons += emoticonButton(":lol", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/icon_lol.gif?t=1293436019");
	buttons += emoticonButton(":evil", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/icon_evil.gif?t=1293436019");
	buttons += emoticonButton(":eek", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/icon_eek.gif?t=1293436019");
	buttons += emoticonButton(":cry", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/icon_cry.gif?t=1293436019");
	buttons += emoticonButton(":cool", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/icon_cool.gif?t=1293436338");
	buttons += emoticonButton(":confused", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/icon_confused.gif?t=1293436338");
	buttons += emoticonButton(":hoahmm", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/hoahmm.gif?t=1293436338");
	buttons += emoticonButton(":gross", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/gross.gif?t=1293436338");
	buttons += emoticonButton(":fufu", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/fufu.gif?t=1293436338");
	buttons += emoticonButton(":die", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/die.gif?t=1293436338");
	buttons += emoticonButton(":cry2", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/cry2.gif?t=1293436338");
	buttons += emoticonButton(":redface2", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/con_redface.gif?t=1293436338");
	buttons += emoticonButton(":cemberut", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/cemberut.gif?t=1293436338");
	buttons += emoticonButton(":bignose", "http://i1129.photobucket.com/albums/m508/tanto2998/Parampaa%20Icon/bignose.gif?t=1293436338");
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"40\\\" height=\\\"40\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);