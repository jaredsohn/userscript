// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           teddy bear emoticons for Blogger by cottontail graphics
// @namespace      http://wolverine02.blogspot.com/
// @description    These emoticons are linkware from http://cottontailgraphics.com . If you use them you MUST provide a link back to the site somewhere on your blog or website.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
 
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("angelic_bear",  "http://h1.ripway.com/mrsmegmcclure/ctgPE_angelic.gif");
	buttons += emoticonButton("angry_bear",     "http://h1.ripway.com/mrsmegmcclure/ctgPE_angry.gif");
	buttons += emoticonButton("blessed_bear",   "http://h1.ripway.com/mrsmegmcclure/ctgPE_blessed.gif");
	buttons += emoticonButton("blush_bear",     "http://h1.ripway.com/mrsmegmcclure/ctgPE_blush.gif");
	buttons += emoticonButton("happy bear",     "http://h1.ripway.com/mrsmegmcclure/ctgPE_happy.gif ");
	buttons += emoticonButton("loved_bear",     "http://h1.ripway.com/mrsmegmcclure/ctgPE_loved.gif");
	buttons += emoticonButton("nerdy_bear",     "http://h1.ripway.com/mrsmegmcclure/ctgPE_nerdy.gif");
	buttons += emoticonButton("patriotic_bear", "http://h1.ripway.com/mrsmegmcclure/ctgPE_patriotic.gif");
	buttons += emoticonButton("sad_bear",       "http://h1.ripway.com/mrsmegmcclure/ctgPE_sad.gif");
	buttons += emoticonButton("sleepy_bear",    "http://h1.ripway.com/mrsmegmcclure/ctgPE_sleepy.gif");
	buttons += emoticonButton("sweet_bear",     "http://h1.ripway.com/mrsmegmcclure/ctgPE_sweet.gif");
	buttons += emoticonButton("wink_bear",      "http://h1.ripway.com/mrsmegmcclure/ctgPE_wink.gif");
	buttons += emoticonButton("mysterious_bear","http://h1.ripway.com/mrsmegmcclure/ctgPE_mysterious.gif");
	buttons += emoticonButton("nostalgic_bear", "http://h1.ripway.com/mrsmegmcclure/ctgPE_nostalgic.gif");
	buttons += emoticonButton("oops_bear",      "http://h1.ripway.com/mrsmegmcclure/ctgPE_oops.gif");
	buttons += emoticonButton("shocked_bear",   "http://h1.ripway.com/mrsmegmcclure/ctgPE_shocked.gif ");
	buttons += emoticonButton("typing bear",    "http://h1.ripway.com/mrsmegmcclure/ctgPE_typing.gif");
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"45\\\" height=\\\"26\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);


