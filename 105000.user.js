
// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Your Kawaiie Emoticons
// @namespace      alovelyy-monster.blogspot.com
// @description    Use with permission credit back okay?
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
                      

buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i1.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i2.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i3.gif");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i4.gif");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i5.png");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i6.gif");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i7.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i8.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i9.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i10.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i11.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i12.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i13.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i14.gif");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i15.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i16.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i17.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i18.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i19.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i20.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i21.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i22.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i23.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i24.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i25.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i26.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i24.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i27.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i28.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i29.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i30.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i31.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i32.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i34.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i35.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i36.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i37.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i38.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i39.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i40.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i41.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i42.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i43.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i44.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i45.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i46.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i47.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i48.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i49.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i51.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i52.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i54.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i55.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i56.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i57.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i58.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i59.jpg");
buttons += emoticonButton("0", "http://i1237.photobucket.com/albums/ff474/kawaiiyie/EMOTICONS/i60.jpg");























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