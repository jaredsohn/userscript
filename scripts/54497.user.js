// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Benazio (http://www.benablog.com)

// remember by using this script, in some case you can't press the 'Font' and 'fontsize'.
// disabled the script before changing the font/fontsize

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Benamoticons for Blogger
// @namespace      http://www.benablog.com
// @description    You can use Benamoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("benamikir", "http://benablog.com/images/benamoticons/benamikir.gif");
	buttons += emoticonButton("benabengong", "http://benablog.com/images/benamoticons/bengong.gif");
	buttons += emoticonButton("benadadah", "http://benablog.com/images/benamoticons/dadah.gif");
	buttons += emoticonButton("benahiaha", "http://benablog.com/images/benamoticons/hiaha.gif");
	buttons += emoticonButton("benahiahaha", "http://benablog.com/images/benamoticons/hiahaha.gif");
	buttons += emoticonButton("benakaget", "http://benablog.com/images/benamoticons/kaget.gif");
	buttons += emoticonButton("benakiss", "http://benablog.com/images/benamoticons/kiss.gif");
	buttons += emoticonButton("benamalu", "http://benablog.com/images/benamoticons/malu.gif");
	buttons += emoticonButton("benamarah", "http://benablog.com/images/benamoticons/marah.gif");
	buttons += emoticonButton("benametal", "http://benablog.com/images/benamoticons/metal.gif");
	buttons += emoticonButton("benanangis", "http://benablog.com/images/benamoticons/nangis.gif");
	buttons += emoticonButton("benangantuk", "http://benablog.com/images/benamoticons/ngantuk.gif");
	buttons += emoticonButton("benashock", "http://benablog.com/images/benamoticons/shocking.gif");
	buttons += emoticonButton("benasip", "http://benablog.com/images/benamoticons/sip2.gif");
	buttons += emoticonButton("benangupil", "http://benablog.com/images/benamoticons/upil.gif");


	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);