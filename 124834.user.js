// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://belog-myra.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Small Kawaii Emoticons
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
                     
        buttons += emoticonButton("01", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/1052614tptu4qny8m.gif");
buttons += emoticonButton("02", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic013demoji_14134309decoojp.gif");
buttons += emoticonButton("03", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/mini_gifs132-Copy.gif");
buttons += emoticonButton("04", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/mini_gifs100-Copy.gif");
buttons += emoticonButton("05", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/mini2-Copy.png");
buttons += emoticonButton("06", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/titulopost.png");
buttons += emoticonButton("07", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic013demoji_15480984decoojp.gif");
buttons += emoticonButton("08", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic009demoji_16672024decoojp.gif");
buttons += emoticonButton("09", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic005demoji_17695391decoojp.gif");
buttons += emoticonButton("emoticon10", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic003demoji_13413235decoojp.gif");
buttons += emoticonButton("11", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic001demoji_417795decoojp.gif");
buttons += emoticonButton("12", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic017demoji_10418344decoojp-1.gif");
buttons += emoticonButton("13", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic012demoji_16065616decoojp-1.gif");
buttons += emoticonButton("14", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic012demoji_416972decoojp-1.gif");
buttons += emoticonButton("15", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic009demoji_14489638decoojp-1.gif");
buttons += emoticonButton("16", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic004demoji_14147623decoojp-1.gif");
buttons += emoticonButton("17", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic001demoji_16275814decoojp-1.gif");
buttons += emoticonButton("18", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic001demoji_11719347decoojp-1.gif");
buttons += emoticonButton("19", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/28-1.gif");
buttons += emoticonButton("20", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/27.gif");
buttons += emoticonButton("21", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/26.gif");
buttons += emoticonButton("22", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/24.gif");
buttons += emoticonButton("23", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/16.gif");
buttons += emoticonButton("24", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/09.gif");
buttons += emoticonButton("25", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/04.gif");
buttons += emoticonButton("26", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/06.gif");
buttons += emoticonButton("27", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic011demoji_15889022decoojp.gif");
buttons += emoticonButton("28", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic010demoji_13078652decoojp.gif");
buttons += emoticonButton("29", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic010demoji_442126decoojp.gif");
buttons += emoticonButton("30", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic009demoji_14896021decoojp.gif");
buttons += emoticonButton("31", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic009demoji_12386811decoojp.gif");
buttons += emoticonButton("32", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic012demoji_15496649decoojp-1.gif");
buttons += emoticonButton("33", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic016demoji_16316757decoojp.gif");
buttons += emoticonButton("34", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic016demoji_16159764decoojp.gif");
buttons += emoticonButton("35", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic014demoji_17229335decoojp.gif");
buttons += emoticonButton("36", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic011demoji_15430247decoojp.gif");
buttons += emoticonButton("37", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic007demoji_14810207decoojp.gif");
buttons += emoticonButton("38", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/mini-graphics-butterflies-805890.gif");
buttons += emoticonButton("39", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/mini-graphics-bears-087045.gif");
buttons += emoticonButton("40", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/t258273953_12666.gif");
buttons += emoticonButton("41", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/t257422275_49366.gif");
buttons += emoticonButton("42", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/t257393542_44317.gif");
buttons += emoticonButton("43", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pinkheart-in-speakbubble-1.gif");
buttons += emoticonButton("44", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/372342u7ltyjhig3.gif");
buttons += emoticonButton("45", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/xxdf.gif");
buttons += emoticonButton("46", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/umbrellahotpink.gif");
buttons += emoticonButton("47", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/t313603484_37584_5.gif");
buttons += emoticonButton("48", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/thm7.png");
buttons += emoticonButton("49", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/tenki8.gif");
buttons += emoticonButton("50", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/t359436096_16958_6.gif");
buttons += emoticonButton("51", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/i-res33-3.gif");
buttons += emoticonButton("52", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/flower.gif");
buttons += emoticonButton("53", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/donut1.gif");
buttons += emoticonButton("54", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/creambunny_flower.gif");
buttons += emoticonButton("55", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/a4.png");
buttons += emoticonButton("56", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/1062477ybgliska18.gif");
buttons += emoticonButton("57", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/1008946tm1s3o7sxm1.gif");
buttons += emoticonButton("58", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/536400r07nejsqb31.gif");
buttons += emoticonButton("59", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/467966qvyp7ul4zo.gif");
buttons += emoticonButton("60", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/435917mgna5pq4wj.gif");
buttons += emoticonButton("61", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/371123my0lmtqeoi.gif");
buttons += emoticonButton("62", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/51082b97w96e86g1.gif");
buttons += emoticonButton("63", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/1549.gif");
buttons += emoticonButton("64", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/12.png");
buttons += emoticonButton("65", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/2nurcdc.gif");
buttons += emoticonButton("66", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/2e390dw.gif");
buttons += emoticonButton("67", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/29pubtk.gif");
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