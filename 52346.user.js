// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

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
	buttons += emoticonButton("arrow", "http://chueisha.bplaced.net/blogger/emoticons/smilie.gif");
	buttons += emoticonButton("biggrin", "http://chueisha.bplaced.net/blogger/emoticons/smilie (2).gif");
	buttons += emoticonButton("confused", "http://chueisha.bplaced.net/blogger/emoticons/smilie (3).gif");
	buttons += emoticonButton("cool", "http://chueisha.bplaced.net/blogger/emoticons/smilie (4).gif");
	buttons += emoticonButton("cry", "http://chueisha.bplaced.net/blogger/emoticons/smilie (5).gif");
	buttons += emoticonButton("eek", "http://chueisha.bplaced.net/blogger/emoticons/smilie (6).gif");
	buttons += emoticonButton("evil", "http://chueisha.bplaced.net/blogger/emoticons/smilie (7).gif");
	buttons += emoticonButton("exclaim", "http://chueisha.bplaced.net/blogger/emoticons/smilie (8).gif");
	buttons += emoticonButton("idea", "http://chueisha.bplaced.net/blogger/emoticons/smilie (9).gif");
	buttons += emoticonButton("lol", "http://chueisha.bplaced.net/blogger/emoticons/smilie (10).gif");
	buttons += emoticonButton("mad", "http://chueisha.bplaced.net/blogger/emoticons/smilie (11).gif");
	buttons += emoticonButton("mrgreen", "http://chueisha.bplaced.net/blogger/emoticons/smilie (12).gif");
	buttons += emoticonButton("neutral", "http://chueisha.bplaced.net/blogger/emoticons/smilie (13).gif");
	buttons += emoticonButton("question", "http://chueisha.bplaced.net/blogger/emoticons/smilie (14).gif");
	buttons += emoticonButton("http://chueisha.bplaced.net/blogger/emoticons/smilie (15).gif");
	buttons += emoticonButton("http://chueisha.bplaced.net/blogger/emoticons/smilie (16).gif");
	buttons += emoticonButton("http://chueisha.bplaced.net/blogger/emoticons/smilie (17).gif");
	buttons += emoticonButton("http://chueisha.bplaced.net/blogger/emoticons/smilie (18).gif");
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"20\\\" height=\\\"20\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);