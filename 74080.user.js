// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Cahya Prastyanto (http://blogger-emoticon.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger part1
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
	

buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/hihi.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/hehe.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/hehe-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/handphone.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/hand.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/gurl.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/grr.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/9.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/frog.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/flower.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/eat.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/cry-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/cryoutloud.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/crown.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/cancel.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/cake.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/butterfly.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/boy.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/blur.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/bleh.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/bleauk.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/bee.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/angry.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/8.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/7.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/72.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/6.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/5.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/4.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/43-Copy.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/3.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/2.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/22-Copy-Copy.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/15.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/14.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/13.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/12.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/11.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/dbb584dc.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/girl.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/what.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/water.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/wa.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/uh.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/this.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/tata.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/sweat.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/star.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/speechless-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/snap.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/smile-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/shock.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/shit.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/pff.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/sad-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/paw.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/oi.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/ohno.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/noway.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/mad.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/love.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/lol-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/lalala.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/inlove.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/hungry.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/hot.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/Untitledpicture.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/Untitledpicture2.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/IDK.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/zzz.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/wrong.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/write.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/why.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/004.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/133.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/086.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/131.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/053.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/angry-2.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/love-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/happy.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/happy1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/singing.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/beadyeyed.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/laughing1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/cry-1-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/058.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/135.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/023.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/025.gif");

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