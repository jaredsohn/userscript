// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Cahya Prastyanto (http://blogger-emoticon.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger part4
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger. by Blogger-Emoticon.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/018.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/122.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/134.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon42.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon5.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/6ea2a854.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/3f98bd83.png";)
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/20f5d818.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://sidekick.mysinablog.com/resserver.php?resource=201122-faint.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://blogimage.roodo.com/onion_club/233cd70a.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://blogimage.roodo.com/onion_club/70bff581.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://blogimage.roodo.com/onion_club/54bd3bbb.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://blogimage.roodo.com/onion_club/efb50fe2.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://sidekick.mysinablog.com/resserver.php?resource=193303-lonely.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://blogimage.roodo.com/onion_club/3473749b.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://blogimage.roodo.com/onion_club/967339c1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://blogimage.roodo.com/onion_club/d5f02ecd.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i41.tinypic.com/24y95y9.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i40.tinypic.com/97o3fq.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i42.tinypic.com/1z175kw.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i39.tinypic.com/hwzt39.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i44.tinypic.com/vsdi85.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i43.tinypic.com/no8xz6.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i43.tinypic.com/2e24jra.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i42.tinypic.com/30kq63q.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i39.tinypic.com/iqeb95.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i41.tinypic.com/149oa9y.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i40.tinypic.com/21cxgd5.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i43.tinypic.com/8wgvpg.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i44.tinypic.com/jptyjl.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i42.tinypic.com/sq30wj.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i43.tinypic.com/inwoxu.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i39.tinypic.com/2ijni9e.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i39.tinypic.com/a2rt4h.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i41.tinypic.com/9708hy.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i40.tinypic.com/11vk4qp.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i41.tinypic.com/2usitdt.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i44.tinypic.com/2hncbo6.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i43.tinypic.com/2quhws2.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i43.tinypic.com/2hydikm.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i43.tinypic.com/mu7vbs.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i39.tinypic.com/2ui8bw1.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i40.tinypic.com/htw4rl.jpg");

    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);