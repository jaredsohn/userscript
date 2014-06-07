// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Nia (http://michaela-nathania.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Cute Rabbit Emoticon
// @namespace      http://michaela-nathania.blogspot.com
// @description    You can use emoticons in Blogger by michaela-nathania.blogspot.com. Follow my blog for the notification of new script
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";

buttons += emoticonButton("cute-rabbit-emoticon-01", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-01.gif");
buttons += emoticonButton("cute-rabbit-emoticon-02", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-02.gif");
buttons += emoticonButton("cute-rabbit-emoticon-03", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-03.gif");
buttons += emoticonButton("cute-rabbit-emoticon-04", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-04.gif");
buttons += emoticonButton("cute-rabbit-emoticon-05", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-05.gif");
buttons += emoticonButton("cute-rabbit-emoticon-06", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-06.gif");
buttons += emoticonButton("cute-rabbit-emoticon-07", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-07.gif");
buttons += emoticonButton("cute-rabbit-emoticon-08", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-08.gif");
buttons += emoticonButton("cute-rabbit-emoticon-09", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-09.gif");
buttons += emoticonButton("cute-rabbit-emoticon-10", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-10.gif");
buttons += emoticonButton("cute-rabbit-emoticon-11", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-11.gif");
buttons += emoticonButton("cute-rabbit-emoticon-12", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-12.gif");
buttons += emoticonButton("cute-rabbit-emoticon-13", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-13.gif");
buttons += emoticonButton("cute-rabbit-emoticon-14", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-14.gif");
buttons += emoticonButton("cute-rabbit-emoticon-15", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-15.gif");
buttons += emoticonButton("cute-rabbit-emoticon-16", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-16.gif");
buttons += emoticonButton("cute-rabbit-emoticon-17", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-17.gif");
buttons += emoticonButton("cute-rabbit-emoticon-18", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-18.gif");
buttons += emoticonButton("cute-rabbit-emoticon-19", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-19.gif");
buttons += emoticonButton("cute-rabbit-emoticon-20", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-20.gif");
buttons += emoticonButton("cute-rabbit-emoticon-21", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-21.gif");
buttons += emoticonButton("cute-rabbit-emoticon-22", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-22.gif");
buttons += emoticonButton("cute-rabbit-emoticon-23", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-23.gif");
buttons += emoticonButton("cute-rabbit-emoticon-24", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-24.gif");
buttons += emoticonButton("cute-rabbit-emoticon-27", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-27.gif");
buttons += emoticonButton("cute-rabbit-emoticon-28", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-28.gif");
buttons += emoticonButton("cute-rabbit-emoticon-29", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-29.gif");
buttons += emoticonButton("cute-rabbit-emoticon-30", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-30.gif");
buttons += emoticonButton("cute-rabbit-emoticon-31", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-31.gif");
buttons += emoticonButton("cute-rabbit-emoticon-32", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-32.gif");
buttons += emoticonButton("cute-rabbit-emoticon-33", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-cuterabbit/cute-rabbit-emoticon-33.gif");

	
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