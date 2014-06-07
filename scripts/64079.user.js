// Based on the original emoticonsforblogger by Fathinie (http://fathinielovechocolate.blogspot.com/)
// Modified by Nuraina Fathinie (http://fathinielovechocolate.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Thinie's Cici Smiley
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger. by fathinielovechocolate.blogspot.com(Fathinie)
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-001.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-002.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-003.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-004.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-005.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-006.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-007.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-008.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-009.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-010.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-011.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-012.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-025.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-013.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-014.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-015.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-016.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-017.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-018.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-019.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-020.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-021.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-022.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-023.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-024.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-026.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-027.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-028.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-029.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-030.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-031.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-033.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-034.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-035.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-036.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-037.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-038.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-039.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-040.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-041.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-042.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-043.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-044.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-045.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-046.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-047.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-048.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-049.gif");
buttons += emoticonButton("fathinielovechocolate.blogspot.com", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/thcici-emoticon-050.gif");

	
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