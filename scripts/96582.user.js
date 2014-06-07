// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Cahya Prastyanto (http://blogger-emoticon.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger Baifu 2.0
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger. by Blogger-Emoticon.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i35.tinypic.com/nfife9.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i34.tinypic.com/rcsy00.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i34.tinypic.com/26o38.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i34.tinypic.com/15f5e0k.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i38.tinypic.com/2m5i0wk.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i38.tinypic.com/1evq80.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i34.tinypic.com/2lscr2r.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i33.tinypic.com/2ibm1wl.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i37.tinypic.com/2gwgdqr.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i38.tinypic.com/348gkmo.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i33.tinypic.com/35lubrs.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i38.tinypic.com/8wjv51.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i38.tinypic.com/2h37jx3.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i33.tinypic.com/2ivmx01.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i33.tinypic.com/e9byo7.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i37.tinypic.com/33ark3p.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i33.tinypic.com/u8wpj.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i35.tinypic.com/bhez2u.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i34.tinypic.com/35dc7wz.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i33.tinypic.com/102k0t0.jpg");
	
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