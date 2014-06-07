// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger
// @namespace      http://www.kuribo.info/
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
	buttons += emoticonButton(";)", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1852.gif");
	buttons += emoticonButton("^^", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1853.gif");
	buttons += emoticonButton(":((", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1851.gif");
	buttons += emoticonButton(":(", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1845.gif");
	buttons += emoticonButton(";))", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1848.giff");
	buttons += emoticonButton(":D", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1856.gif");
	buttons += emoticonButton(":)", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1855.gif");
	buttons += emoticonButton(":|", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1850.gif");
	buttons += emoticonButton("X(", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1854.gif");
	buttons += emoticonButton("gtg", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/watch.gif");
	buttons += emoticonButton("rainy", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/umbrella1.gif");
	buttons += emoticonButton("applause", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/retrete.gif");
	buttons += emoticonButton("oh", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/rtrt.gif");
	buttons += emoticonButton("snowy", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/snowing.gif");
	buttons += emoticonButton("mail", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/letter.gif");
	buttons += emoticonButton("peace", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/peace.gif");
	buttons += emoticonButton("night", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/moon.gif");
	buttons += emoticonButton("!?", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/7.gif");
	buttons += emoticonButton("note", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/725.gif");
	buttons += emoticonButton("present", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/726.gif");
	buttons += emoticonButton("good", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/good.gif");
	buttons += emoticonButton("sunny", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1547.gif"); 
	buttons += emoticonButton("sms", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1554.gif"); 
	buttons += emoticonButton("cafe", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1555.gif"); 
	buttons += emoticonButton("ok", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1512.gif");
	buttons += emoticonButton("eating", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1518.gif");  
   	buttons += emoticonButton("!!", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1540.gif"); 
   	buttons += emoticonButton("cries", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1541.gif"); 
   	buttons += emoticonButton("music", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1543.gif"); 
   	buttons += emoticonButton("cloudy", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/cloudy1.gif"); 
   	buttons += emoticonButton("YES", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/dsf.gif"); 
   	buttons += emoticonButton("hi", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/ertret.gif"); 
  	buttons += emoticonButton("bad", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/bad.gif"); 
  	buttons += emoticonButton("reading", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1863.gif"); 
  	buttons += emoticonButton("book", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/book2.gif"); 
  	buttons += emoticonButton("bus", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/bus.gif"); 
  	buttons += emoticonButton("love", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1702.gif"); 
  	buttons += emoticonButton("new clothes", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1702.gif");
  	buttons += emoticonButton("luck", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1709.gif");
  	buttons += emoticonButton("cute", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/ve.gif");
  	buttons += emoticonButton("?", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/rtert.gif");
  	buttons += emoticonButton("searching", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/magnifying.gif");
  	buttons += emoticonButton("writing", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/pencil.gif");
  	buttons += emoticonButton(">.<", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1563.gif");
  	buttons += emoticonButton("O.O", "http://i302.photobucket.com/albums/nn100/missfiorroucci/cute/1558.gif");

			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"15\\\" height=\\\"15\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);