// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Arif Ilham (http://www.bluefee.co.cc/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Red Fox Emoticons untuk (for) Old blogger editor..... by BF
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger. by www.bluefee.co.cc
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox001.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox002.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox003.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox004.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox005.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox006.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox007.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox008.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox009.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox010.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox011.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox012.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox013.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox014.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox015.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox016.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox017.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox018.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox019.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox020.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox021.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox022.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox023.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox024.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox025.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox026.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox027.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox028.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox029.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox030.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox031.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox032.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox033.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox034.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox035.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox036.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox037.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox038.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox039.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox040.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox041.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox042.GIF");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox043.gif");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox044.gif");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox045.gif");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox046.gif");
buttons += emoticonButton("Red Fox Emo BF", "http://cool-emoticons.com/rwx_gallery/EM_Red_Fox047.gif");






	
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