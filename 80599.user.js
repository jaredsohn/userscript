// Based on the original emoticonsforblogger by Kuribo 

(http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by jeanuuu (http://fetish-secret.info/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Marie Smileys III
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


	buttons += emoticonButton("01", "http://i47.tinypic.com/1zxoap3.gif");
	buttons += emoticonButton("02", "http://i45.tinypic.com/23r5vn.gif");
	buttons += emoticonButton("03", "http://i45.tinypic.com/2drgm06.gif");
	buttons += emoticonButton("04", "http://i45.tinypic.com/2wf8q5k.gif");
	buttons += emoticonButton("05", "http://i50.tinypic.com/21o81gj.gif");
	buttons += emoticonButton("06", "http://i45.tinypic.com/o7n9k6.gif");
	buttons += emoticonButton("07", "http://i45.tinypic.com/2v0o7b8.gif");
	buttons += emoticonButton("08", "http://i50.tinypic.com/8x3n84.gif");
	buttons += emoticonButton("09", "http://i47.tinypic.com/23jmr6r.gif");
	buttons += emoticonButton("10", "http://i48.tinypic.com/2qleset.gif");
	buttons += emoticonButton("11", "http://i45.tinypic.com/67k21t.gif");
	buttons += emoticonButton("12", "http://i48.tinypic.com/33kggat.gif");
	buttons += emoticonButton("13", "http://i46.tinypic.com/n1aryc.gif");
	buttons += emoticonButton("14", "http://i47.tinypic.com/vzwiz7.gif");
	buttons += emoticonButton("15", "http://i46.tinypic.com/10ol7kp.gif");
	buttons += emoticonButton("16", "http://i47.tinypic.com/iciexc.gif");
	buttons += emoticonButton("17", "http://i45.tinypic.com/2k561.gif");
	buttons += emoticonButton("18", "http://i46.tinypic.com/102ldec.gif");
	buttons += emoticonButton("19", "http://i46.tinypic.com/102ldec.jpgf");
	buttons += emoticonButton("20", "http://i50.tinypic.com/9sgy7r.gif");

			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + 

"' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' 

onmousedown='CheckFormatting(event);(function() {var rich_edit = 

document.getElementById(\"richeditorframe\");var rich_body = 

rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  

class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"15\\\" height=\\\"15\\\" alt=\\\"" + 

name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url 

+ "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" 

class=\"g\">&nbsp;</span><span style=\"display: block;\" 

class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);