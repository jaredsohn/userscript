// Based on the original emoticonsforblogger by Fathinie (http://fathinielovechocolate.blogspot.com)
// Modified by Nuraina Fathinie (http://fathinielovechocolate.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Thinie's Japanese Emoticons
// @namespace      http://fathinielovechocolate.blogspot.com/
// @description    You can use emoticons in Blogger by using Grease Monkey. by fathinielovechocolate.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/9.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/8.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/7.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/6.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/51.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/5.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/49.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/48.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/47.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/46.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/45.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/43.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/42.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/4.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/39.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/38.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/37.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/36.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/35.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/34.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/33.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/32.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/31.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/30.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/3.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/29.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/28.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/27.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/26.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/25.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/24.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/23.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/22.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/21.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/2.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/19.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/18.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/16.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/11.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/10.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/1.gif");
	
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