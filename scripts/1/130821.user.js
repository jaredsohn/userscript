// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Nia (http://michaela-nathania.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Tes Emoticon
// @namespace      http://michaela-nathania.blogspot.com
// @description    You can use emoticons in Blogger by michaela-nathania.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";


buttons += emoticonButton("panda-emoticon-05.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-05.gif");
buttons += emoticonButton("panda-emoticon-06.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-06.gif");
buttons += emoticonButton("panda-emoticon-07.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-07.gif");
buttons += emoticonButton("panda-emoticon-08.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-08.gif");
buttons += emoticonButton("panda-emoticon-09.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-09.gif");
buttons += emoticonButton("panda-emoticon-10.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-10.gif");
buttons += emoticonButton("panda-emoticon-11.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-11.gif");
buttons += emoticonButton("panda-emoticon-12.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-12.gif");
buttons += emoticonButton("panda-emoticon-13.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-13.gif");
buttons += emoticonButton("panda-emoticon-14.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-14.gif");
buttons += emoticonButton("panda-emoticon-15.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-15.gif");
buttons += emoticonButton("panda-emoticon-16.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-16.gif");
buttons += emoticonButton("panda-emoticon-17.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-17.gif");
buttons += emoticonButton("panda-emoticon-18.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-18.gif");
buttons += emoticonButton("panda-emoticon-19.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-19.gif");
buttons += emoticonButton("panda-emoticon-20.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-20.gif");
buttons += emoticonButton("panda-emoticon-21.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-21.gif");
buttons += emoticonButton("panda-emoticon-22.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-22.gif");
buttons += emoticonButton("panda-emoticon-23.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-23.gif");
buttons += emoticonButton("panda-emoticon-24.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-24.gif");
buttons += emoticonButton("panda-emoticon-25.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-25.gif");
buttons += emoticonButton("panda-emoticon-26.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-26.gif");
buttons += emoticonButton("panda-emoticon-27.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-27.gif");
buttons += emoticonButton("panda-emoticon-28.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-28.gif");
buttons += emoticonButton("panda-emoticon-29.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-29.gif");
buttons += emoticonButton("panda-emoticon-30.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-30.gif");
buttons += emoticonButton("panda-emoticon-31.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-31.gif");
buttons += emoticonButton("panda-emoticon-32.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-32.gif");
buttons += emoticonButton("panda-emoticon-33.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-33.gif");
buttons += emoticonButton("panda-emoticon-34.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-34.gif");
buttons += emoticonButton("panda-emoticon-35.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-35.gif");
buttons += emoticonButton("panda-emoticon-36.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-36.gif");
buttons += emoticonButton("panda-emoticon-37.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-37.gif");
buttons += emoticonButton("panda-emoticon-38.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-38.gif");
buttons += emoticonButton("panda-emoticon-39.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-39.gif");
buttons += emoticonButton("panda-emoticon-40.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-40.gif");
buttons += emoticonButton("panda-emoticon-41.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-41.gif");
buttons += emoticonButton("panda-emoticon-42.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-42.gif");
buttons += emoticonButton("panda-emoticon-43.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-43.gif");
buttons += emoticonButton("panda-emoticon-44.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-44.gif");
buttons += emoticonButton("panda-emoticon-45.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-45.gif");
buttons += emoticonButton("panda-emoticon-46.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-46.gif");
buttons += emoticonButton("panda-emoticon-47.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-47.gif");
buttons += emoticonButton("panda-emoticon-48.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-48.gif");
buttons += emoticonButton("panda-emoticon-49.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-49.gif");
buttons += emoticonButton("panda-emoticon-50.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-50.gif");
buttons += emoticonButton("panda-emoticon-51.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-51.gif");
buttons += emoticonButton("panda-emoticon-52.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-52.gif");
buttons += emoticonButton("panda-emoticon-53.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-53.gif");
buttons += emoticonButton("panda-emoticon-54.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-54.gif");
buttons += emoticonButton("panda-emoticon-55.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-55.gif");
buttons += emoticonButton("panda-emoticon-56.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-56.gif");
buttons += emoticonButton("panda-emoticon-57.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-57.gif");
buttons += emoticonButton("panda-emoticon-58.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-58.gif");
buttons += emoticonButton("panda-emoticon-59.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-59.gif");
buttons += emoticonButton("panda-emoticon-60.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-60.gif");
buttons += emoticonButton("panda-emoticon-61.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-61.gif");
buttons += emoticonButton("panda-emoticon-62.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-62.gif");
buttons += emoticonButton("panda-emoticon-63.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-63.gif");
buttons += emoticonButton("panda-emoticon-64.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-64.gif");
buttons += emoticonButton("panda-emoticon-65.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-65.gif");
buttons += emoticonButton("panda-emoticon-66.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-66.gif");
buttons += emoticonButton("panda-emoticon-67.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-67.gif");
buttons += emoticonButton("panda-emoticon-68.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-68.gif");
buttons += emoticonButton("panda-emoticon-69.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-69.gif");
buttons += emoticonButton("panda-emoticon-70.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-70.gif");
buttons += emoticonButton("panda-emoticon-71.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-71.gif");
buttons += emoticonButton("panda-emoticon-72.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-72.gif");
buttons += emoticonButton("panda-emoticon-73.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-73.gif");
buttons += emoticonButton("panda-emoticon-74.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-74.gif");
buttons += emoticonButton("panda-emoticon-75.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-75.gif");
buttons += emoticonButton("panda-emoticon-76.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-76.gif");
buttons += emoticonButton("panda-emoticon-77.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-77.gif");
buttons += emoticonButton("panda-emoticon-78.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-78.gif");
buttons += emoticonButton("panda-emoticon-79.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-79.gif");
buttons += emoticonButton("panda-emoticon-80.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-80.gif");
buttons += emoticonButton("panda-emoticon-81.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-81.gif");
buttons += emoticonButton("panda-emoticon-82.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-82.gif");
buttons += emoticonButton("panda-emoticon-83.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-83.gif");
buttons += emoticonButton("panda-emoticon-84.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-84.gif");
buttons += emoticonButton("panda-emoticon-85.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-85.gif");
buttons += emoticonButton("panda-emoticon-86.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-86.gif");
buttons += emoticonButton("panda-emoticon-87.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-87.gif");
buttons += emoticonButton("panda-emoticon-88.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-88.gif");
buttons += emoticonButton("panda-emoticon-89.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-89.gif");
buttons += emoticonButton("panda-emoticon-90.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-90.gif");
buttons += emoticonButton("panda-emoticon-91.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-91.gif");
buttons += emoticonButton("panda-emoticon-92.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-92.gif");
buttons += emoticonButton("panda-emoticon-93.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-93.gif");
buttons += emoticonButton("panda-emoticon-94.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-94.gif");
buttons += emoticonButton("panda-emoticon-95.gifh", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_panda/panda-emoticon-95.gif");



	
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