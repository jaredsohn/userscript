// ==UserScript==
// @name           BIBI1004's emoticons
// @namespace      Copyright BIBI1004.com all rights reserved.
// @description    You can use BiBi1004's emoticons in Blogger. You must credit bibi1004.com like this: "Copyright BIBI1004.com all rights reserved."
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton(":omg:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_007.jpg");
	buttons += emoticonButton(":yum:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_020.jpg");
	buttons += emoticonButton(":smile:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_001.jpg");
	buttons += emoticonButton(":happy:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_002.jpg");
	buttons += emoticonButton(":zomg:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_003.jpg");
	buttons += emoticonButton(":love:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_004.jpg");
	buttons += emoticonButton(":aha:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_005.jpg");
	buttons += emoticonButton(":money:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_006.jpg");
	buttons += emoticonButton(":ugh:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_008.jpg");
	buttons += emoticonButton(":ew:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_008.jpg");
	buttons += emoticonButton(":heehee:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_008.jpg");
	buttons += emoticonButton(":drool:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_008.jpg");
	buttons += emoticonButton(":huhu:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_008.jpg");
	buttons += emoticonButton(":fire:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_008.jpg");
	buttons += emoticonButton(":oh:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_008.jpg");
	buttons += emoticonButton(":oops:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_008.jpg");
	buttons += emoticonButton(":mad:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_008.jpg");
	buttons += emoticonButton(":sad:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_008.jpg");
	buttons += emoticonButton(":tongue:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_020.jpg");
	buttons += emoticonButton(":hmph:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_021.jpg");
	buttons += emoticonButton(":kiss:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_022.jpg");
	buttons += emoticonButton(":aww:", "http://i148.photobucket.com/albums/s28/jinxiepop25/bibi1004_023.jpg");
	
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