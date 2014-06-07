// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Cahya Prastyanto (http://blogger-emoticon.blogspot.com/) 
//Modified by Lawliet (http://club-audition.blogspot.com/)
// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger Audition
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger. Base code by Blogger-Emoticon.blogspot.com, edit by Lawliet Club-Audtion
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/01.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/02.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/03.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/04.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/05.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/06.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/07.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/08.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/09.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/10.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/11.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/12.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/13.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/14.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/15.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/16.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/17.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/18.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/19.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/20.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/21.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/22.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/23.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/24.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/25.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/26.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/27.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/28.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/29.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/30.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/31.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/32.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/33.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/34.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/35.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/36.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/37.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/38.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/39.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i163.photobucket.com/albums/t306/deadkarrot/emoticons/audition/40.png");
	
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