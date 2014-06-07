// ==UserScript==
// @name          yana emoticon for Blogger by Yana
// @namespace      http://ladolceynalicious.blogspot.com
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
buttons += emoticonButton("ipin1", "http://www.upindanipin.com.my/download/smiley/ipin01.gif");
buttons += emoticonButton("ipin2", "http://www.upindanipin.com.my/download/smiley/ipin02.gif");
buttons += emoticonButton("upin1", "http://www.upindanipin.com.my/download/smiley/upin01.gif");
buttons += emoticonButton("upin2", "http://www.upindanipin.com.my/download/smiley/upin02.gif");
buttons += emoticonButton("fizi", "http://www.upindanipin.com.my/download/smiley/fizi01.gif");
buttons += emoticonButton("kakros1", "http://www.upindanipin.com.my/download/smiley/kakros01.gif");
buttons += emoticonButton("kakros2", "http://www.upindanipin.com.my/download/smiley/kakros02.gif");
buttons += emoticonButton("ehsan1", "http://www.upindanipin.com.my/download/smiley/ehsan01.gif");
buttons += emoticonButton("ehsan2", "http://www.upindanipin.com.my/download/smiley/ehsan02.gif");
buttons += emoticonButton("mail", "http://www.upindanipin.com.my/download/smiley/mail01.gif");
       
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