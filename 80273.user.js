// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Arif Ilham (http://entry44.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Bear Emoticons untuk (for) old blogger editor..... by Enty44
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Old Editor Blogger. by entry44.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b01.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b02.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b03.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b04.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b05.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b06.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b07.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b08.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b09.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b10.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b11.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b12.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b13.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b14.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b15.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b16.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b17.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b18.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b19.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://www.laymark.com/i/b/b20.gif");






	
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