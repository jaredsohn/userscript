// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by myra

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Small Kawaii Items for Blog
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
                     
        buttons += emoticonButton("00", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/x1pNWjjkHJ3o_yCiRrSz5SK9WYXEw_WgRxsMCTtSFoHKTTa6WcTQs6fTYAe4jjcf_vixO07WFeFRoVvInRcUX4S8LRpbXqaYoLZz6AH5l5BkzAgodA59cZLPq7KS7GAQZ1I.gif");
buttons += emoticonButton("01", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/x1pNWjjkHJ3o_yCiRrSz5SK9WgmL6EKzpDDSTUSYO8k9umEGtnw--rSQ5weTB0uLXaJ9K15Cs59pl0JYRM1Uz-nSD5yiyMjY95Mb_pOZueLhJSnd5Fkn3lxQ_aiAdp0tC39.gif");
buttons += emoticonButton("02", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/u.jpg");
buttons += emoticonButton("03", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/tv1.png");
buttons += emoticonButton("04", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/thumbrella.gif");
buttons += emoticonButton("05", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/thcf38cfff66928c5e0a9392a3a056443d.gif");
buttons += emoticonButton("06", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/th821724a8948a4438c5a4dff10e85fd02.gif");
buttons += emoticonButton("07", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/pic017demoji_16060317decoojp.gif");
buttons += emoticonButton("08", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/pic016demoji_9439617decoojp.gif");
buttons += emoticonButton("09", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifsbyannyzblog304-1.gif");
buttons += emoticonButton("10", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifsbyannyzblog296-1.gif");
buttons += emoticonButton("11", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifsbyannyzblog289-1.gif");
buttons += emoticonButton("12", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifsbyannyzblog181-1.gif");
buttons += emoticonButton("13", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifsbyannyzblog168-1.gif");
buttons += emoticonButton("14", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifsbyannyzblog157-1.gif");
buttons += emoticonButton("15", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifsbyannyzblog132-1.gif");
buttons += emoticonButton("16", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifsbyannyzblog119-1.gif");
buttons += emoticonButton("17", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifsbyannyzblog110-1.gif");
buttons += emoticonButton("18", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifsbyannyzblog83-1.gif");
buttons += emoticonButton("19", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifsbyannyzblog56-1.gif");
buttons += emoticonButton("20", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifsbyannyzblog49-1.gif");
buttons += emoticonButton("21", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifsbyannyzblog11-1.gif");
buttons += emoticonButton("22", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifsbyannyzblog1-1.gif");
buttons += emoticonButton("23", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifs_annyzblog143-1.gif");
buttons += emoticonButton("24", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/minigifs_annyzblog1-1.gif");
buttons += emoticonButton("25", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/d-1.gif");
buttons += emoticonButton("26", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/cuteminigifbyannyzblog84-1.gif");
buttons += emoticonButton("27", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/cry1-1.png");
buttons += emoticonButton("28", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/annyz_signitos145-1.gif");
buttons += emoticonButton("29", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/annyz_signitos67-1.gif");
buttons += emoticonButton("30", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/1867-1.gif");
buttons += emoticonButton("31", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/597a-1.gif");
buttons += emoticonButton("32", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/596a-1.gif");
buttons += emoticonButton("33", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/564-1.gif");
buttons += emoticonButton("34", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/563-1.gif");
buttons += emoticonButton("35", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/562-1.gif");
buttons += emoticonButton("36", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/561-1.gif");
buttons += emoticonButton("37", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/560-1.gif");
buttons += emoticonButton("38", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/30-1.gif");
buttons += emoticonButton("39", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/45-1.gif");
buttons += emoticonButton("40", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/29-1.gif");
buttons += emoticonButton("41", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/04-1.gif");
buttons += emoticonButton("42", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/03-1.gif");
buttons += emoticonButton("43", "http://i1209.photobucket.com/albums/cc398/myralyle/Kawaii%20Smiley/01-1.gif");
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
