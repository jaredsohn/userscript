// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Nia (http://michaela-nathania.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Crazy Rabbit Emoticon
// @namespace      http://michaela-nathania.blogspot.com
// @description    You can use emoticons in Blogger by michaela-nathania.blogspot.com. Follow my blog for the notification of new script
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";

buttons += emoticonButton("bad-luck-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/bad-luck-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("ballerina-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/ballerina-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("blush-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/blush-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("booger-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/booger-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("boohoo-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/boohoo-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("boring-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/boring-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("bye-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/bye-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("calm-down-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/calm-down-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("dance-with-me-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/dance-with-me-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("dancing-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/dancing-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("dead-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/dead-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("dizzy-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/dizzy-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("drama-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/drama-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("dunno-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/dunno-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("eating-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/eating-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("exorcist-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/exorcist-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("exorcist-crazy-rabbit-emoticon_002", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/exorcist-crazy-rabbit-emoticon_002.gif");
buttons += emoticonButton("floating-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/floating-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("flying-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/flying-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("get-out-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/get-out-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("happiness-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/happiness-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("happy-birthday-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/happy-birthday-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("happy-dancing-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/happy-dancing-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("hate-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/hate-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("head-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/head-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("help-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/help-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("kill-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/kill-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("kill-me-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/kill-me-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("kill-myself-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/kill-myself-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("looser-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/looser-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("love-food-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/love-food-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("love-you-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/love-you-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("magic-left-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/magic-left-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("magic-right-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/magic-right-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("moving-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/moving-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("music-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/music-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("nah-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/nah-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("no-no-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/no-no-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("on-jail-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/on-jail-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("patpat-dance-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/patpat-dance-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("pheew-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/pheew-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("poking-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/poking-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("scratching-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/scratching-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("shake-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/shake-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("sigh-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/sigh-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("sleeping-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/sleeping-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("smooth-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/smooth-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("snack-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/snack-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("stars-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/stars-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("taichi-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/taichi-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("teehee-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/teehee-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("tv-baby-emoticon-04", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/tv-baby-emoticon-04.gif");
buttons += emoticonButton("up-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/up-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("up-down-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/up-down-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("what-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/what-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("yeah-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/yeah-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("yes-sir-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/yes-sir-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("yesss-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/yesss-crazy-rabbit-emoticon.gif");
buttons += emoticonButton("yipee-crazy-rabbit-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-crazyrabbit/yipee-crazy-rabbit-emoticon.gif");

	
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