// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Pink Emoticons
// @namespace      Yllvyre
// @description    Original code came from http://n-a-j-w-a.blogspot.com/
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("wink", 

"http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_wink.gif");
	buttons += emoticonButton("emoticon01", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/shopping.gif");
	buttons += emoticonButton("emoticon02", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/sick.gif");
	buttons += emoticonButton("emoticon03", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/sidaibaju.png");
	buttons += emoticonButton("emoticon04", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/sister.png");
	buttons += emoticonButton("emoticon05", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/skippy.gif");
	buttons += emoticonButton("emoticon06", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/skola.png");
	buttons += emoticonButton("emoticon07", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/skull-1.gif");
	buttons += emoticonButton("emoticon08", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/smile.gif");
	buttons += emoticonButton("emoticon09", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/socks.png");
	buttons += emoticonButton("emoticon10", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/sofbol.gif");
	buttons += emoticonButton("emoticon11", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/sotong.png");
	buttons += emoticonButton("emoticon12", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/spec.gif");
	buttons += emoticonButton("emoticon13", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/star2.gif");
	buttons += emoticonButton("emoticon14", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/stoberi.gif");
	buttons += emoticonButton("emoticon15", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/stokin.gif");
	buttons += emoticonButton("emoticon16", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/straighten.png");
	buttons += emoticonButton("emoticon17", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/surat.png");
	buttons += emoticonButton("emoticon18", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/sweater.gif");
	buttons += emoticonButton("emoticon19", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/sweets.gif");
	buttons += emoticonButton("emoticon20", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/tampar.png");
	buttons += emoticonButton("emoticon21", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/tdo-1.gif");
	buttons += emoticonButton("emoticon22", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/tdo.png");
	buttons += emoticonButton("emoticon23", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/tepon.gif");
	buttons += emoticonButton("emoticon24", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/thcreambunny_tv-1.gif");
	buttons += emoticonButton("emoticon25", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/thfon-2-1.gif");
	buttons += emoticonButton("emoticon26", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/thgirl-1.gif");
	buttons += emoticonButton("emoticon27", 

"http://i596.photobucket.com/albums/tt44/ainurnajwastory/thjam-1.gif"
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' 

onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' 

onmousedown='CheckFormatting(event);(function() {var rich_edit = 

document.getElementById(\"richeditorframe\");var rich_body = 

rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  

class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"15\\\" height=\\\"15\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + 

"\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" 

class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);