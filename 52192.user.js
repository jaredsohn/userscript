// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Monkey emoticons
// @namespace      http://itsmejijie.blogspot.com
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
	
        buttons += emoticonButton("hai", "http://laymark.com/i/m/m057.gif");
        buttons += emoticonButton("wek", "http://laymark.com/i/m/m024.gif");
        buttons += emoticonButton("lala", "http://laymark.com/i/m/m124.gif");
        buttons += emoticonButton("chak", "http://laymark.com/i/m/m111.gif");
        buttons += emoticonButton("makeup", "http://laymark.com/i/m/m164.gif");
        buttons += emoticonButton("gongxi", "http://laymark.com/i/m/m165.gif");
        buttons += emoticonButton("senam", "http://laymark.com/i/m/m010.gif");
        buttons += emoticonButton("shy", "http://laymark.com/i/m/m163.gif");
        buttons += emoticonButton("malu2", "http://laymark.com/i/m/m013.gif");
        buttons += emoticonButton("joget", "http://laymark.com/i/m/m168.gif");
        buttons += emoticonButton("pusing", "http://laymark.com/i/m/m096.gif");
        buttons += emoticonButton("baling", "http://laymark.com/i/m/m045.gif");
        buttons += emoticonButton("witch", "http://laymark.com/i/m/m060.gif");
        buttons += emoticonButton("pang", "http://laymark.com/i/m/m105.gif");
        buttons += emoticonButton("minum", "http://laymark.com/i/m/m109.gif");
        buttons += emoticonButton("masak", "http://laymark.com/i/m/m101.gif");
        buttons += emoticonButton("soal", "http://laymark.com/i/m/m130.gif");
        buttons += emoticonButton("kucing", "http://laymark.com/i/m/m026.gif");
        buttons += emoticonButton("huh", "http://laymark.com/i/m/m051.gif");
        buttons += emoticonButton("ye", "http://laymark.com/i/m/m208.gif");
        buttons += emoticonButton("no", "http://laymark.com/i/m/m049.gif");
        buttons += emoticonButton("marah", "http://laymark.com/i/m/m127.gif");
        buttons += emoticonButton("muah", "http://laymark.com/i/m/m032.gif");
        buttons += emoticonButton("love", "http://laymark.com/i/m/m023.gif");
        buttons += emoticonButton("loveu", "http://laymark.com/i/m/m085.gif");
        buttons += emoticonButton("huu", "http://laymark.com/i/m/m167.gif"); 
        buttons += emoticonButton("huwa", "http://laymark.com/i/m/m085.gif");
     



buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"\\\" height=\\\"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);
