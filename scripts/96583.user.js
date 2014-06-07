// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Cahya Prastyanto (http://blogger-emoticon.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger Onion 2.0
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
	
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i29.tinypic.com/s4b62p.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i31.tinypic.com/295wg7o.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i32.tinypic.com/2eyi1d0.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i28.tinypic.com/keu4oo.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i29.tinypic.com/2u74y91.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i26.tinypic.com/6hjgud.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i32.tinypic.com/vi1xxu.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i29.tinypic.com/2pyyu52.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i31.tinypic.com/wrxnhj.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i25.tinypic.com/dlm9s3.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i32.tinypic.com/j8egr5.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i31.tinypic.com/xmnc53.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i30.tinypic.com/4j255g.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i25.tinypic.com/vqkyok.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i30.tinypic.com/24zxe9d.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i26.tinypic.com/6girye.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i26.tinypic.com/1z3t74h.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i28.tinypic.com/16ixhn5.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i25.tinypic.com/2njfwxw.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i32.tinypic.com/biozf4.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i31.tinypic.com/2rm1ceo.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i29.tinypic.com/30sgd8x.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i29.tinypic.com/73grv5.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i25.tinypic.com/34qjn7r.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i31.tinypic.com/2ed782d.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i31.tinypic.com/71ioah.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i27.tinypic.com/2d3las.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i28.tinypic.com/2v16kd2.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i31.tinypic.com/2ihpa1g.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i25.tinypic.com/ixctg5.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i27.tinypic.com/wje2vn.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i29.tinypic.com/aw8e4p.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i27.tinypic.com/332s1v8.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i25.tinypic.com/20sjfow.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i30.tinypic.com/2znzwa9.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i27.tinypic.com/pc5tc.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i31.tinypic.com/2hmq1kw.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i32.tinypic.com/t5sroi.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i29.tinypic.com/tar62h.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i26.tinypic.com/14xovup.jpg");
	
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