// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thejijie (http://itsmejijie.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name		My Edited Script
// @namespace	Liyana
// @description	Kawaii script
// @include	http://*.blogger.com/post-edit.g?*
// @include	http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
                      
	
	
	buttons += emoticonButton("", "http://i620.photobucket.com/albums/tt281/aisya99/1.gif");
	buttons += emoticonButton("", "http://i620.photobucket.com/albums/tt281/aisya99/10.gif");
	buttons += emoticonButton("", "http://i620.photobucket.com/albums/tt281/aisya99/111e7b5d0ca6e22bee18b51084855be2.gif");
	buttons += emoticonButton("", "http://i620.photobucket.com/albums/tt281/aisya99/13.gif");
	buttons += emoticonButton("", "http://i620.photobucket.com/albums/tt281/aisya99/14.gif");
	buttons += emoticonButton("", "http://i620.photobucket.com/albums/tt281/aisya99/15.gif");
	buttons += emoticonButton("", "http://i620.photobucket.com/albums/tt281/aisya99/3.gif");
	buttons += emoticonButton("", "http://i620.photobucket.com/albums/tt281/aisya99/31.gif");
	buttons += emoticonButton("", "http://i620.photobucket.com/albums/tt281/aisya99/4.gif");
	buttons += emoticonButton("", "http://i620.photobucket.com/albums/tt281/aisya99/5.gif");
	buttons += emoticonButton("", "http://i620.photobucket.com/albums/tt281/aisya99/6.gif");
	buttons += emoticonButton("", "http://i620.photobucket.com/albums/tt281/aisya99/8.gif");
	buttons += emoticonButton("", "http://i620.photobucket.com/albums/tt281/aisya99/thstressball.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/shopping.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sikacak.png");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sick.gif");
	buttons += emoticonButton("", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_wink.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/shopping.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sick.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sidaibaju.png");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sister.png");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/skippy.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/skola.png");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/skull-1.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/smile.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/socks.png");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sofbol.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sotong.png");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/spec.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/star2.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/stoberi.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/stokin.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/straighten.png");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/surat.png");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sweater.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sweets.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/tampar.png");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/tdo-1.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/tdo.png");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/tepon.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/thcreambunny_tv-1.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/thfon-2-1.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/thgirl-1.gif");
	buttons += emoticonButton("", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/thjam-1.gif");
	buttons += emoticonButton("", "http://i277.photobucket.com/albums/kk70/safiena_album/twitter.gif");
	buttons += emoticonButton("", "http://i277.photobucket.com/albums/kk70/safiena_album/facebook.png");
	buttons += emoticonButton("", "http://i277.photobucket.com/albums/kk70/safiena_album/luv-2.gif");
	buttons += emoticonButton("", "http://i277.photobucket.com/albums/kk70/safiena_album/my-1.gif");
	buttons += emoticonButton("", "http://i277.photobucket.com/albums/kk70/safiena_album/home-1.gif");
	buttons += emoticonButton("", "http://i277.photobucket.com/albums/kk70/safiena_album/03_a05.gif");
	buttons += emoticonButton("", "http://i277.photobucket.com/albums/kk70/safiena_album/lollipop2-2.gif");
	buttons += emoticonButton("", "http://i277.photobucket.com/albums/kk70/safiena_album/minishoe.gif");
	buttons += emoticonButton("", "http://i277.photobucket.com/albums/kk70/safiena_album/luvpen.gif");
	buttons += emoticonButton("", "http://i46.tinypic.com/20u4co7.jpg");



buttons += emoticonButton("0", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/db095bfd.gif");
buttons += emoticonButton("1", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/1.gif");
buttons += emoticonButton("2", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/2.gif");
buttons += emoticonButton("3", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/3.gif");
buttons += emoticonButton("4", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/4.gif");
buttons += emoticonButton("5", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/5.gif");
buttons += emoticonButton("6", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/6.gif");
buttons += emoticonButton("7", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/7.gif");
buttons += emoticonButton("8", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/8.gif");
buttons += emoticonButton("9", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/9.gif");



buttons += emoticonButton("ok", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/dir_i0007.gif");
buttons += emoticonButton("", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/e23ae61debb80d7958b0369641953400.gif");
buttons += emoticonButton("shopping", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/f53ade42ede219d291c48f34c064d190.gif");
buttons += emoticonButton("!?", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/B05.gif");
buttons += emoticonButton("bath", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/1240875338-853071.gif");
buttons += emoticonButton("", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/1244839690-876811.gif");
buttons += emoticonButton("", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/1238776067-478505.gif");
buttons += emoticonButton("", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/20090623d10.gif");
buttons += emoticonButton("bye", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/8b9efbaa3d77d164ba34a25d1611aa41.gif");
buttons += emoticonButton("", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/7511bfe0a64e2ef18dbbfbfb94b813d4.gif");
buttons += emoticonButton("computer", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/35c4799b26face660a30915a6b25ef89.gif");
buttons += emoticonButton("blog", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/3d02922f9a5ca8f7fd6d03ce2d77a19c.gif");

      
        
    


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