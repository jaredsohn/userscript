// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Salsa (http://salsauce.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Onigiri Emoticones for Blogger
// @namespace      http://salsauce.blogger.com
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
	buttons += emoticonButton("WideGrin", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_xd.gif");
	buttons += emoticonButton("EatingRamen", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_ramen.gif");
	buttons += emoticonButton("BigEyes", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_big_eyes.gif");
	buttons += emoticonButton("CheerLeader", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_cheerleader.gif");
	buttons += emoticonButton("Crying", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_crying.gif");
	buttons += emoticonButton("CryARiver", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_crying_deeply.gif");
	buttons += emoticonButton("Kawaii", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_cute.gif");
	buttons += emoticonButton("Dance", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_dance.gif");
	buttons += emoticonButton("Excited", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_dancing.gif");
	buttons += emoticonButton("Dead", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_dead.gif");
	buttons += emoticonButton("Dizzy", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_dizzy.gif");
	buttons += emoticonButton("Happy", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_happy.gif");
	buttons += emoticonButton("HappyHands", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_happy_hands.gif");
	buttons += emoticonButton("CuteBlush", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_kawaii.gif");
	buttons += emoticonButton("Mad", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_mad.gif");
	buttons += emoticonButton("DingDong", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_o.o.gif");
	buttons += emoticonButton("Shocked", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_oo.gif");
	buttons += emoticonButton("Beaten", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_beaten.gif");
	buttons += emoticonButton("Scaried", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_scaried.gif");
	buttons += emoticonButton("LostFace", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_serious.gif");
	buttons += emoticonButton("Sleeping", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_sleeping.gif");
	buttons += emoticonButton("SnoringSleep", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_sleeping_drop.gif");
	buttons += emoticonButton("Glance", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_usagi.gif");
	buttons += emoticonButton("Terrified", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_wave.gif");
	buttons += emoticonButton("Stressed", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_angry.gif");
	buttons += emoticonButton("MoonSleep", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_moon_sleep.gif");
	buttons += emoticonButton("HappySmile", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_smilie.gif");
	buttons += emoticonButton("SuspiciousGlance", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_mad_eyes.gif");
	buttons += emoticonButton("Bawling", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_cry.gif");
	buttons += emoticonButton("KnockedOut", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_crazy_eyes.gif");
	buttons += emoticonButton("PoorFace", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_sad.gif");
	buttons += emoticonButton("Confetti", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_confetti.gif");
	buttons += emoticonButton("Fiesta", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_fiesta.gif");
	buttons += emoticonButton("Party", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_party.gif");
	buttons += emoticonButton("DrinkDrunk", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_drink.gif");
	buttons += emoticonButton("Walk", "http://www.anikaos.com/0038-onigiri_rice_balls/onigiri_walk.gif");
	
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