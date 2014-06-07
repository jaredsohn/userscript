//-----------------------------------------------------------------------//
// Cute Cat Smileys
// izzalemonade Version
// Visit my blog at http://thisisownbyme.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : blogmenjerit (http://blogmenjerit.blogspot.com/)

// ==UserScript==
// @name           izzalemonad colourful emoticon
// ==/UserScript==

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

window.addEventListener("load", function(e) {

function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	 buttons += emoticonButton(":#a:", "http://i110.photobucket.com/albums/n99/sakuraworld89/01.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/02.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/03.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/04.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/05.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/06.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/07.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/08.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/09.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/10.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/11.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/12.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/13.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/14.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/15.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/16.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/EM_Cute039.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/laugh.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/thdrink.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/thcoffee.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/thcat.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/0199.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/thtonge.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/thnote.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/thno.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/thi_love_you.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/thhi.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/thgood_bye.gif"); 
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/thfighting.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/heart.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/2rmnz82_th.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/angel68.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/137456a7yi159cti.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/sheep.gif");
         buttons += emoticonButton(":#b:", "http://i110.photobucket.com/albums/n99/sakuraworld89/1549.gif");

	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);

    
