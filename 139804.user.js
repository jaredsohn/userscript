// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Kiwakinch (http://potatopanic.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger by aneesah-hideway.net
// @namespace      http://potatopanic.blogspot.com
// @description    Blogger emoticons created by aneesah-hideaway.net
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";


	buttons += emoticonButton("yay", "http://i747.photobucket.com/albums/xx114/pootato/icon_yay.gif");
	buttons += emoticonButton("wink", "http://i747.photobucket.com/albums/xx114/pootato/icon_wink.gif");
	buttons += emoticonButton("tongue", "http://i747.photobucket.com/albums/xx114/pootato/icon_tongue.gif");
	buttons += emoticonButton("sweat", "http://i747.photobucket.com/albums/xx114/pootato/icon_sweat.gif");
	buttons += emoticonButton("suspicious", "http://i747.photobucket.com/albums/xx114/pootato/icon_suspicious.gif");
	buttons += emoticonButton("stareyes", "http://i747.photobucket.com/albums/xx114/pootato/icon_stareyes.gif");
	buttons += emoticonButton("smile", "http://i747.photobucket.com/albums/xx114/pootato/icon_smile.gif");
	buttons += emoticonButton("shock", "http://i747.photobucket.com/albums/xx114/pootato/icon_shock.gif");
	buttons += emoticonButton("shakefist", "http://i747.photobucket.com/albums/xx114/pootato/icon_shakefist.gif");
	buttons += emoticonButton("shake", "http://i747.photobucket.com/albums/xx114/pootato/icon_shake.gif");
	buttons += emoticonButton("sad", "http://i747.photobucket.com/albums/xx114/pootato/icon_sad.gif");
	buttons += emoticonButton("rolleyes", "http://i747.photobucket.com/albums/xx114/pootato/icon_rolleyes.gif");
	buttons += emoticonButton("nod", "http://i747.photobucket.com/albums/xx114/pootato/icon_nod.gif");
	buttons += emoticonButton("mouthshut", "http://i747.photobucket.com/albums/xx114/pootato/icon_mouthshut.gif");
	buttons += emoticonButton("mad", "http://i747.photobucket.com/albums/xx114/pootato/icon_mad.gif");
	buttons += emoticonButton("lol", "http://i747.photobucket.com/albums/xx114/pootato/icon_lol.gif");
	buttons += emoticonButton("hmm", "http://i747.photobucket.com/albums/xx114/pootato/icon_hmm.gif");
	buttons += emoticonButton("hehe", "http://i747.photobucket.com/albums/xx114/pootato/icon_hehe.gif");
	buttons += emoticonButton("heart", "http://i747.photobucket.com/albums/xx114/pootato/icon_heart.gif");
	buttons += emoticonButton("eek", "http://i747.photobucket.com/albums/xx114/pootato/icon_eek.gif");
	buttons += emoticonButton("dance", "http://i747.photobucket.com/albums/xx114/pootato/icon_dance.gif");
	buttons += emoticonButton("cute", "http://i747.photobucket.com/albums/xx114/pootato/icon_cute.gif");
    buttons += emoticonButton("cry", "http://i747.photobucket.com/albums/xx114/pootato/icon_cry.gif");
	buttons += emoticonButton("confused", "http://i747.photobucket.com/albums/xx114/pootato/icon_confused.gif");
	buttons += emoticonButton("clap", "http://i747.photobucket.com/albums/xx114/pootato/icon_clap.gif");
	buttons += emoticonButton("cheek", "http://i747.photobucket.com/albums/xx114/pootato/icon_cheek.gif");
	buttons += emoticonButton("buckteeth", "http://i747.photobucket.com/albums/xx114/pootato/icon_buckteeth.gif");
	buttons += emoticonButton("boogie", "http://i747.photobucket.com/albums/xx114/pootato/icon_boogie.gif");
	buttons += emoticonButton("blank", "http://i747.photobucket.com/albums/xx114/pootato/icon_blank.gif");
	buttons += emoticonButton("biggrin", "http://i747.photobucket.com/albums/xx114/pootato/icon_biggrin.gif");


	
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