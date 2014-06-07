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
	buttons += emoticonButton("annoyed", "hhttp://img264.imageshack.us/img264/4426/annoyed.gif");
	buttons += emoticonButton("grin", "http://img258.imageshack.us/img258/6326/biggriny.gif");
	buttons += emoticonButton("blah", "http://img266.imageshack.us/img266/831/blah.gif");
	buttons += emoticonButton("blank", "http://img264.imageshack.us/img264/5425/blankh.gif");
	buttons += emoticonButton("blush", "http://img513.imageshack.us/img513/9793/blushc.gif");
	buttons += emoticonButton("msn01", "http://img142.imageshack.us/img142/7789/bouncer.gif");
	buttons += emoticonButton("slp", "http://img139.imageshack.us/img139/2663/confused.gif");
	buttons += emoticonButton("cool", "http://img227.imageshack.us/img227/9657/cool.gif");
	buttons += emoticonButton("confusd", "http://img115.imageshack.us/img115/325/crys.gif");
	buttons += emoticonButton("mad", "http://img223.imageshack.us/img223/5823/cute.gif");
	buttons += emoticonButton("swt", "http://img244.imageshack.us/img244/4646/devill.gif");
	buttons += emoticonButton("neutral", "http://img4.imageshack.us/img4/4865/indifferent0014.gif");
	buttons += emoticonButton("question", "http://img151.imageshack.us/img151/9987/duh.gif");
	buttons += emoticonButton("swt01", "http://img142.imageshack.us/img142/9733/evilu.gif");
	buttons += emoticonButton("shy", "http://img78.imageshack.us/img78/6945/grinz.gif");
	buttons += emoticonButton("twisted", "http://img26.imageshack.us/img26/4280/gross.gif");
			
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