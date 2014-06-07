// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 

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
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg526/scaled.php?server=526&filename=63jpgb.jpg&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg156/scaled.php?server=156&filename=blesh.gif&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg138/scaled.php?server=138&filename=emo10gif.gif&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg205/scaled.php?server=205&filename=cries.jpg&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg138/scaled.php?server=138&filename=34957355.gif&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg232/scaled.php?server=232&filename=boing.jpg&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg101/scaled.php?server=101&filename=120gif.gif&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg171/scaled.php?server=171&filename=022gif.gif&res=gal");
	buttons += emoticonButton("smiley1", "http://img375.imageshack.us/i/93900337.gif/");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg196/scaled.php?server=196&filename=60315439.gif&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg412/scaled.php?server=412&filename=019gif.gif&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg21/scaled.php?server=21&filename=18054738.gif&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg179/scaled.php?server=179&filename=47334887.gif&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg441/scaled.php?server=441&filename=10i9natjpggif.gif&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg14/scaled.php?server=14&filename=50331972.gif&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg227/scaled.php?server=227&filename=70576679.gif&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg709/scaled.php?server=709&filename=122it.png&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg411/scaled.php?server=411&filename=113o.png&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg571/scaled.php?server=571&filename=77613089.png&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg688/scaled.php?server=688&filename=18272328.gif&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg15/scaled.php?server=15&filename=80927300.gif&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg525/scaled.php?server=525&filename=36481203.gif&res=gal");
	buttons += emoticonButton("smiley1", "http://triton.imageshack.us/Himg248/scaled.php?server=248&filename=141t.png&res=gal");
			
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