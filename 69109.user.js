// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Tamagu Smilies
// @namespace      http://nurinadlina.blogspot.com/
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
                      
	buttons += emoticonButton("emoticon01", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/wtf.gif");
buttons += emoticonButton("emoticon02", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/wink-1.gif");
buttons += emoticonButton("emoticon03", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/tongue.gif");
buttons += emoticonButton("emoticon04", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/sweat.gif");
buttons += emoticonButton("emoticon05", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/sob.gif");
buttons += emoticonButton("emoticon06", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/smile-1.gif");
buttons += emoticonButton("emoticon07", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/sleep.gif");
buttons += emoticonButton("emoticon08", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/sad-1.gif");
buttons += emoticonButton("emoticon09", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/pmo.gif");
buttons += emoticonButton("emoticon10", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/ohnoes.gif");
buttons += emoticonButton("emoticon11", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/lyknoway.gif");
buttons += emoticonButton("emoticon12", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/love-1.gif");
buttons += emoticonButton("emoticon13", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/happy-1.gif");
buttons += emoticonButton("emoticon14", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/hamu.gif");
buttons += emoticonButton("emoticon15", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/glare.gif");
buttons += emoticonButton("emoticon16", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/eek.gif");
buttons += emoticonButton("emoticon17", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/dead.gif");
buttons += emoticonButton("emoticon18", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/confused-1.gif");
buttons += emoticonButton("emoticon19", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/blush.gif");
buttons += emoticonButton("emoticon20", "http://i569.photobucket.com/albums/ss139/newryn/emoticon/XD.gif");
        
    buttons += separator();
    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"\\\" height=\\\"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);