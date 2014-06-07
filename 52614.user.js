// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thejijie (http://itsmejijie.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           SpongeBob & friends
// @namespace      http://itsmejijie.blogspot.com/
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
	buttons += emoticonButton("goyang", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000985_1.gif");
	buttons += emoticonButton("suprise", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000984_1.gif");
        buttons += emoticonButton("ukur", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000983_1.gif");
        buttons += emoticonButton("show", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000914_1.gif");
        buttons += emoticonButton("tiup", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000911_1.gif");
        buttons += emoticonButton("belon", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000912_1.gif");
        buttons += emoticonButton("lari", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000910_1.gif");
        buttons += emoticonButton("joget", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000870_1.gif");
        buttons += emoticonButton("senam", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000869_1.gif");
        buttons += emoticonButton("love", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000867_1.gif");
        buttons += emoticonButton("senam2", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000868_1.gif");
        buttons += emoticonButton("siput", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000846_1.gif");
        buttons += emoticonButton("mabuk", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000845_1.gif");
        buttons += emoticonButton("guling", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000844_1.gif");
        buttons += emoticonButton("sedey", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000805_1.gif");
        buttons += emoticonButton("terkejut", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000804_1.gif");
        buttons += emoticonButton("kecewa", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000803_1.gif");
        buttons += emoticonButton("gembira", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000844_1.gif");
        buttons += emoticonButton("angau", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000801_1.gif");
        buttons += emoticonButton("shock", "http://i11.photobucket.com/albums/a168/evelynregly/th_myAvatar_17000800_1.gif");


			
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