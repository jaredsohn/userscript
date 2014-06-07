// Based on the original emoticonsforblogger by Fathinie (http://fathinielovechocolate.blogspot.com)
// Modified by Nuraina Fathinie (http://fathinielovechocolate.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Thinie's Girl Yellow smiley
// @namespace      http://fathinielovechocolate.blogspot.com/
// @description    You can use emoticons in Blogger. by fathinielovechocolate.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh16.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh21.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh10.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh11.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh12.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh13.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh14.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh15.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh17.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh18.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh20.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh24.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh2.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh1.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh25.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh26.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh27.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh28.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh3.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh5.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh6.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh7.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh8.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh9.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh4.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh23.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh22.gif");
	
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