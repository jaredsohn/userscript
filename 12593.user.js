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
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("glee", "http://farm4.static.flickr.com/3144/2414753301_80ffe0b732_o.gif");
buttons += emoticonButton("heart", "http://farm4.static.flickr.com/3168/2415575714_c2993768a2_o.gif");
buttons += emoticonButton("pissed", "http://farm3.static.flickr.com/2277/2415575764_2955fb6a1b_o.gif ");
buttons += emoticonButton("sad", "http://farm3.static.flickr.com/2102/2415575798_a6e566990f_o.gif ");
buttons += emoticonButton("shock", "http://farm4.static.flickr.com/3150/2414753425_169bbc9bd6_o.gif");
buttons += emoticonButton("smile", "http://farm3.static.flickr.com/2116/2415575856_423ea927aa_o.gif");
buttons += emoticonButton("sorry", "http://farm4.static.flickr.com/3105/2414753495_4e19090c12_o.gif ");
buttons += emoticonButton("tongue", "http://farm4.static.flickr.com/3233/2415575910_36d99b5390_o.gif");
buttons += emoticonButton("xo", "http://farm3.static.flickr.com/2196/2415575920_43874e4f1b_o.gif");
buttons += emoticonButton("wink", "http://farm3.static.flickr.com/2101/2415575956_53370aefcc_o.gif");
buttons += emoticonButton("yawn", "http://farm4.static.flickr.com/3279/2414753603_8e345a94b9_o.gif");
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"18\\\" height=\\\"15\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);