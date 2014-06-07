// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by andianka (http://waitwhosaidthat.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Asteeg Smileys
// @namespace      http://andianka.googlepages.com/
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
	buttons += emoticonButton(":shocked:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/newest/8.jpg");
	buttons += emoticonButton(":urgh:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/newest/9.jpg");
	buttons += emoticonButton(":yum:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/newest/x9edu.gif");
	buttons += emoticonButton(":drools:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/newest/19qjpg.jpg");
	buttons += emoticonButton(":amppp:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/newest/2heycte.gif");
	buttons += emoticonButton(":click:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/newest/23lkxsi.gif");
	buttons += emoticonButton(":sunshine:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/newest/2nhmjh5.gif");
	buttons += emoticonButton(":cash:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/newest/6.jpg");
	buttons += emoticonButton(":snob:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/kaismilies/6.png");
	buttons += emoticonButton(":dizzy:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/kaismilies/7.png");
	buttons += emoticonButton(":hilo:", "http://sidekick.mysinablog.com/resserver.php?resource=201122-faint.gif");
	buttons += emoticonButton(":tearyhappy:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/kaismilies/3.png");
	buttons += emoticonButton(":smile:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/kaismilies/10.png");
	buttons += emoticonButton(":sad:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/kaismilies/24.png");
	buttons += emoticonButton(":tongue:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/kaismilies/13.png");
	buttons += emoticonButton(":lol:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/emoticons/162090c6542e46a5469acd5ae5959048.gif");
	buttons += emoticonButton(":rofl:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/emoticons/6bfd4609f05b1897a5c0fdd3c23b5a48.gif");
	buttons += emoticonButton(":smartass:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi91.gif");
	buttons += emoticonButton(":hot:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi99.gif");
	buttons += emoticonButton(":uhuh:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi77.gif");
	buttons += emoticonButton(":ehehehe:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi68.gif");
	buttons += emoticonButton(":nervous:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi27.gif");
	buttons += emoticonButton(":sick:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi170.gif");
	buttons += emoticonButton(":sungit:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi17.gif");
	buttons += emoticonButton(":fuckthisshit:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi160.gif");
        buttons += emoticonButton(":noooo:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi173.gif");
	buttons += emoticonButton(":confident:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi151.gif");
	buttons += emoticonButton(":tears:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi15.gif");
        buttons += emoticonButton(":eh:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi140.gif");
	buttons += emoticonButton(":diebitch:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi146.gif");
	buttons += emoticonButton(":vomit:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi135.gif");
        buttons += emoticonButton(":sleep:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi138.gif");
        buttons += emoticonButton(":evil:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi123.gif");
	buttons += emoticonButton(":aja:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi125.gif");
	buttons += emoticonButton(":stophuhu:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi11.gif");
        buttons += emoticonButton(":nosebleed:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi109.gif");
	buttons += emoticonButton(":hurryup:(", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi104.gif");
        buttons += emoticonButton(":ahmuhuhu:", "http://i547.photobucket.com/albums/hh458/meetsteffanie/yoyocici/YoYoCiCi108.gif");
    
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