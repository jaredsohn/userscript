// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by astrid(http://astridaday.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger
// @namespace      http://www.kuribo.info/
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
	buttons += emoticonButton("alarm", "http://farm3.static.flickr.com/2253/2415591718_d38bdeee0e_o.gif");
	buttons += emoticonButton("angry", "http://farm3.static.flickr.com/2261/2414769315_f58f20eb61_o.gif");
	buttons += emoticonButton("cry", "http://farm4.static.flickr.com/3262/2415591826_9f80ea7bd7_o.gif");
	buttons += emoticonButton("dissapointed", "http://farm3.static.flickr.com/2392/2415591872_8326049b25_o.gif");
	buttons += emoticonButton("crazy", "http://farm3.static.flickr.com/2354/2414769453_0734ee3cd7_o.gif");
	buttons += emoticonButton("cute", "http://farm4.static.flickr.com/3059/2415591922_cde4811143_o.gif");
	buttons += emoticonButton("furios", "http://farm3.static.flickr.com/2081/2415592020_eaff36cb54_o.gif");
	buttons += emoticonButton("huh", "http://farm3.static.flickr.com/2045/2414769655_f70edcfa11_o.gif");
	buttons += emoticonButton("happy", "http://farm3.static.flickr.com/2025/2415592112_93ab62b64d_o.gif");
	buttons += emoticonButton("love", "http://farm3.static.flickr.com/2091/2414769755_8b1c96c858_o.gif");
	buttons += emoticonButton("nerdy", "http://farm3.static.flickr.com/2178/2415592208_66efd7c5a7_o.gif");
	buttons += emoticonButton("shocked", "http://farm4.static.flickr.com/3117/2415592250_3bd7b812f1_o.gif");
	buttons += emoticonButton("sick", "http://farm4.static.flickr.com/3105/2414769907_9be10590dc_o.gif");
	buttons += emoticonButton("sad", "http://farm3.static.flickr.com/2264/2414769939_dfd998382e_o.gif");
	buttons += emoticonButton("sleepy", "http://farm3.static.flickr.com/2317/2415592384_c24bb35c9e_o.gif");
	buttons += emoticonButton("tounge", "http://farm3.static.flickr.com/2007/2414770073_f7e3b2a590_o.gif");
	buttons += emoticonButton("whoo", "http://farm3.static.flickr.com/2204/2414770155_f4ae677def_o.gif");
	buttons += emoticonButton("superhappy", "http://farm4.static.flickr.com/3076/2414770197_ed70780036_o.gif");
	buttons += emoticonButton("wink", "http://farm4.static.flickr.com/3173/2415592638_a23c7782d4_o.gif");
	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"15\\\" height=\\\"15\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);