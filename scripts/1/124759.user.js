// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modificado por annyz-chan (www.annyz-kawaii.blogspot.com) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           annyz blog (3)
// @namespace      http://www.annyz-kawaii.blogspot.com
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
                      
buttons += emoticonButton("emoticon01", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos24.gif");
buttons += emoticonButton("emoticon02", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos96.gif");
buttons += emoticonButton("emoticon03", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/moitos_kawaii74.gif");
buttons += emoticonButton("emoticon04", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos133.gif");
buttons += emoticonButton("emoticon05", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos68.gif");
buttons += emoticonButton("emoticon06", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos76.gif");
buttons += emoticonButton("emoticon07", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos30.gif");
buttons += emoticonButton("emoticon08", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos87.gif");
buttons += emoticonButton("emoticon09", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos134.gif");
buttons += emoticonButton("emoticon10", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos92.gif");
buttons += emoticonButton("emoticon11", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos124.gif");
buttons += emoticonButton("emoticon12", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos15.gif");
buttons += emoticonButton("emoticon13", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos19.gif");
buttons += emoticonButton("emoticon14", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos6.gif");
buttons += emoticonButton("emoticon15", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos7.gif");
buttons += emoticonButton("emoticon16", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos10.gif");
buttons += emoticonButton("emoticon17", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos114.gif");
buttons += emoticonButton("emoticon18", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos64.gif");
buttons += emoticonButton("emoticon19", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos33.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos37.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos46.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos99.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos61.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos38.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos36.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos51.gif");
buttons += emoticonButton("emoticon20", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog56.gif");
buttons += emoticonButton("emoticon20", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog11.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog1.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog106.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos85.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos75.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos67.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos86.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/moitos_kawaii81.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos123.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/ositos_gatitos17.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog144.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog155.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/minigifs_annyzblog124.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/moitos_kawaii61.gif");
buttons += emoticonButton("emoticon20", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog263.gif");
buttons += emoticonButton("emoticon20", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog304.gif");
buttons += emoticonButton("emoticon20", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog119.gif");
buttons += emoticonButton("emoticon20", "http://i1190.photobucket.com/albums/z449/_KawaiiCherryCupCake_/Annyz_Blog/minigifsbyannyzblog265.gif");
buttons += emoticonButton("emoticon20", "http://i257.photobucket.com/albums/hh205/xoxojays/smilies/fairy/pic019demoji_16892713decoojp.gif");
buttons += emoticonButton("emoticon20", "http://i257.photobucket.com/albums/hh205/xoxojays/smilies/fairy/pic000demoji_16453292decoojp.gif");
buttons += emoticonButton("emoticon20", "http://i257.photobucket.com/albums/hh205/xoxojays/smilies/fairy/pic016demoji_9439617decoojp.gif");
buttons += emoticonButton("emoticon20", "http://i257.photobucket.com/albums/hh205/xoxojays/smilies/fairy/pic012demoji_16386637decoojp.gif");
buttons += emoticonButton("emoticon20", "http://i257.photobucket.com/albums/hh205/xoxojays/smilies/fairy/pic016demoji_339787decoojp.gif");
buttons += emoticonButton("emoticon20", "http://i257.photobucket.com/albums/hh205/xoxojays/smilies/fairy/pic011demoji_15530476decoojp.gif");
buttons += emoticonButton("emoticon20", "http://i257.photobucket.com/albums/hh205/xoxojays/smilies/fairy/pic017demoji_16060317decoojp.gif");
buttons += emoticonButton("emoticon20", "http://i257.photobucket.com/albums/hh205/xoxojays/smilies/fairy/pic004demoji_8617422decoojp.gif");
buttons += emoticonButton("emoticon20", "http://i257.photobucket.com/albums/hh205/xoxojays/smilies/fairy/pic010demoji_19086922decoojp.gif");
buttons += emoticonButton("emoticon20", "http://i257.photobucket.com/albums/hh205/xoxojays/smilies/fairy/pic001demoji_366194decoojp.gif");
buttons += emoticonButton("emoticon20", "http://i257.photobucket.com/albums/hh205/xoxojays/smilies/fairy/pic016demoji_369894decoojp.gif");
buttons += emoticonButton("emoticon20", "http://2.bp.blogspot.com/-bv_VfK5Qb1k/TxJZKBGlYqI/AAAAAAAADOM/AUwmbVNYKVI/s1600/cute%2Bcarita%2Bby%2Bannyz%2B%25282%2529.jpg");
buttons += emoticonButton("emoticon20", "http://1.bp.blogspot.com/-bsgNzpcs8ck/TxJZJTHXSBI/AAAAAAAADNY/imKwrqqbIlk/s1600/cute%2Bcarita%2Bby%2Bannyz.gif");
buttons += emoticonButton("emoticon20", "http://1.bp.blogspot.com/-5Ip_GeUV4Ao/TindLIR8sYI/AAAAAAAACDM/89mC4Z5AGSQ/s1600/cute+mini+gif+by+annyz+blog+%2528113%2529.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/101.jpg");
buttons += emoticonButton("emoticon20", "http://1.bp.blogspot.com/_1qScJPQzZQo/TIj3bPuanyI/AAAAAAAAAgU/8QId9UlX6vE/s400/1.gif");
buttons += emoticonButton("emoticon20", "http://i1221.photobucket.com/albums/dd461/kawaii_annyz/271.jpg");

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