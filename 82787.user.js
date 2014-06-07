// Based on the original emoticonsforblogger by Kel (http://th-p-theory.blogspot.com/2010/08/dortz.html)
// Modified by kel (http://th-p-theory.blogspot.com/) 

// FEATURES
// Works only in Compose modes

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kel for Blogger
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
	
buttons += emoticonButton("1", "http://www.emotasia.com/wp-content/uploads/114.gif");
buttons += emoticonButton("2", "http://www.emotasia.com/wp-content/uploads/25.gif");
buttons += emoticonButton("3", "http://www.emotasia.com/wp-content/uploads/34.gif");
buttons += emoticonButton("4", "http://www.emotasia.com/wp-content/uploads/44.gif");
buttons += emoticonButton("5", "http://www.emotasia.com/wp-content/uploads/54.gif");
buttons += emoticonButton("6", "http://www.emotasia.com/wp-content/uploads/64.gif");
buttons += emoticonButton("7", "http://www.emotasia.com/wp-content/uploads/74.gif");
buttons += emoticonButton("8", "http://www.emotasia.com/wp-content/uploads/84.gif");
buttons += emoticonButton("9", "http://www.emotasia.com/wp-content/uploads/103.gif");
buttons += emoticonButton("10", "http://www.emotasia.com/wp-content/uploads/115.gif");
buttons += emoticonButton("11", "http://www.emotasia.com/wp-content/uploads/123.gif");
buttons += emoticonButton("12", "http://www.emotasia.com/wp-content/uploads/132.gif");
buttons += emoticonButton("13", "http://www.emotasia.com/wp-content/uploads/142.gif");
buttons += emoticonButton("14", "http://www.emotasia.com/wp-content/uploads/152.gif");
buttons += emoticonButton("15", "http://www.emotasia.com/wp-content/uploads/162.gif");
buttons += emoticonButton("16", "http://www.emotasia.com/wp-content/uploads/172.gif");
buttons += emoticonButton("17", "http://www.emotasia.com/wp-content/uploads/181.gif");
buttons += emoticonButton("18", "http://www.emotasia.com/wp-content/uploads/191.gif");
buttons += emoticonButton("19", "http://www.emotasia.com/wp-content/uploads/20.gif");
buttons += emoticonButton("20", "http://www.emotasia.com/wp-content/uploads/211.gif");
buttons += emoticonButton("21", "http://www.emotasia.com/wp-content/uploads/221.gif");
buttons += emoticonButton("22", "http://www.emotasia.com/wp-content/uploads/231.gif");
buttons += emoticonButton("23", "http://www.emotasia.com/wp-content/uploads/241.gif");
buttons += emoticonButton("24", "http://www.emotasia.com/wp-content/uploads/251.gif");
buttons += emoticonButton("25", "http://www.emotasia.com/wp-content/uploads/26.gif");
buttons += emoticonButton("26", "http://www.emotasia.com/wp-content/uploads/27.gif");
buttons += emoticonButton("27", "http://www.emotasia.com/wp-content/uploads/28.gif");
buttons += emoticonButton("28", "http://www.emotasia.com/wp-content/uploads/29.gif");
buttons += emoticonButton("29", "http://www.emotasia.com/wp-content/uploads/30.gif");
buttons += emoticonButton(":)", "http://kaoani.ikilote.net/Les_Anges_(4)/001.gif");
	buttons += emoticonButton(":(", "http://kaoani.ikilote.net/Les_Anges_(4)/002.gif");
	buttons += emoticonButton("Yay", "http://kaoani.ikilote.net/Les_Anges_(4)/003.gif");
	buttons += emoticonButton("Lub", "http://kaoani.ikilote.net/Les_Anges_(4)/004.gif");
	buttons += emoticonButton("Hehe", "http://kaoani.ikilote.net/Les_Anges_(4)/005.gif");
	buttons += emoticonButton("Glide", "http://kaoani.ikilote.net/Les_Anges_(4)/006.gif");
	buttons += emoticonButton("Smirk", "http://kaoani.ikilote.net/Les_Anges_(4)/007.gif");
	buttons += emoticonButton("o.o", "http://kaoani.ikilote.net/Les_Anges_(4)/008.gif");
	buttons += emoticonButton("Sparkle", "http://kaoani.ikilote.net/Les_Anges_(4)/009.gif");
	buttons += emoticonButton("Peace", "http://kaoani.ikilote.net/Les_Anges_(4)/011.gif");
	buttons += emoticonButton("Rub", "http://kaoani.ikilote.net/Les_Anges_(4)/013.gif");
	buttons += emoticonButton("Dizzy", "http://kaoani.ikilote.net/Les_Anges_(4)/014.gif");
	buttons += emoticonButton("Question", "http://kaoani.ikilote.net/Les_Anges_(4)/015.gif");
	buttons += emoticonButton("Write", "http://kaoani.ikilote.net/Les_Anges_(4)/016.gif");
	buttons += emoticonButton("LMAO", "http://kaoani.ikilote.net/Les_Anges_(4)/018.gif");
	buttons += emoticonButton("Cheer", "http://kaoani.ikilote.net/Les_Anges_(4)/019.gif");
	buttons += emoticonButton("Smoke", "http://kaoani.ikilote.net/Les_Anges_(4)/020.gif");
	buttons += emoticonButton("Yawn", "http://kaoani.ikilote.net/Les_Anges_(4)/021.gif");
	buttons += emoticonButton("Clap", "http://kaoani.ikilote.net/Les_Anges_(4)/023.gif");
	buttons += emoticonButton("News", "http://kaoani.ikilote.net/Les_Anges_(4)/031.gif");
	buttons += emoticonButton("Wave", "http://kaoani.ikilote.net/Les_Anges_(4)/032.gif");
	buttons += emoticonButton("Grad", "http://kaoani.ikilote.net/Les_Anges_(4)/033.gif");
	buttons += emoticonButton("Xmas", "http://kaoani.ikilote.net/Les_Anges_(4)/035.gif");
	buttons += emoticonButton("HDance", "http://kaoani.ikilote.net/Les_Anges_(4)/038.gif");
	buttons += emoticonButton("Sweat", "http://kaoani.ikilote.net/Les_Anges_(4)/040.gif");
	buttons += emoticonButton("XI", "http://kaoani.ikilote.net/Les_Anges_(4)/040.gif");
	buttons += emoticonButton("T_T", "http://kaoani.ikilote.net/Les_Anges_(4)/042.gif");
	buttons += emoticonButton("Heh", "http://kaoani.ikilote.net/Les_Anges_(9)/001.gif");
	buttons += emoticonButton(":P", "http://kaoani.ikilote.net/Les_Anges_(9)/003.gif");
	buttons += emoticonButton("Bwahaha", "http://kaoani.ikilote.net/Les_Anges_(9)/004.gif");
	buttons += emoticonButton("x_x", "http://kaoani.ikilote.net/Les_Anges_(9)/005.gif");
	buttons += emoticonButton("Blergh", "http://kaoani.ikilote.net/Les_Anges_(9)/006.gif");
	buttons += emoticonButton(";)", "http://kaoani.ikilote.net/Les_Anges_(9)/007.gif");
	buttons += emoticonButton(">_<", "http://kaoani.ikilote.net/Les_Anges_(9)/009.gif");
	buttons += emoticonButton("o__o", "http://kaoani.ikilote.net/Les_Anges_(9)/012.gif");

	
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