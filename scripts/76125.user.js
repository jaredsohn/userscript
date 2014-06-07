// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Cahya Prastyanto (http://entry44.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Dangos Emoticons untuk (for) blogger editor..... by Enty44
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger. by entry44.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/1.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/2.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/3.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/4.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/5.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/6.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/7.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/8.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/9.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/10.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/11.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/12.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/13.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/14.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/15.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/16.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/17.gif");
buttons += emoticonButton("entry44.blogspot.com", "http://emo.huhiho.com/set/dangos/18.gif");


	
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