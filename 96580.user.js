// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Cahya Prastyanto (http://blogger-emoticon.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger Baifu 4.0
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger. by Blogger-Emoticon.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i25.tinypic.com/2m7t6dc.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i32.tinypic.com/2qc32ua.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i26.tinypic.com/1q4bpx.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i25.tinypic.com/2cff8fb.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i28.tinypic.com/2znoodx.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i26.tinypic.com/c86r7.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i29.tinypic.com/2dnvhd.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i25.tinypic.com/1z4wei8.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i28.tinypic.com/mcyff6.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i31.tinypic.com/6jg110.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i29.tinypic.com/2mz9tog.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i28.tinypic.com/bga16f.jpg");


	
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