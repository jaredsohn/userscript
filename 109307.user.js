// Based on the original emoticonsforblogger by Kuribo
// Modified by (http://sc4you.blogspot.com) 

// FEATURES
// Works only in Compose Modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Onion Icon for blogger
// @namespace      http://sc4you.blogspot.com
// @description    You can use Onion emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton(":ayokona:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/ayokona.gif");
	buttons += emoticonButton(":sakit:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/sakit.gif");
	buttons += emoticonButton(":antok:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/atok.gif");
	buttons += emoticonButton(":wala:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/wala.gif");
	buttons += emoticonButton(":sleep:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/sleep.gif");
	buttons += emoticonButton(":anoto:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/anoto.gif");
	buttons += emoticonButton(":marah:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/marah.gif");
	buttons += emoticonButton(":berdoa:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/berdoa.gif");
	buttons += emoticonButton(":takot:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/takot.gif");
	buttons += emoticonButton(":galit:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/galit.gif");
	buttons += emoticonButton(":hilo:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/hilo.gif");
	buttons += emoticonButton(":tsk:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/tsk.gif");
	buttons += emoticonButton(":blush:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/blush.gif");
	buttons += emoticonButton(":devilishgrin:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/devilishgrin.gif");
	buttons += emoticonButton(":puppyeyes:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/puppyeyes.gif");
	buttons += emoticonButton(":sweaty:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/sweaty.gif");
	buttons += emoticonButton(":scream:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/scream.gif");
	buttons += emoticonButton(":anongnangyari:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/anongnangyari.gif");
	buttons += emoticonButton(":sorry:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/sorry.gif");
	buttons += emoticonButton(":astig:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/astig.gif");
        buttons += emoticonButton(":inlove:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/inlove.gif");
        buttons += emoticonButton(":knife:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/knife.gif");
	buttons += emoticonButton(":woooh:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/woooh.gif");
	buttons += emoticonButton(":dontcare:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/dontcare.gif");
        buttons += emoticonButton(":speechless:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/speechless.gif");
        buttons += emoticonButton(":please:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/please.gif");
	buttons += emoticonButton(":okay:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/okay.gif");
	buttons += emoticonButton(":smoking:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/smoking.gif");
        buttons += emoticonButton(":waaah:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/waaah.gif");
	buttons += emoticonButton("::(", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/sad.gif");
	buttons += emoticonButton(":hi:", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/hi.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/01.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/02.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/03.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/04.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/05.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/08.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/11.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/12.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/16.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/17.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/18.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/21.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/24.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/25.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/26.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/28.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/29.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/30.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/34.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/35.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/37.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/38.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/39.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/40.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/41.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/42.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/43.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/44.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/45.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/46.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/47.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/48.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/49.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/50.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/52.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/53.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/54.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/60.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/63.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/64.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/65.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/68.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/70.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/72.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/73.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/75.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/77.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/78.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/79.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/81.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/82.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/83.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/85.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/86.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/87.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/88.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/89.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/90.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/91.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/92.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/93.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/94.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/95.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/96.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/97.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/98.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/99.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/100.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/101.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/102.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/103.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/104.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/105.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/106.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/107.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/108.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/109.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/110.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/111.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/112.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/113.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/114.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/115.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/116.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/117.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/Onion/118.gif");        
	buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"50\\\" height=\\\"50\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img width=\"25\" height=\"25\" src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);