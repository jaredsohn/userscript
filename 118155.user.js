// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by cyquita (http://daydreamcyquita.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Parampaa emoticon
// @namespace      http://cyquita.googlepages.com/
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
	buttons += emoticonButton(":woot:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/woot.gif");
	buttons += emoticonButton(":surprise:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/surprise.gif");
	buttons += emoticonButton(":smile:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/smile.gif");
	buttons += emoticonButton(":sleep:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/sleep.gif");
	buttons += emoticonButton(":nyucuk:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/nyucuk.gif");
	buttons += emoticonButton(":nyesel:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/nyesel.gif");
	buttons += emoticonButton(":ngantuk:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/ngantuk.gif");
	buttons += emoticonButton(":music:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/music.gif");
	buttons += emoticonButton(":twistedz:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/icon_twisted.gif");
	buttons += emoticonButton(":surprisedz:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/icon_surprised.gif");
	buttons += emoticonButton(":sad:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/icon_sad.gif");
	buttons += emoticonButton(":rolleyes:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/icon_rolleyes.gif");
	buttons += emoticonButton(":redface:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/icon_redface.gif");
	buttons += emoticonButton(":razz:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/icon_razz.gif");
	buttons += emoticonButton(":question:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/icon_question.gif");
	buttons += emoticonButton(":mad:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/icon_mad.gif");
	buttons += emoticonButton(":LOL:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/icon_lol.gif");
	buttons += emoticonButton(":evil:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/icon_evil.gif");
	buttons += emoticonButton(":eek:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/icon_eek.gif");
	buttons += emoticonButton(":cry:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/icon_cry.gif");
	buttons += emoticonButton(":cool:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/icon_cool.gif");
	buttons += emoticonButton(":confuse:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/icon_confused.gif");
	buttons += emoticonButton(":hoahmm:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/hoahmm.gif");
	buttons += emoticonButton(":fufu:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/fufu.gif");
	buttons += emoticonButton(":die:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/die.gif");
	buttons += emoticonButton(":cry2:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/cry2.gif");
	buttons += emoticonButton(":redface2:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/con_redface.gif");
	buttons += emoticonButton(":cemberut:", "http://i527.photobucket.com/albums/cc358/cyquita/parampaa/cemberut.gif");
	buttons += emoticonButton(":bignose:", "http://2.bp.blogspot.com/-cE5ssY85Ji4/TsKK9n0P9RI/AAAAAAAABhc/a71Pgf50RXg/s320/bignose.gif");
	buttons += emoticonButton(":gross:", "http://4.bp.blogspot.com/-OLTzWzBaP9Q/TsKLMU5SR9I/AAAAAAAABho/BLFs7-6zbYQ/s320/gross.gif");
    
	buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"50\\\" height=\\\"50\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img width=\"25\" height=\"25\" src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);