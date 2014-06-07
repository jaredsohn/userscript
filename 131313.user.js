// Based on the original emoticonsforblogger by Kuribo
// Modified by myra (http://belog-myra.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text
// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Small Kawaii Thingy emoticons part 3
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
                     
        buttons += emoticonButton("1", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/pic003demoji_383502decoojp.gif");
buttons += emoticonButton("2", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/pic000demoji_895649decoojp.gif");
buttons += emoticonButton("3", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/bolinha-rosa.gif");
buttons += emoticonButton("4", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic008demoji_15701325decoojp.gif");
buttons += emoticonButton("5", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/1008954qqr71dvokd.png");
buttons += emoticonButton("6", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/wmxplanhua.gif");
buttons += emoticonButton("7", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic009demoji_16672024decoojp.gif");
buttons += emoticonButton("8", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic003demoji_13413235decoojp.gif");
buttons += emoticonButton("9", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic001demoji_417795decoojp.gif");
buttons += emoticonButton("10", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic017demoji_10418344decoojp-1.gif");
buttons += emoticonButton("11", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic015demoji_12682181decoojp-3.gif");
buttons += emoticonButton("12", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic004demoji_10417803decoojp-1.gif");
buttons += emoticonButton("13", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic010demoji_442126decoojp.gif");
buttons += emoticonButton("14", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/26.gif");
buttons += emoticonButton("15", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/25.gif");
buttons += emoticonButton("16", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/24.gif");
buttons += emoticonButton("17", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/16.gif");
buttons += emoticonButton("18", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/08-1.gif");
buttons += emoticonButton("19", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/06.gif");
buttons += emoticonButton("20", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic011demoji_15889022decoojp.gif");
buttons += emoticonButton("21", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic019demoji_17714269decoojp.gif");
buttons += emoticonButton("22", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic009demoji_12386811decoojp.gif");
buttons += emoticonButton("23", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic012demoji_15496649decoojp-1.gif");
buttons += emoticonButton("24", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/rightclick.png");
buttons += emoticonButton("25", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/dot.jpg");
buttons += emoticonButton("26", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/1446511q6tqqxz6rx.png");
buttons += emoticonButton("27", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/1446501tov71101d6.png");
buttons += emoticonButton("28", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/550425zuhe00ybxt.gif");
buttons += emoticonButton("29", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/thm7.png");
buttons += emoticonButton("30", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/tenki8.gif");
buttons += emoticonButton("31", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/smallheart-pink2.gif");
buttons += emoticonButton("32", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/ku3oj.gif");
buttons += emoticonButton("33", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/i-res33-3.gif");
buttons += emoticonButton("34", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/1008946tm1s3o7sxm1.gif");
buttons += emoticonButton("35", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/1549.gif");
buttons += emoticonButton("36", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/12.png");
buttons += emoticonButton("37", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/2e390dw.gif");
buttons += emoticonButton("38", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/11.gif");
buttons += emoticonButton("39", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic013demoji_15480984decoojp.gif");
buttons += emoticonButton("40", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic012demoji_16065616decoojp-1.gif");
buttons += emoticonButton("41", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic001demoji_404242decoojp-1.gif");
buttons += emoticonButton("42", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Cute%20Thingy%203/16a25a0a.gif");
buttons += emoticonButton("43", "http://i1209.photobucket.com/albums/cc398/myralyle/cute%20acsi%20emote/tumblr_m2hcjmKLUJ1qdlkyg.gif");
buttons += emoticonButton("44", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic019demoji_14776540decoojp.gif");
buttons += emoticonButton("45", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic016demoji_16316757decoojp.gif");
buttons += emoticonButton("46", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic016demoji_16159764decoojp.gif");
buttons += emoticonButton("47", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic014demoji_17229335decoojp.gif");
buttons += emoticonButton("48", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/27.gif");
buttons += emoticonButton("49", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/pic018demoji_16246789decoojp.gif");
buttons += emoticonButton("50", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/bus-pinkhappyy-stop.gif");
buttons += emoticonButton("51", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/51082b97w96e86g1.gif");
buttons += emoticonButton("52", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/xxdf.gif");
buttons += emoticonButton("53", "http://i1209.photobucket.com/albums/cc398/myralyle/Small%20Items/371123my0lmtqeoi.gif");
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