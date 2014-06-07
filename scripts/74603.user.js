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
	
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/18.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/17.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/16.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/15.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/14.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/12.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/11.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/13.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/10.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/9.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/8.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/7.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/6.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/5.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/4.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/3.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/2.gif");
buttons += emoticonButton("mohd-zul-haziq.blogspot.com", "http://emo.huhiho.com/set/crab/1.gif");


	
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