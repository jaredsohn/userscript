// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by myra 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Cute Kawaii Ascii Emoticon part 2
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
                     
       buttons += emoticonButton("01", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%201/tumblr_m539l4RaKP1qb1380.gif");
buttons += emoticonButton("02", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%201/tumblr_m539kzlbr11qb1380.gif");
buttons += emoticonButton("03", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%201/tumblr_m539kvraRp1qb1380.gif");
buttons += emoticonButton("04", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%201/tumblr_m539kiR0AR1qb1380.gif");
buttons += emoticonButton("05", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%201/tumblr_m431ihrif51qdlkyg.gif");
buttons += emoticonButton("06", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%201/tumblr_m431icSPJM1qdlkyg.gif");
buttons += emoticonButton("07", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%201/tumblr_m431hjxFGG1qdlkyg.gif");
buttons += emoticonButton("08", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%201/tumblr_m431gnu5wP1qdlkyg.gif");
buttons += emoticonButton("09", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%201/tumblr_m431h8764s1qdlkyg.gif");
buttons += emoticonButton("10", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/1005175pqsnomvu75.gif");
buttons += emoticonButton("11", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%201/tumblr_m7a397xJ1h1qb1380.gif");
buttons += emoticonButton("12", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%201/tumblr_m4i9etzlQ21qdlkyg.gif");
buttons += emoticonButton("13", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%201/tumblr_m4i9egAZt41qdlkyg.gif");
buttons += emoticonButton("14", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%201/tumblr_m4i9dfqvEa1qdlkyg.gif");
buttons += emoticonButton("15", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%201/tumblr_m2jtw0EIxi1qdlkyg.gif");
buttons += emoticonButton("16", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/123.gif");
buttons += emoticonButton("17", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/x4.png");
buttons += emoticonButton("18", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/x3.png");
buttons += emoticonButton("19", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/themo10.gif");
buttons += emoticonButton("20", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m22803lZbr1qcuqz3.gif");
buttons += emoticonButton("21", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m22807fy341qcuqz3.gif");
buttons += emoticonButton("22", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m227wjgnAh1qcuqz3.gif");
buttons += emoticonButton("23", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m227wobbPE1qcuqz3.gif");
buttons += emoticonButton("24", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m227wtjsh91qcuqz3.gif");
buttons += emoticonButton("25", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m227x1CAZ51qcuqz3.gif");
buttons += emoticonButton("26", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m227xfFUrf1qcuqz3.gif");
buttons += emoticonButton("27", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m227xmoig31qcuqz3.gif");
buttons += emoticonButton("28", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m227y6Ahlc1qcuqz3.gif");
buttons += emoticonButton("29", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m227ybw6gs1qcuqz3.gif");
buttons += emoticonButton("30", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m227z5YVFv1qcuqz3.gif");
buttons += emoticonButton("31", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m227zaSWFR1qcuqz3.gif");
buttons += emoticonButton("32", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m227zgUacZ1qcuqz3.gif");
buttons += emoticonButton("33", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m227zk4YYa1qcuqz3.gif");
buttons += emoticonButton("34", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m227ztTUmv1qcuqz3.gif");
buttons += emoticonButton("35", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%202/tumblr_m227zyiW4i1qcuqz3.gif");
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