// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Cahya Prastyanto (http://blogger-emoticon.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger Part3
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
	
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/026.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/033.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/128.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/021.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/034-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/035.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/036.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/037.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/041.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/043.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/046.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/053-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/054.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/055.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/056.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/057.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/061.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/064.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/071.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/072.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/074.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/075.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/076.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/085.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/088.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/089.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/091.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/092.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/097.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/099.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/101.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/102.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/108.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/111.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/114.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/115.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/118.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/120.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon16.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon18.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon20.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon24.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon25.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon26.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon27.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon28.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon29.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon32.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/004-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon2.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon4.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon6.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon8.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon9.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon10.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon12.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon13.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon14.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon15.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon17.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon19.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon21.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon22.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon23.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon30.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon33.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon34.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon35.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon36.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon37.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon38.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon39.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon41.png");

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