// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)

// ==UserScript==
// @name           Emoticons for Blogger
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
	buttons += emoticonButton("yawn", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear01.gif");
	buttons += emoticonButton("sweat", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear02.gif");
	buttons += emoticonButton("scared", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear03.gif");
	buttons += emoticonButton("sad01", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear04.gif");
	buttons += emoticonButton("sad02", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear05.gif");
	buttons += emoticonButton("msn", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear06.gif");
	buttons += emoticonButton("msn01", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear07.gif");
	buttons += emoticonButton("slp", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear08.gif");
	buttons += emoticonButton("cool", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear09.gif");
	buttons += emoticonButton("confusd", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear10.gif");
	buttons += emoticonButton("mad", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear11.gif");
	buttons += emoticonButton("swt", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear12.gif");
	buttons += emoticonButton("neutral", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear13.gif");
	buttons += emoticonButton("question", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear14.gif");
	buttons += emoticonButton("swt01", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear15.gif");
	buttons += emoticonButton("shy", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear16.gif");
	buttons += emoticonButton("sad", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear17.gif");
	buttons += emoticonButton("twisted", "http://img.photobucket.com/albums/v728/hilarytrish/kaos-bear18.gif");
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"15\\\" height=\\\"15\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);