// Modified by Eun Sara Hyun (http://deardiaryeunsarahyun.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Teddy Bear Smiley
// @namespace      http://deardiaryeunsarahyun.blogspot.com/)
// @description    Emoticons in Blogger Only by Eun Dear Diary.com (20)
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("yes", "http://i231.photobucket.com/albums/ee256/liana_ilham/angguk.gif");
	buttons += emoticonButton("bye", "http://i231.photobucket.com/albums/ee256/liana_ilham/bubye.gif");
	buttons += emoticonButton("kiss", "http://i231.photobucket.com/albums/ee256/liana_ilham/flyingkiss.gif");
	buttons += emoticonButton("laugh", "http://i231.photobucket.com/albums/ee256/liana_ilham/gelakbesar.gif");
	buttons += emoticonButton("hihi", "http://i231.photobucket.com/albums/ee256/liana_ilham/gelakperli.gif");
	buttons += emoticonButton("mabuk", "http://i231.photobucket.com/albums/ee256/liana_ilham/mabuk.gif");
	buttons += emoticonButton("menung", "http://i231.photobucket.com/albums/ee256/liana_ilham/menung.gif");
	buttons += emoticonButton("meraung", "http://i231.photobucket.com/albums/ee256/liana_ilham/meraung.gif");
	buttons += emoticonButton("nangis", "http://i231.photobucket.com/albums/ee256/liana_ilham/nangis.gif");
	buttons += emoticonButton("menari", "http://i231.photobucket.com/albums/ee256/liana_ilham/nari.gif");
	buttons += emoticonButton("geleng", "http://i231.photobucket.com/albums/ee256/liana_ilham/nyesal.gif");
	buttons += emoticonButton("pilu", "http://i231.photobucket.com/albums/ee256/liana_ilham/pilu.gif");
	buttons += emoticonButton("pitam", "http://i231.photobucket.com/albums/ee256/liana_ilham/pitam.gif");
	buttons += emoticonButton("sedih", "http://i231.photobucket.com/albums/ee256/liana_ilham/sedih.gif");
	buttons += emoticonButton("senyum", "http://i231.photobucket.com/albums/ee256/liana_ilham/senyum.gif");
	buttons += emoticonButton("tepuk", "http://i231.photobucket.com/albums/ee256/liana_ilham/tepuktangan.gif");
	buttons += emoticonButton("takot", "http://i231.photobucket.com/albums/ee256/liana_ilham/takut.gif");
	buttons += emoticonButton("malu", "http://i231.photobucket.com/albums/ee256/liana_ilham/tersipu.gif");
	buttons += emoticonButton("tido", "http://i231.photobucket.com/albums/ee256/liana_ilham/tidur.gif");
                buttons += emoticonButton(":Oishie:(", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/anigif-2.gif");

    
	buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"50\\\" height=\\\"50\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img width=\"25\" height=\"25\" src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);