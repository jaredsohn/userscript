// ==UserScript==
// @name           smilies
// @namespace      http://www.bibi1004.com/
// @description    edited by wawa 
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	

buttons += emoticonButton(":1:", "http://i469.photobucket.com/albums/rr60/wawa-chan/smilies/Untitled-3.png");
buttons += emoticonButton(":2:", "http://i469.photobucket.com/albums/rr60/wawa-chan/smilies/Untitled-1.png");
buttons += emoticonButton(":3:", "http://i469.photobucket.com/albums/rr60/wawa-chan/smilies/Untitled-2.png");
buttons += emoticonButton(":4:", "http://i469.photobucket.com/albums/rr60/wawa-chan/smilies/Untitled-4.png");
buttons += emoticonButton(":5:", "http://i469.photobucket.com/albums/rr60/wawa-chan/smilies/Untitled-5.png");
buttons += emoticonButton(":6:", "http://i469.photobucket.com/albums/rr60/wawa-chan/smilies/Untitled-8.png");
buttons += emoticonButton(":7:", "http://i469.photobucket.com/albums/rr60/wawa-chan/smilies/Untitled-13.png");
buttons += emoticonButton(":8:", "http://i469.photobucket.com/albums/rr60/wawa-chan/smilies/Untitled-12.png");
buttons += emoticonButton(":9:", "http://i469.photobucket.com/albums/rr60/wawa-chan/smilies/Untitled-11.png");
buttons += emoticonButton(":10:", "http://i469.photobucket.com/albums/rr60/wawa-chan/smilies/Untitled-10.png");
buttons += emoticonButton(":11:", "http://i469.photobucket.com/albums/rr60/wawa-chan/smilies/Untitled-7.png");
buttons += emoticonButton(":12:", "http://i469.photobucket.com/albums/rr60/wawa-chan/smilies/Untitled-6.png");
buttons += emoticonButton(":13:", "http://i469.photobucket.com/albums/rr60/wawa-chan/smilies/Untitled-9.png");

	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);