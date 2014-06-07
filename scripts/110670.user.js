// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Cahya Prastyanto (http://blogger-emoticon.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger 1.0
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
	
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img819.imageshack.us/img819/2976/smilet.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img220.imageshack.us/img220/9402/innocentu.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img408.imageshack.us/img408/3875/cryr.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img822.imageshack.us/img822/6194/happye.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img440.imageshack.us/img440/6834/cutekissk.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img233.imageshack.us/img233/5992/duhmoron.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img257.imageshack.us/img257/3492/unsuren.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img257.imageshack.us/img257/8827/irritatedx.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img143.imageshack.us/img143/5475/evilw.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img97.imageshack.us/img97/3628/lulzl.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img196.imageshack.us/img196/2484/tonguex.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img806.imageshack.us/img806/343/blush.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img542.imageshack.us/img542/7325/disappointed.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img803.imageshack.us/img803/6870/disgusted.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img7.imageshack.us/img7/3681/duhh.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img534.imageshack.us/img534/6155/evilsmile.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img193.imageshack.us/img193/9649/grini.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img27.imageshack.us/img27/627/killyou.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img52.imageshack.us/img52/3204/kissff.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img269.imageshack.us/img269/3970/madb.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img600.imageshack.us/img600/2872/notpleased.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img171.imageshack.us/img171/4800/omgno.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img594.imageshack.us/img594/6661/panicz.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img195.imageshack.us/img195/6051/unhappy.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img856.imageshack.us/img856/8214/sadd.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img850.imageshack.us/img850/3700/shockedr.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img842.imageshack.us/img842/1926/sleepyb.gif");
	buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://img835.imageshack.us/img835/4374/adorablefacesheart.gif");
	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: inline;\" class=\"vertbar\"><span style=\"display: inline;\" class=\"g\">&nbsp;</span><span style=\"display: inline;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);