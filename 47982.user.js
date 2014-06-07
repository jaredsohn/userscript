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
	buttons += emoticonButton("wink", "http://img398.imageshack.us/img398/5374/cuter.gif");
	buttons += emoticonButton("wink01", "http://img395.imageshack.us/img395/5162/high.gif");
	buttons += emoticonButton("scared", "http://img376.imageshack.us/img376/3069/dead.gif");
	buttons += emoticonButton("sad01", "http://img152.imageshack.us/img152/557/saddlh.gif");
	buttons += emoticonButton("sad02", "http://img126.imageshack.us/img126/6657/cryk.gif");
	buttons += emoticonButton("msn", "http://img60.imageshack.us/img60/7257/diao.gif");
	buttons += emoticonButton("msn01", "http://img521.imageshack.us/img521/7280/grin.gif");
	buttons += emoticonButton("slp", "http://img521.imageshack.us/img521/7280/grin.gif");
	buttons += emoticonButton("cool", "http://img98.imageshack.us/img98/2732/speechless.gif");
	buttons += emoticonButton("confusd", "http://img161.imageshack.us/img161/3/confusedx.gif");
	buttons += emoticonButton("mad", "http://img521.imageshack.us/img521/9319/pissed.gif");
	buttons += emoticonButton("swt", "http://img521.imageshack.us/img521/9319/pissed.gif");
	buttons += emoticonButton("neutral", "http://img8.imageshack.us/img8/1271/cheekyx.gif");
	buttons += emoticonButton("question", "g98.imageshack.us/img98/2732/speechless.gif");
	buttons += emoticonButton("swt01", "http://img60.imageshack.us/img60/3876/omg.gif");
	buttons += emoticonButton("shy", "http://img8.imageshack.us/img8/3189/ashamed0001.gif");
	buttons += emoticonButton("sad", "http://img395.imageshack.us/img395/9207/upset.gif");
	buttons += emoticonButton("twisted", "http://img440.imageshack.us/img440/1152/hahaj.gif");
	buttons += emoticonButton("happy", "http://img440.imageshack.us/img440/1152/hahaj.gif");
	buttons += emoticonButton("happy2", "http://img60.imageshack.us/img60/8658/happym.gif");
			
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