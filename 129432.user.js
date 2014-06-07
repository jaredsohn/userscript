// Emoticonsforblogger by Sary Ahd (http://www.saryahd.com)
// Modified with Yahoo emoticons by Sary Ahd (http://www.saryahd.com) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           BloggerEmo Script
// @namespace      http://saryahd.com
// @description    Emoticons For Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("whew", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/whew.gif");
	buttons += emoticonButton("wave", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/wave.gif");
	buttons += emoticonButton("waiting", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/waiting.gif");
	buttons += emoticonButton("thumbsup", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/thumbsup.gif");
	buttons += emoticonButton("thumbsdown", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/thumbsdown.gif");
	buttons += emoticonButton("thinking", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/thinking.gif");
	buttons += emoticonButton("talk to the hand", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/talktothehand.gif");
	buttons += emoticonButton("surprise", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/surprise.gif");
	buttons += emoticonButton("straight face", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/straightface.gif");
	buttons += emoticonButton("sleepy", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/sleepy.gif");
	buttons += emoticonButton("sick", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/sick.gif");
	buttons += emoticonButton("sad", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/sad.gif");
	buttons += emoticonButton("rolling on the floor", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/rollingonthefloor.gif");
	buttons += emoticonButton("rockon", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/rockon.gif");
	buttons += emoticonButton("pirate", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/pirate.gif");
	buttons += emoticonButton("phbbbt", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/phbbbt.gif");
	buttons += emoticonButton("no talking", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/notalking.gif");
	buttons += emoticonButton("nerd", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/nerd.gif");
	buttons += emoticonButton("nailbitting", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/nailbitting.gif");
	buttons += emoticonButton("love struck", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/lovestruck.gif");
	buttons += emoticonButton("loser", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/loser.gif");
	buttons += emoticonButton("laughing", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/laughing.gif");
	buttons += emoticonButton("kiss", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/kiss.gif");
	buttons += emoticonButton("it wasnt me", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/itwasntme.gif");
	buttons += emoticonButton("i dont want to see", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/idontwanttosee.gif");
	buttons += emoticonButton("hurry up", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/hurryup.gif");
	buttons += emoticonButton("happy", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/happy.gif");
	buttons += emoticonButton("devil", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/devil.gif");
	buttons += emoticonButton("day dreaming", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/daydreaming.gif");
	buttons += emoticonButton("confused", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/confused.gif");
	buttons += emoticonButton("call me", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/callme.gif");
	buttons += emoticonButton("blushing", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/blushing.gif");
	buttons += emoticonButton("big hug", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/bighug.gif");
	buttons += emoticonButton("batting eyelashes", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/battingeyelashes.gif");
        buttons += emoticonButton("at wit send", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/atwitsend.gif");
        buttons += emoticonButton("applause", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/applause.gif");
        buttons += emoticonButton("angry", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/angry.gif"); 
        buttons += emoticonButton("angel", "http://i773.photobucket.com/albums/yy17/saryahd/yahooemo/angel.gif");       
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"20\\\" height=\\\"26\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);