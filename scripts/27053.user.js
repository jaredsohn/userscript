// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by dessycherryponie (http://dessycherryponie.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kucingmanis Script
// @namespace      http://kuribo.info
// @description    You can use emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("001", "http://i159.photobucket.com/albums/t140/nita_noty/kusing%20manis/sd-cc-0014.gif");
	buttons += emoticonButton("002", "http://i159.photobucket.com/albums/t140/nita_noty/kusing%20manis/sd-cc-0016.gif");
buttons += emoticonButton("003", "http://i159.photobucket.com/albums/t140/nita_noty/kusing%20manis/sd-cc-0013.gif");
buttons += emoticonButton("004", "http://i159.photobucket.com/albums/t140/nita_noty/kusing%20manis/sd-cc-0012.gif");
buttons += emoticonButton("005", "http://i159.photobucket.com/albums/t140/nita_noty/kusing%20manis/sd-cc-0008.gif");
buttons += emoticonButton("006", "http://i159.photobucket.com/albums/t140/nita_noty/kusing%20manis/sd-cc-0007.gif");
buttons += emoticonButton("007", "http://i159.photobucket.com/albums/t140/nita_noty/kusing%20manis/sd-cc-0032.gif");
buttons += emoticonButton("008", "http://i159.photobucket.com/albums/t140/nita_noty/kusing%20manis/sd-cc-0057.gif");
buttons += emoticonButton("009", "http://i159.photobucket.com/albums/t140/nita_noty/kusing%20manis/sd-cc-0056.gif");
buttons += emoticonButton("010", "http://i159.photobucket.com/albums/t140/nita_noty/kusing%20manis/sd-cc-0052.gif");
buttons += emoticonButton("011", "http://i159.photobucket.com/albums/t140/nita_noty/kusing%20manis/sd-cc-0042.gif");
buttons += emoticonButton("012", "http://i159.photobucket.com/albums/t140/nita_noty/kusing%20manis/sd-cc-0039.gif");
buttons += emoticonButton("013", "http://i159.photobucket.com/albums/t140/nita_noty/kusing%20manis/sd-cc-0041.gif");
buttons += emoticonButton("014", "http://i159.photobucket.com/albums/t140/nita_noty/kusing%20manis/sd-cc-0043.gif");
	
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"53\\\" height=\\\"51\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);