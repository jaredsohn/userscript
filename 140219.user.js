// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by myra

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kawaii Blog Dividers
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
                     
        buttons += emoticonButton("00", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/-0001-1.gif");
buttons += emoticonButton("01", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/1716354hq4rsq5c1z.gif");
buttons += emoticonButton("02", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/LcKox.png");
buttons += emoticonButton("03", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/divider.png");
buttons += emoticonButton("04", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/dividers1-1.gif");
buttons += emoticonButton("05", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/graphics-kawaii-small-158436.gif");
buttons += emoticonButton("06", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/kawaii_pastel_star_divider_by_miemie_chan3-d4e9j1k.gif");
buttons += emoticonButton("07", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/ribbonlinejulia.png");
buttons += emoticonButton("08", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/qQVaK.png");
buttons += emoticonButton("09", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/hatibungamass.png");
buttons += emoticonButton("10", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/030.gif");
buttons += emoticonButton("11", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/025.gif");
buttons += emoticonButton("12", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/024.gif");
buttons += emoticonButton("13", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/023.gif");
buttons += emoticonButton("14", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/022.gif");
buttons += emoticonButton("15", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/021.gif");
buttons += emoticonButton("16", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/0174.gif");
buttons += emoticonButton("17", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/0172.gif");
buttons += emoticonButton("18", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/0122-1.gif");
buttons += emoticonButton("19", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/0101-1.gif");
buttons += emoticonButton("20", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/010-1.gif");
buttons += emoticonButton("21", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/007.gif");
buttons += emoticonButton("22", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/0063-1.gif");
buttons += emoticonButton("23", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/0051.gif");
buttons += emoticonButton("24", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/00410-1.gif");
buttons += emoticonButton("25", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/0038.gif");
buttons += emoticonButton("26", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/0032-1.gif");
buttons += emoticonButton("27", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/0014.gif");
buttons += emoticonButton("28", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/634950t7vde8eg7v.gif");
buttons += emoticonButton("29", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/988810crmigg3cwn.gif");
buttons += emoticonButton("30", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/926577lsd714rlb8.gif");
buttons += emoticonButton("31", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/785201zc7yz89xyz.gif");
buttons += emoticonButton("32", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/729331r9xv98dss9.gif");
buttons += emoticonButton("33", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/994472v9j970mrxj.gif");
buttons += emoticonButton("34", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/1139540gpr9bczcla.gif");
buttons += emoticonButton("35", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/1269500lteboezixl.gif");
buttons += emoticonButton("36", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/581880way1k9e19g.gif");
buttons += emoticonButton("37", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/757978daiq2gyo3m.gif");
buttons += emoticonButton("38", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/0084.gif");
buttons += emoticonButton("39", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/0067.gif");
buttons += emoticonButton("40", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/0053.gif");
buttons += emoticonButton("41", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/0056.gif");
buttons += emoticonButton("42", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/0102.gif");
buttons += emoticonButton("43", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/0101.gif");
buttons += emoticonButton("44", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/697577wcowvfyq3s.gif");
buttons += emoticonButton("45", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/1069610u07f8x7p56.gif");
buttons += emoticonButton("46", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/608928odknwa27n6.gif");
buttons += emoticonButton("47", "http://i1209.photobucket.com/albums/cc398/myralyle/Blog%20Divider/1302317rmgvf7jftc.gif");
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