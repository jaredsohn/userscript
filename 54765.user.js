// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Syahadah (http://fork.bubble.nu/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           more-smilies
// @namespace      http://kangrohman.googlepages.com/
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
	
buttons += emoticonButton(":001:","http://img83.imageshack.us/img83/4149/001w.gif");
buttons += emoticonButton(":002:","http://img56.imageshack.us/img56/7035/002o.gif");
buttons += emoticonButton(":003:","http://img220.imageshack.us/img220/5449/003hvl.gif");
buttons += emoticonButton(":004:","http://img521.imageshack.us/img521/1778/004z.gif");
buttons += emoticonButton(":005:","http://img204.imageshack.us/img204/7875/005vpq.gif");
buttons += emoticonButton(":006:","http://img65.imageshack.us/img65/4179/006y.gif");
buttons += emoticonButton(":007:","http://img73.imageshack.us/img73/1447/007z.gif");
buttons += emoticonButton(":008:","http://img65.imageshack.us/img65/1222/008m.gif");
buttons += emoticonButton(":009:","http://img73.imageshack.us/img73/379/009t.gif");
buttons += emoticonButton(":010:","http://img372.imageshack.us/img372/1200/010.gif");
buttons += emoticonButton(":011:","http://img95.imageshack.us/img95/3313/011o.gif");
buttons += emoticonButton(":012:","http://img66.imageshack.us/img66/8076/012y.gif");
buttons += emoticonButton(":013:","http://img95.imageshack.us/img95/7652/013u.gif");
buttons += emoticonButton(":014:","http://img95.imageshack.us/img95/2271/014o.gif");
buttons += emoticonButton(":015:","http://img266.imageshack.us/img266/7508/015.gif");
buttons += emoticonButton(":016:","http://img372.imageshack.us/img372/3216/016r.gif");
buttons += emoticonButton(":017:","http://img66.imageshack.us/img66/2277/017p.gif");
buttons += emoticonButton(":018:","http://img385.imageshack.us/img385/1650/018.gif");
buttons += emoticonButton(":019:","http://img82.imageshack.us/img82/6669/019p.gif");
buttons += emoticonButton(":020:","http://img220.imageshack.us/img220/2621/020h.gif");
buttons += emoticonButton(":021:","http://img266.imageshack.us/img266/9237/021w.gif");
buttons += emoticonButton(":022:","http://img82.imageshack.us/img82/237/022u.gif");
buttons += emoticonButton(":023:","http://img220.imageshack.us/img220/6642/023.gif");
buttons += emoticonButton(":024:","http://img378.imageshack.us/img378/9755/024.gif");
buttons += emoticonButton(":025:","http://img385.imageshack.us/img385/2158/025.gif");
buttons += emoticonButton(":026:","http://img65.imageshack.us/img65/1120/026.gif");	
buttons += emoticonButton(":027:","http://img374.imageshack.us/img374/268/027.gif");
buttons += emoticonButton(":028:","http://img198.imageshack.us/img198/5281/028e.gif");
buttons += emoticonButton(":029:","http://img65.imageshack.us/img65/5581/029u.gif");
buttons += emoticonButton(":030:","http://img60.imageshack.us/img60/7190/030l.gif");

    
	buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"20\\\" height=\\\"20\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);
