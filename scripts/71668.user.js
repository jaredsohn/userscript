// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Ranice:D (http://morekawaii.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kawaii Smilies (simple)
// @namespace      http://nurinadlina.blogspot.com/
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
                      
buttons += emoticonButton("emoticon01", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/Animation11.gif");
buttons += emoticonButton("emoticon02", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/Animation80.gif");
buttons += emoticonButton("emoticon03", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/12-2.gif");
buttons += emoticonButton("emoticon04", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/cutiepie5.gif");
buttons += emoticonButton("emoticon05", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/cutiepie6.gif");
buttons += emoticonButton("emoticon06", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/cutiepie1.gif");
buttons += emoticonButton("emoticon07", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/50-1.jpg");
buttons += emoticonButton("emoticon08", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/1.jpg");
buttons += emoticonButton("emoticon09", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/2iviihk.jpg");
buttons += emoticonButton("emoticon10", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/131.gif");
buttons += emoticonButton("emoticon11", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/inqsdk.jpg");
buttons += emoticonButton("emoticon12", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/e16ptwjpg.gif");
buttons += emoticonButton("emoticon13", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/27xnn0k.jpg");
buttons += emoticonButton("emoticon14", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/22b6zb.jpg");
buttons += emoticonButton("emoticon15", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/6zlq0y.gif");
buttons += emoticonButton("emoticon16", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/2z9cjrljpg.gif");
buttons += emoticonButton("emoticon17", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/2lnxv2d.jpg");
buttons += emoticonButton("emoticon18", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/2i0947kjpg.gif");
buttons += emoticonButton("emoticon19", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/ooh.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/oo.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/nosebleed2.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/nosebleed.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/noo.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/nice.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/love.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/leh.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/kiss.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/kissy.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/kapalkilay.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/hi.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/huh.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/heeheehee.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/happy2.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/happy.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/grrr.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/fire.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/duh.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/dizzy.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/crying.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/cry.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/Copyofeyelashes.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/Copyofeyebag2.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/Copyofeyebag.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/Copyofeew.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/Copyofangry.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/catsno.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/541.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/391.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/16lxnuq.png");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/sad.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/shy.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/shy2.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/shy3.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/shygry.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/spark.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/tear.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/tongue.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/tsk.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/uhmm.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/waa.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/waah.jpg");
buttons += emoticonButton("emoticon20", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/waah2.jpg");

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