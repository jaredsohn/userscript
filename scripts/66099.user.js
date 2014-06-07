// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by rinku726 (http://rinku726.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kao-anis Marimo Zoro for Blogger
// @namespace      http://rinku726.blogspot.com/
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
	buttons += emoticonButton("Marimo", "http://kaoani.ikilote.net/Tout_en_Vert/001.gif");
	buttons += emoticonButton("Robin", "http://kaoani.ikilote.net/Tout_en_Violet/005.gif");
	buttons += emoticonButton("Chopper", "http://kaoani.ikilote.net/Tout_en_Violet/020.gif");
	buttons += emoticonButton("Marimo Jar", "http://kaoani.ikilote.net/Tout_en_Vert/003.gif");
	buttons += emoticonButton(":)", "http://kaoani.ikilote.net/Les_Cactus/001.gif");
	buttons += emoticonButton(":|", "http://kaoani.ikilote.net/Les_Cactus/003.gif");
	buttons += emoticonButton("Wave", "http://kaoani.ikilote.net/Les_Cactus/004.gif");
	buttons += emoticonButton("Heart", "http://kaoani.ikilote.net/Les_Cactus/005.gif");
	buttons += emoticonButton("Ahh!", "http://kaoani.ikilote.net/Les_Cactus/006.gif");
	buttons += emoticonButton("D:", "http://kaoani.ikilote.net/Les_Cactus/007.gif");
	buttons += emoticonButton("Kanpai", "http://kaoani.ikilote.net/Les_Cactus/008.gif");
	buttons += emoticonButton("Stubborn", "http://kaoani.ikilote.net/Les_Cactus/009.gif");
	buttons += emoticonButton("Lost", "http://kaoani.ikilote.net/Les_Cactus/010.gif");
	buttons += emoticonButton("Kiss", "http://kaoani.ikilote.net/Les_Cactus/011.gif");
	buttons += emoticonButton("Hide", "http://kaoani.ikilote.net/Les_Cactus/012.gif");
	buttons += emoticonButton("T_T", "http://kaoani.ikilote.net/Les_Cactus/013.gif");
	buttons += emoticonButton("^_^", "http://kaoani.ikilote.net/Les_Cactus/014.gif");
	buttons += emoticonButton("Smirk", "http://kaoani.ikilote.net/Les_Cactus/015.gif");
	buttons += emoticonButton("O_O", "http://kaoani.ikilote.net/Les_Cactus/016.gif");
	buttons += emoticonButton("Off", "http://kaoani.ikilote.net/Les_Cactus/017.gif");
	buttons += emoticonButton("Fight", "http://kaoani.ikilote.net/Les_Cactus/018.gif");
	buttons += emoticonButton("Cheers L", "http://kaoani.ikilote.net/Les_Cactus/019.gif");
	buttons += emoticonButton("Cheers R", "http://kaoani.ikilote.net/Les_Cactus/020.gif");
	buttons += emoticonButton("Devil", "http://kaoani.ikilote.net/Les_Cactus/021.gif");
	buttons += emoticonButton("Sweat", "http://kaoani.ikilote.net/Les_Cactus/022.gif");
	buttons += emoticonButton("._o", "http://kaoani.ikilote.net/Les_Cactus/023.gif");
	buttons += emoticonButton("Yay", "http://kaoani.ikilote.net/Les_Cactus/024.gif");
	buttons += emoticonButton("~v~", "http://kaoani.ikilote.net/Les_Cactus/025.gif");
	buttons += emoticonButton("Marimolette", "http://kaoani.ikilote.net/Les_Cactus/026.gif");
	buttons += emoticonButton("Bye", "http://kaoani.ikilote.net/Les_Cactus/027.gif");
	buttons += emoticonButton("Excited", "http://kaoani.ikilote.net/Les_Cactus/028.gif");
					
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