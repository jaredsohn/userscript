// Based on the original emoticonsforblogger by Kuribo
// Modified by myra (http://belog-myra.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Small Kawaii Thingy emoticons part 2
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
                     
        buttons += emoticonButton("1", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_ln63c6y5Dj1qdlkyg.gif");
buttons += emoticonButton("01", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hcccdFiy1qdlkyg.gif");
buttons += emoticonButton("02", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hcc8oe9a1qdlkyg.gif");
buttons += emoticonButton("03", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hcb7R3dD1qdlkyg.gif");
buttons += emoticonButton("emoticon4", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hcajCvtJ1qdlkyg.gif");
buttons += emoticonButton("5", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hcaeZo481qdlkyg.gif");
buttons += emoticonButton("6", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hc9bWgBw1qdlkyg.gif");
buttons += emoticonButton("7", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hdnjZYNQ1qdlkyg.gif");
buttons += emoticonButton("8", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hebvbOlv1qdlkyg.gif");
buttons += emoticonButton("9", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hebgJISm1qdlkyg.gif");
buttons += emoticonButton("10", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hdkbsZlK1qdlkyg.gif");
buttons += emoticonButton("11", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hdjyZWNN1qdlkyg.gif");
buttons += emoticonButton("12", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hdhogKk21qdlkyg.gif");
buttons += emoticonButton("13", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hdmytblS1qdlkyg.gif");
buttons += emoticonButton("14", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hdgdBnE11qdlkyg.gif");
buttons += emoticonButton("15", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hskvRg7E1qdlkyg.gif");
buttons += emoticonButton("16", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hsort9iI1qdlkyg.gif");
buttons += emoticonButton("17", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hsoxbE6B1qdlkyg.gif");
buttons += emoticonButton("18", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hsnpw4q71qdlkyg.gif");
buttons += emoticonButton("19", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2ht2iWGaz1qdlkyg.gif");
buttons += emoticonButton("20", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2ht24ME8s1qdlkyg.gif");
buttons += emoticonButton("21", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2ht21VtHT1qdlkyg.gif");
buttons += emoticonButton("22", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2ht1oSVHs1qdlkyg.gif");
buttons += emoticonButton("23", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2k5btIRQJ1qdlkyg.gif");
buttons += emoticonButton("24", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2k5bp33F71qdlkyg.gif");
buttons += emoticonButton("25", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2k5b8tZL31qdlkyg.gif");
buttons += emoticonButton("26", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2k5a6hKnu1qdlkyg.gif");
buttons += emoticonButton("27", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2k7slz6km1qdlkyg.gif");
buttons += emoticonButton("28", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2k7s9QWBz1qdlkyg.gif");
buttons += emoticonButton("29", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2k7rzqtTh1qdlkyg.gif");
buttons += emoticonButton("30", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2k7s5qj6M1qdlkyg.gif");
buttons += emoticonButton("31", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2k7rs7sih1qdlkyg.gif");
buttons += emoticonButton("32", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2k7rkYRfm1qdlkyg.gif");
buttons += emoticonButton("33", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2k7r3Cn7H1qdlkyg.gif");
buttons += emoticonButton("34", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2k7r086Ei1qdlkyg.gif");
buttons += emoticonButton("35", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2k7qsVg631qdlkyg.gif");
buttons += emoticonButton("36", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2k7qwRAF91qdlkyg.gif");
buttons += emoticonButton("37", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2k7qhD2yi1qdlkyg.gif");
buttons += emoticonButton("38", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2kgbellJd1qdlkyg.gif");
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
