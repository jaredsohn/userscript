// Modified by Eun Sara Hyun (http://frankymuffins.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Origiri Smiley
// @namespace      http://frankymuffins.blogspot.com/
// @description    Emoticons in Blogger Only by frankymuffins.com (18)
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("onigiri1", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri1.gif");
buttons += emoticonButton("onigiri2", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri2.gif");
buttons += emoticonButton("onigiri3", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri3.gif");
buttons += emoticonButton("onigiri4", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri4.gif");
buttons += emoticonButton("onigiri5", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri5.gif");
buttons += emoticonButton("onigiri6", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri6.gif");
buttons += emoticonButton("onigiri7", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri7.gif");
buttons += emoticonButton("onigiri8", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri8.gif");
buttons += emoticonButton("onigiri9", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri9.gif");
buttons += emoticonButton("onigiri10", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri10.gif");
buttons += emoticonButton("onigiri11", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri11.gif");
buttons += emoticonButton("onigiri12", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri12.gif");
buttons += emoticonButton("onigiri13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri13.gif");
buttons += emoticonButton("onigiri14", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri14.gif");
buttons += emoticonButton("onigiri15", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri15.gif");
buttons += emoticonButton("onigiri16", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri16.gif");
buttons += emoticonButton("onigiri17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri17.gif");
buttons += emoticonButton("onigiri18", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri18.gif");
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