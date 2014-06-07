// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Cahya Prastyanto (http://blogger-emoticon.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger cici
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
	
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici1.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici2.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici3.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici4.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici5.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici6.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici7.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici8.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici9.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici10.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici11.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici12.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici13.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici14.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici15.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici16.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici17.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici18.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici19.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici20.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici21.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici22.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici23.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici24.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici25.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici26.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici27.gif");
buttons += emoticonButton("blogger-mysweetden.blogspot.com", "http://i704.photobucket.com/albums/ww42/trisya_aleesa1/cici28.gif");
	
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