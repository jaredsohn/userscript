// Modified by Eun Sara Hyun (http://deardiaryeunsarahyun.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Wari Brown Hair Smiley
// @namespace      http://deardiaryeunsarahyun.blogspot.com/
// @description    Emoticons in Blogger Only by Eun Dear Diary.com (26)
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
buttons += emoticonButton("wari1", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh21.gif");
buttons += emoticonButton("wari2", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh10.gif");
buttons += emoticonButton("wari3", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh11.gif");
buttons += emoticonButton("wari4", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh12.gif");
buttons += emoticonButton("wari5", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh13.gif");
buttons += emoticonButton("wari6", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh14.gif");
buttons += emoticonButton("wari7", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh15.gif");
buttons += emoticonButton("wari8", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh17.gif");
buttons += emoticonButton("wari9", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh18.gif");
buttons += emoticonButton("wari10", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh20.gif");
buttons += emoticonButton("wari11", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh24.gif");
buttons += emoticonButton("wari12", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh2.gif");
buttons += emoticonButton("wari13", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh1.gif");
buttons += emoticonButton("wari14", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh25.gif");
buttons += emoticonButton("wari15", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh26.gif");
buttons += emoticonButton("wari16", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh27.gif");
buttons += emoticonButton("wari17", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh28.gif");
buttons += emoticonButton("wari18", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh3.gif");
buttons += emoticonButton("wari19", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh5.gif");
buttons += emoticonButton("wari20", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh6.gif");
buttons += emoticonButton("wari21", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh7.gif");
buttons += emoticonButton("wari22", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh8.gif");
buttons += emoticonButton("wari23", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh9.gif");
buttons += emoticonButton("wari24", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh4.gif");
buttons += emoticonButton("wari25", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh23.gif");
buttons += emoticonButton("wari26", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/gyh22.gif");
        buttons += emoticonButton(":Oishie:(", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/anigif-2.gif");

    
	buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"50\\\" height=\\\"50\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img width=\"25\" height=\"25\" src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);