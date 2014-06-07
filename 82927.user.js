// Based on the original kelo4o81o (http://th-p-theory.blogspot.com/2010/08/dortz.html)
// Modified by kel (http://th-p-theory.blogspot.com/) 

// FEATURES
// Works only in Compose modes

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kel o4o81o
// @namespace      http://th-p-theory.blogspot.com/
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
	
buttons += emoticonButton("01", "http://www.kaziri.jp/~tomo/icon/umikawa/kani06.gif");
buttons += emoticonButton("02", "http://blessed-luv.vilabol.uol.com.br/browncute.gif");
buttons += emoticonButton("03", "http://blessed-luv.vilabol.uol.com.br/brownangry.gif");
buttons += emoticonButton("04", "http://blessed-luv.vilabol.uol.com.br/brownconfuse.gif");
buttons += emoticonButton("05", "http://blessed-luv.vilabol.uol.com.br/browncrying.gif");
buttons += emoticonButton("06", "http://blessed-luv.vilabol.uol.com.br/borwnsmile.gif");
buttons += emoticonButton("07", "http://blessed-luv.vilabol.uol.com.br/brownhappy.gif");
buttons += emoticonButton("08", "http://blessed-luv.vilabol.uol.com.br/brownlove.gif");
buttons += emoticonButton("09", "http://blessed-luv.vilabol.uol.com.br/brownomg.gif");
buttons += emoticonButton("010", "http://blessed-luv.vilabol.uol.com.br/brownsad.gif");
buttons += emoticonButton("011", "http://blessed-luv.vilabol.uol.com.br/brownquestion.gif");
buttons += emoticonButton("012", "http://blessed-luv.vilabol.uol.com.br/brownexclamation.gif");

buttons += emoticonButton("013", "http://blessed-luv.vilabol.uol.com.br/emo41.gif");
buttons += emoticonButton("014", "http://blessed-luv.vilabol.uol.com.br/emo42.gif");
buttons += emoticonButton("015", "http://blessed-luv.vilabol.uol.com.br/emo43.gif");
buttons += emoticonButton("016", "http://blessed-luv.vilabol.uol.com.br/emo44.gif");
buttons += emoticonButton("017", "http://blessed-luv.vilabol.uol.com.br/emo46.gif");
buttons += emoticonButton("018", "http://blessed-luv.vilabol.uol.com.br/emo47.gif");
buttons += emoticonButton("019", "http://blessed-luv.vilabol.uol.com.br/milk1.gif");
buttons += emoticonButton("020", "http://blessed-luv.vilabol.uol.com.br/milk2.gif");
buttons += emoticonButton("021", "http://blessed-luv.vilabol.uol.com.br/milk3.gif");
buttons += emoticonButton("022", "http://blessed-luv.vilabol.uol.com.br/milk4.gif");
buttons += emoticonButton("023", "http://blessed-luv.vilabol.uol.com.br/milk5.gif");
buttons += emoticonButton("024", "http://blessed-luv.vilabol.uol.com.br/milk7.gif");
buttons += emoticonButton("025", "http://blessed-luv.vilabol.uol.com.br/milk6.gif");
buttons += emoticonButton("026", "http://blessed-luv.vilabol.uol.com.br/milk8.gif");
buttons += emoticonButton("027", "http://blessed-luv.vilabol.uol.com.br/milk9.gif");
buttons += emoticonButton("028", "http://blessed-luv.vilabol.uol.com.br/milk10.gif");
buttons += emoticonButton("029", "http://blessed-luv.vilabol.uol.com.br/milk11.gif");
buttons += emoticonButton("030", "http://blessed-luv.vilabol.uol.com.br/milk12.gif");

buttons += emoticonButton("031", "http://www.missvhome.com/material/icon_d/face/face_04_a01.gif");
buttons += emoticonButton("032", "http://www.missvhome.com/material/icon_d/face/face_04_a02.gif");
buttons += emoticonButton("033", "http://www.missvhome.com/material/icon_d/face/face_04_a03.gif");
buttons += emoticonButton("034", "http://www.missvhome.com/material/icon_d/face/face_04_a04.gif");
buttons += emoticonButton("035", "http://www.missvhome.com/material/icon_d/face/face_04_a05.gif");
buttons += emoticonButton("036", "http://www.missvhome.com/material/icon_d/face/face_04_a06.gif");
buttons += emoticonButton("037", "http://www.missvhome.com/material/icon_d/face/face_04_a07.gif");
buttons += emoticonButton("038", "http://www.missvhome.com/material/icon_d/face/face_04_a08.gif");
buttons += emoticonButton("039", "http://www.missvhome.com/material/icon_d/face/face_04_a09.gif");
buttons += emoticonButton("040", "http://www.missvhome.com/material/icon_d/face/face_04_a11.gif");
buttons += emoticonButton("041", "http://www.missvhome.com/material/icon_d/face/face_04_a10.gif");
buttons += emoticonButton("042", "http://www.missvhome.com/material/icon_d/face/face_04_a12.gif");
buttons += emoticonButton("043", "http://www.missvhome.com/material/icon_d/mini/mini04_a27.gif");

buttons += emoticonButton("044", "http://www.geocities.jp/choco_asa/img/icon/emoji/04/02_01.gif");
buttons += emoticonButton("045", "http://www.geocities.jp/choco_asa/img/icon/emoji/04/02_02.gif");
buttons += emoticonButton("046", "http://www.geocities.jp/choco_asa/img/icon/emoji/04/02_11.gif");
buttons += emoticonButton("047", "http://www.geocities.jp/choco_asa/img/icon/emoji/04/02_13.gif");
buttons += emoticonButton("048", "http://www.geocities.jp/choco_asa/img/icon/emoji/04/02_14.gif");
buttons += emoticonButton("049", "http://www.geocities.jp/choco_asa/img/icon/heart/01/1-03.gif");
buttons += emoticonButton("050", "http://www.geocities.jp/choco_asa/img/icon/heart/01/1-12.gif");

buttons += emoticonButton("051", "http://www.geocities.jp/choco_asa/img/icon/one/01/p03.gif");
buttons += emoticonButton("052", "http://www.geocities.jp/choco_asa/img/icon/one/01/02-02.gif");
buttons += emoticonButton("053", "http://www.geocities.jp/choco_asa/img/icon/one/01/02-12.gif");
buttons += emoticonButton("054", "http://www.geocities.jp/choco_asa/img/icon/one/01/p40.gif");
buttons += emoticonButton("055", "http://i198.photobucket.com/albums/aa135/chocobazz/py43.gif");
	
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