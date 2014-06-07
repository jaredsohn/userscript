// Based on the original emoticonsforblogger by Kuribo
// Modified by myra (http://belog-myra.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Small Kawaii Thingy emoticons
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
                     
        buttons += emoticonButton("sun", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2fwfi44TL1qdlkyg.gif");
buttons += emoticonButton("mon", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2fwekooqb1qdlkyg.gif");
buttons += emoticonButton("tue", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2fwetPNdh1qdlkyg.gif");
buttons += emoticonButton("wed", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2fweywFnY1qdlkyg.gif");
buttons += emoticonButton("thu", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2fwf3H7Q51qdlkyg.gif");
buttons += emoticonButton("fri", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2fwf9oYsw1qdlkyg.gif");
buttons += emoticonButton("sat", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2fwfeTJPu1qdlkyg.gif");
buttons += emoticonButton("01", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2czypMngy1qdlkyg.gif");
buttons += emoticonButton("02", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2coa4QWOW1qdlkyg.gif");
buttons += emoticonButton("03", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_ln8j7kOd0k1qdlkyg.gif");
buttons += emoticonButton("emoticon4", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_ln63c4ppXc1qdlkyg.gif");
buttons += emoticonButton("5", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_ln8j3vuFCM1qdlkyg.gif");
buttons += emoticonButton("6", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_lna292yFng1qdlkyg.gif");
buttons += emoticonButton("7", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_lna2rqfEAw1qdlkyg.gif");
buttons += emoticonButton("8", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_lna2rlJuCA1qdlkyg.gif");
buttons += emoticonButton("9", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_lna2pszZoP1qdlkyg.gif");
buttons += emoticonButton("10", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_lna2pe03zi1qdlkyg.gif");
buttons += emoticonButton("11", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_lna2pa3a9c1qdlkyg.gif");
buttons += emoticonButton("12", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_lnddq2J7Gb1qdlkyg.gif");
buttons += emoticonButton("13", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2b1pkUmK21qdlkyg.gif");
buttons += emoticonButton("14", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2b227mgdn1qdlkyg.gif");
buttons += emoticonButton("15", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2b21qLN361qdlkyg.gif");
buttons += emoticonButton("16", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2bsg6qVO21qdlkyg.gif");
buttons += emoticonButton("17", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2b28kl1gd1qdlkyg.gif");
buttons += emoticonButton("18", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2b28g2plf1qdlkyg.gif");
buttons += emoticonButton("19", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2b28bLnaE1qdlkyg.gif");
buttons += emoticonButton("20", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2b2vcxNno1qdlkyg.gif");
buttons += emoticonButton("21", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2b2tjwdVn1qdlkyg.gif");
buttons += emoticonButton("22", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2b2tfTZ531qdlkyg.gif");
buttons += emoticonButton("23", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2b2ta3VWC1qdlkyg.gif");
buttons += emoticonButton("24", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2c72pe3d11qdlkyg.gif");
buttons += emoticonButton("25", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2c7wpaYYH1qdlkyg.gif");
buttons += emoticonButton("26", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2ckjdHuj51qdlkyg.gif");
buttons += emoticonButton("27", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2coagkdoE1qdlkyg.gif");
buttons += emoticonButton("28", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2coe0sP7Z1qdlkyg.gif");
buttons += emoticonButton("29", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2efpf8G6Y1qdlkyg.gif");
buttons += emoticonButton("30", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2cq6ivAJ11qdlkyg.gif");
buttons += emoticonButton("31", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2cqeuTljL1qdlkyg.gif");
buttons += emoticonButton("32", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2czylLsox1qdlkyg.gif");
buttons += emoticonButton("33", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2ft9sAEpn1qdlkyg.gif");
buttons += emoticonButton("34", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2fta7GmKJ1qdlkyg.gif");
buttons += emoticonButton("35", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2fvp8KVLD1qdlkyg.gif");
buttons += emoticonButton("36", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2fvnfFQsC1qdlkyg-1.gif");
buttons += emoticonButton("37", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2fvnnCa4c1qdlkyg.gif");
buttons += emoticonButton("38", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2fvnjHG3H1qdlkyg.gif")
;buttons += emoticonButton("39", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2fvnbfC691qdlkyg.gif");
buttons += emoticonButton("40", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2fvn33JsX1qdlkyg.gif");
buttons += emoticonButton("41", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2gttd6lTs1qdlkyg.gif");
buttons += emoticonButton("42", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2hcrkfs0J1qdlkyg.gif");
buttons += emoticonButton("43", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2gw4hHkCh1qdlkyg.gif");
buttons += emoticonButton("44", "http://i1209.photobucket.com/albums/cc398/myralyle/kawaii%20thingy/tumblr_m2gvuqWmCS1qdlkyg.gif");
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
