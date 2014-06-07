//-----------------------------------------------------------------------//
// © All Copyright by Afeeqah 
// The original code by me and original smilies from bibi1004
// Visit my blog at http://bon-soir-elle.blogspot.com
//-----------------------------------------------------------------------//

// ==UserScript==
// @name           smilly milly
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
	
	buttons += emoticonButton(":2:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-21.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-27.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-26.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-25.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-24.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-23.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-22.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-20.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-19.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-18.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-17.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-16.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-15.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-14.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-13.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-12.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-11.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-10.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-9.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-6.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-5.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-4.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-3.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-2.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-1.jpg");
	
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

    
