// Based on the original emoticonsforblogger by  Hoaaamers (http://hoaaam.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kaskus
// @namespace      http://sulae.blogspot.com/
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
buttons += emoticonButton(":addfriends", "http://static.kaskus.us/images/smilies/add-friend-kecil.gif");
	
buttons += emoticonButton("berbusas", "http://static.kaskus.us/images/smilies/berbusa-kecil.gif");
	
buttons += emoticonButton("armys", "http://static.kaskus.us/images/smilies/army-kecil.gif");
	
buttons += emoticonButton("lemparbata", "http://static.kaskus.us/images/smilies/s_sm_batamerah.gif");
	
buttons += emoticonButton("peaces", "http://static.kaskus.us/images/smilies/s_sm_peace.gif");
	
buttons += emoticonButton("batas", "http://static.kaskus.us/images/smilies/batas.gif");
	
buttons += emoticonButton("capedes", "http://static.kaskus.us/images/smilies/capedes.gif");
	
buttons += emoticonButton("mahos", "http://static.kaskus.us/images/smilies/mahos.gif");
	
buttons += emoticonButton("malus", "http://static.kaskus.us/images/smilies/malus.gif");
	
buttons += emoticonButton("ngakaks", "http://static.kaskus.us/images/smilies/ngakaks.gif");
	
buttons += emoticonButton("takuts", "http://static.kaskus.us/images/smilies/takuts.gif");
	
buttons += emoticonButton("bookmarks", "http://static.kaskus.us/images/smilies/bookmark-kecil.gif");
	
buttons += emoticonButton("shutups", "http://static.kaskus.us/images/smilies/shutup-kecil.gif");
	
buttons += emoticonButton("iloveindonesias", "http://static.kaskus.us/images/smilies/iloveindonesias.gif");
        
buttons += emoticonButton("berdukas", "http://static.kaskus.us/images/smilies/berdukas.gif");
	
buttons += emoticonButton("bingungs", "http://static.kaskus.us/images/smilies/bingungs.gif");
        
buttons += emoticonButton("najiss", "http://static.kaskus.us/images/smilies/najiss.gif");
        
buttons += emoticonButton("iluvhoaamers", "http://cdn-u.kaskus.us/58/xmajdqnp.gif");
        
buttons += emoticonButton("mads", "http://static.kaskus.us/images/smilies/mads.gif");
        
buttons += emoticonButton("sunduls", "http://static.kaskus.us/images/smilies/sundulgans.gif");
        
buttons += emoticonButton("hammers", "http://static.kaskus.us/images/smilies/hammers.gif");
        
buttons += emoticonButton("reposts", "http://static.kaskus.us/images/smilies/reposts.gif");
        
buttons += emoticonButton("kisss", "http://static.kaskus.us/images/smilies/kisss.gif");

buttons += emoticonButton("ngakak_gede", "http://www.kaskus.us/images/smilies/ngakak.gif");
        
buttons += emoticonButton("berduka", "http://www.kaskus.us/images/smilies/berduka.gif");
        
buttons += emoticonButton("love_cewek", "http://www.kaskus.us/images/smilies/cewek.gif");
        
buttons += emoticonButton("maho", "http://www.kaskus.us/images/smilies/s_sm_maho.gif");
        
buttons += emoticonButton("I-Luv_indonesia", "http://www.kaskus.us/images/smilies/I-Luv-Indonesia.gif");


				
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"20\\\" height=\\\"20\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);