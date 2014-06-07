// Based on the original emoticonsforblogger by Kuribo 

(http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by jeanuuu (http://fetish-secret.info/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Marie Smileys On Blogger 2
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


	buttons += emoticonButton("01", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/xmarie6.gif")

;
	buttons += emoticonButton("02", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/xmarie7.gif")

;
	buttons += emoticonButton("03", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/xmarie8.gif")

;
	buttons += emoticonButton("04", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/marie9.gif");
	buttons += emoticonButton("05", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/xmarie0.gif")

;
	buttons += emoticonButton("06", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/xmarie1.gif")

;
	buttons += emoticonButton("07", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/xmarie2.gif")

;
	buttons += emoticonButton("08", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/xmarie3.gif")

;
	buttons += emoticonButton("09", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/xmarie4.gif")

;
	buttons += emoticonButton("10", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/xmarie5.gif")

;
	buttons += emoticonButton("11", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/marie3.gif");
	buttons += emoticonButton("12", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/marie4.gif");
	buttons += emoticonButton("13", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/marie5.gif");
	buttons += emoticonButton("14", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/marie6.gif");
	buttons += emoticonButton("15", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/marie7.gif");
	buttons += emoticonButton("16", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/marie8.gif");
	buttons += emoticonButton("17", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/marie0.gif");
	buttons += emoticonButton("18", 

"ttp://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/marie1.gif");
	buttons += emoticonButton("19", 

"http://i731.photobucket.com/albums/ww314/Oh-some/Layout%20Background/smileys/marie2.gif");

			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + 

"' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' 

onmousedown='CheckFormatting(event);(function() {var rich_edit = 

document.getElementById(\"richeditorframe\");var rich_body = 

rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  

class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"15\\\" height=\\\"15\\\" alt=\\\"" + 

name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url 

+ "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" 

class=\"g\">&nbsp;</span><span style=\"display: block;\" 

class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);