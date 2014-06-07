// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by tuzki (http://wolverinex02.blogspot.com/) 

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
	buttons += emoticonButton("cry", "http://bunnyfairy.com/pic/tuzki/tuzki_001.gif");
	buttons += emoticonButton("watcha", "http://bunnyfairy.com/pic/tuzki/tuzki_002.gif");
	buttons += emoticonButton("toink2", "http://bunnyfairy.com/pic/tuzki/tuzki_003.gif");
	buttons += emoticonButton("left", "http://bunnyfairy.com/pic/tuzki/tuzki_004.gif");
	buttons += emoticonButton("cry", "http://wolverinex02.googlepages.com/icon_cry.gif");
	buttons += emoticonButton("right", "http://bunnyfairy.com/pic/tuzki/tuzki_005.gif");
	buttons += emoticonButton("star", "http://bunnyfairy.com/pic/tuzki/tuzki_006.gif");
	buttons += emoticonButton("confused", "http://bunnyfairy.com/pic/tuzki/tuzki_007.gif");
	buttons += emoticonButton("taichi", "http://bunnyfairy.com/pic/tuzki/tuzki_008.gif");
	buttons += emoticonButton("70an", "http://bunnyfairy.com/pic/tuzki/tuzki_009.gif");
	buttons += emoticonButton("hentak", "http://bunnyfairy.com/pic/tuzki/tuzki_010.gif");
	buttons += emoticonButton("curik2", "http://bunnyfairy.com/pic/tuzki/tuzki_011.gif");
	buttons += emoticonButton("wee", "http://bunnyfairy.com/pic/tuzki/tuzki_012.gif");
	buttons += emoticonButton("ntah", "http://bunnyfairy.com/pic/tuzki/tuzki_013.gif");
	buttons += emoticonButton("die2", "http://bunnyfairy.com/pic/tuzki/tuzki_014.gif");
	buttons += emoticonButton("shock", "http://bunnyfairy.com/pic/tuzki/tuzki_015.gif");
	buttons += emoticonButton("lalalal", "http://bunnyfairy.com/pic/tuzki/tuzki_016.gif");
	buttons += emoticonButton("bye", "http://bunnyfairy.com/pic/tuzki/tuzki_017.gif");
	buttons += emoticonButton("tensen", "http://bunnyfairy.com/pic/tuzki/tuzki_018.gif");
	buttons += emoticonButton("karate", "http://bunnyfairy.com/pic/tuzki/tuzki_019.gif");
	buttons += emoticonButton("music", "http://bunnyfairy.com/pic/tuzki/tuzki_020.gif");
	buttons += emoticonButton("pusing", "http://bunnyfairy.com/pic/tuzki/tuzki_021.gif");
	buttons += emoticonButton("xtahan", "http://bunnyfairy.com/pic/tuzki/tuzki_022.gif");
	buttons += emoticonButton("woh", "http://bunnyfairy.com/pic/tuzki/tuzki_023.gif");
	buttons += emoticonButton("thebest", "http://bunnyfairy.com/pic/tuzki/tuzki_024.gif");
	buttons += emoticonButton("lovey", "http://bunnyfairy.com/pic/tuzki/tuzki_025.gif");	
	buttons += emoticonButton("nit2", "http://bunnyfairy.com/pic/tuzki/tuzki_026.gif");
	buttons += emoticonButton("love", "http://bunnyfairy.com/pic/tuzki/tuzki_027.gif");
	buttons += emoticonButton("eleh", "http://bunnyfairy.com/pic/tuzki/tuzki_028.gif");
	buttons += emoticonButton("blackwhite", "http://bunnyfairy.com/pic/tuzki/tuzki_029.gif");
	buttons += emoticonButton("bangun", "http://bunnyfairy.com/pic/tuzki/tuzki_030.gif");
	buttons += emoticonButton("hingus", "http://bunnyfairy.com/pic/tuzki/tuzki_031.gif");
	buttons += emoticonButton("poyo", "http://bunnyfairy.com/pic/tuzki/tuzki_033.gif");
	buttons += emoticonButton("kiss", "http://bunnyfairy.com/pic/tuzki/tuzki_034.gif");
	buttons += emoticonButton("superman", "http://bunnyfairy.com/pic/tuzki/tuzki_036.gif");
	buttons += emoticonButton("tumbuk", "http://bunnyfairy.com/pic/tuzki/tuzki_037.gif");
	buttons += emoticonButton("fuhh", "http://bunnyfairy.com/pic/tuzki/tuzki_039.gif");
	buttons += emoticonButton("bday", "http://bunnyfairy.com/pic/tuzki/tuzki_032.gif");
	
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