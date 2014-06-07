// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thejijie (http://itsmejijie.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           cute love gifs
// @namespace      http://itsmejijie.blogspot.com/
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
	buttons += emoticonButton("happy", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_YnGI_5eTBWB.gif");
	buttons += emoticonButton("beelove", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_WWrnZGSJFDh.gif");
        buttons += emoticonButton("love2", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_VVeca7kQfOI.gif");
        buttons += emoticonButton("catlove", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_UyVQiA6MnkD.gif");
        buttons += emoticonButton("love", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_Uh2FsDWJ_Il.gif");
        buttons += emoticonButton("rabbit", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_UCOZ240UmvJ.gif");
        buttons += emoticonButton("ribenlove", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_UC5d1CLgy-U.gif");
        buttons += emoticonButton("sunlove", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_TSWEdv9Gl5h.gif");
        buttons += emoticonButton("rabbit2", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_T3-TAbTVnMs.gif");
        buttons += emoticonButton("flower", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_SNw2rm3bvAt.gif");
        buttons += emoticonButton("rama2", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_R8rrjsbDGZ1.gif");
        buttons += emoticonButton("loveplant", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_fgro5kJgw5t.gif");
        buttons += emoticonButton("butterfly", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_etV_reETvp4.gif");
        buttons += emoticonButton("inlove", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_dX1AYnynNdb.gif");
        buttons += emoticonButton("flower2", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_ch4RxlgEydM.gif");
        buttons += emoticonButton("loveu", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_c_fO3LZfsF_.gif");
        buttons += emoticonButton("glass", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_c86WxORjBG5.gif");
        buttons += emoticonButton("happyweek", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_bqJpOImpSEU.gif");
        buttons += emoticonButton("ready", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_axZbpP5bLp5.gif");
        buttons += emoticonButton("drawlove", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_dcvs08xviOa.gif");
        buttons += emoticonButton("cat2", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/th_x1pjzF2-RYhxRWtSbRE9koX_b1wbkQpkE-q.gif");
        buttons += emoticonButton("leaf", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/x1pjzF2-RYhxRWtSbRE9koX_dX1AYnyn-1.gif");
        buttons += emoticonButton("beautiful", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/x1pjzF2-RYhxRWtSbRE9koX_ch4RxlgE-1.gif");
        buttons += emoticonButton("rainbow", "http://i11.photobucket.com/albums/a168/evelynregly/amigas/x1pjzF2-RYhxRWtSbRE9koX_axZbpP5b-1.gif");
			
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