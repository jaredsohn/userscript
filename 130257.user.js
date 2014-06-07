// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modificado por carito (muffinrawr.blogspot.com) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           caritonoblog
// @namespace      http://muffinerawr.blogspot.com
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
                      
buttons += emoticonButton("emoticon01", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/30-1.jpg");
buttons += emoticonButton("emoticon02", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/35.jpg");
buttons += emoticonButton("emoticon03", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/026.png");
buttons += emoticonButton("emoticon04", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/07-1.jpg");
buttons += emoticonButton("emoticon05", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/ck-l-15.gif");
buttons += emoticonButton("emoticon06", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/b9a8330a61169c5d8822d55b871b1b23.gif");
buttons += emoticonButton("emoticon07", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/th31.gif");
buttons += emoticonButton("emoticon08", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/49.jpg");
buttons += emoticonButton("emoticon09", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/47.jpg");
buttons += emoticonButton("emoticon10", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/39.jpg");
buttons += emoticonButton("emoticon11", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/d444f98d83afa29dfa269ff7ff69b1d5.gif");
buttons += emoticonButton("emoticon12", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/62.jpg");
buttons += emoticonButton("emoticon13", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/49dace614700c33783c6d4c26e1039dc.gif");
buttons += emoticonButton("emoticon14", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/29-1.jpg");
buttons += emoticonButton("emoticon15", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/07.jpg");
buttons += emoticonButton("emoticon16", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/71.jpg");
buttons += emoticonButton("emoticon17", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/smiley0090sa.gif");
buttons += emoticonButton("emoticon18", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/1912.jpg");
buttons += emoticonButton("emoticon19", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/681.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/211.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/521.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/91.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/421.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/391.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/161.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/31.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/61.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/531.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/751.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/801.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/541.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/501.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/581.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/34.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/811.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/271.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/841.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/401.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/16lxnuq.png");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/561.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/631.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/101.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/261.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/611.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/e3d8da886eb4e74eb40d600e79fcaab4.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/DTfUh.png");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/minipizza.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/2192oh3_th.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/331oneq_th.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/heart3.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/2m5l854.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/cutekiss.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/panic.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/a_new_kaomojis/13.png");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/a_new_kaomojis/12.png");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/a_new_kaomojis/11.png");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/a_new_kaomojis/10.png");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/a_new_kaomojis/09.png");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/a_new_kaomojis/08.png");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/a_new_kaomojis/07.png");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/a_new_kaomojis/06.png");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/ee1d7f97a5f066453b978557c1482ead.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/cfa54478f279b58981d56f67d3e5d3c5.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/0666176a45562830f407eaf9ba7465b1.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/b534571459087ca9fae657444619fde4.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/150faa4c05906c05a2c1eae6ab8ef42d.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/9938a317e74657e2e04a2d2c4bb91ccd.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/0bfe9efaac1529dc4a90e224aa9fc5e8.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/kawaiicons/0e995aad28928a98c16f3b4c6d8ab419.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/27.jpg");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/24.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/21.gif");
buttons += emoticonButton("emoticon20", "http://i368.photobucket.com/albums/oo128/nekomikk_caro/icosn_nokoka/03.gif");

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