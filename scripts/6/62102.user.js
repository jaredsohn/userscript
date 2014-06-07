// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kawaii Emoticons
// @namespace      http://dieyna-afieyna.blogspot.com/
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
                      
        buttons += emoticonButton("01", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_001.jpg");
buttons += emoticonButton("02", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_002.jpg");
buttons += emoticonButton("03", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_003.jpg");
buttons += emoticonButton("04", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_004.jpg");
buttons += emoticonButton("05", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_005.jpg");
buttons += emoticonButton("06", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_006.jpg");
buttons += emoticonButton("07", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_007.jpg");
buttons += emoticonButton("08", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_008.jpg");
buttons += emoticonButton("09", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_009.jpg");
buttons += emoticonButton("10", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_010.jpg");
buttons += emoticonButton("11", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_011.jpg");
buttons += emoticonButton("12", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_012.jpg");
buttons += emoticonButton("13", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_013.jpg");
buttons += emoticonButton("14", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_014.jpg");
buttons += emoticonButton("15", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_015.jpg");
buttons += emoticonButton("16", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_016.jpg");
buttons += emoticonButton("17", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_017.jpg");
buttons += emoticonButton("18", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_018.jpg");
buttons += emoticonButton("19", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_019.jpg");
buttons += emoticonButton("20", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_020.jpg");
buttons += emoticonButton("21", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_021.jpg");
buttons += emoticonButton("22", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_022.jpg");
buttons += emoticonButton("23", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_023.jpg");
buttons += emoticonButton("24", "http://i569.photobucket.com/albums/ss139/newryn/bibi1004_024.jpg");


        
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