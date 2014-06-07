// Based on the original emoticonsforblogger by Kao-Ani (http://www.kao-ani.com/)
// Modified by Astriedz (http://ciedolicious.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger
// @namespace      http://www.kao-ani.com/
// @description    You can use emoticons in Blogger.
// @include *blogger.com/comment.g*
// @include *blogger.com/comment.do
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("surprised", "http://farm2.static.flickr.com/1220/1445635985_3d7694b56a_o.gif");
	buttons += emoticonButton("wink", "http://farm2.static.flickr.com/1325/1445636065_18d8d88426_o.gif");
	buttons += emoticonButton("unhappy", "http://farm2.static.flickr.com/1252/1445635917_ae215ea410_o.gif");
	buttons += emoticonButton("sleepy", "http://farm2.static.flickr.com/1335/1445635857_aff33e074d_o.gif");
	buttons += emoticonButton("no", "http://farm2.static.flickr.com/1043/1446497154_bc8bb9b088_o.gif");
	buttons += emoticonButton("love", "http://farm2.static.flickr.com/1076/1446497100_9344cbbe65_o.gif");
	buttons += emoticonButton("mad", "http://farm2.static.flickr.com/1072/1445635603_e0208e8f0c_o.gif");
	buttons += emoticonButton("happy", "http://farm2.static.flickr.com/1252/1445635563_dff9287050_o.gif");
	buttons += emoticonButton("laughing", "http://farm2.static.flickr.com/1007/1445635505_678391ed5b_o.gif");
        buttons += emoticonButton("cry", "http://farm2.static.flickr.com/1132/1446496880_2496e72bd1_o.gif");
	buttons += emoticonButton("cool", "http://farm2.static.flickr.com/1213/1445635415_6a3d26b96b_o.gif");
	buttons += emoticonButton("confused", "http://farm2.static.flickr.com/1100/1446496802_2b4def8f06_o.gif");
	buttons += emoticonButton("angry", "http://farm2.static.flickr.com/1103/1446496706_7b00336eaa_o.gif");
	buttons += emoticonButton("oops", "http://farm2.static.flickr.com/1249/1446497256_af06f59517_o.gif");
	

			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"27\\\" height=\\\"16\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);