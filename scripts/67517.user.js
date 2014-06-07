// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Naruto Emoticons for Blogger
// @namespace      http://wolverinex02.googlepages.com
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
	buttons += emoticonButton("naramen", "http://narutofanzone.com/images/naruramenjp3.gif");
	buttons += emoticonButton("ngantuk", "http://narutofanzone.com/images/YS_narutoanigif1.gif");
	buttons += emoticonButton("shannaro", "http://narutofanzone.com/images/shannaro.gif");
	buttons += emoticonButton("omg", "http://narutofanzone.com/images/aobadoor.gif");
	buttons += emoticonButton("sembunyi", "http://narutofanzone.com/images/gaara_ball.gif");
	buttons += emoticonButton("notme", "http://narutofanzone.com/images/kks_kawarimi.gif");
	buttons += emoticonButton("nice", "http://narutofanzone.com/images/gai_nice_pose.gif");
	buttons += emoticonButton("itachi", "http://narutofanzone.com/images/itachi_mange2.gif");
	buttons += emoticonButton("bakaaaar", "http://narutofanzone.com/images/sasuke_grandfireball.gif");
	buttons += emoticonButton("chidori", "http://narutofanzone.com/images/kks_chidori1.gif");
	buttons += emoticonButton("yahaha", "http://a.deviantart.net/avatars/y/a/yagamirapefaceplz.gif");
	buttons += emoticonButton("hmmm", "http://a.deviantart.net/avatars/l/a/lamliet.gif");
	buttons += emoticonButton("ikutaku", "http://a.deviantart.net/avatars/l/x/lxlightplz.gif");
	buttons += emoticonButton("hyeheeh", "http://a.deviantart.net/avatars/k/i/kiralaughplz.gif");
	buttons += emoticonButton("pusing", "http://a.deviantart.net/avatars/d/n/dnl-plz.gif?1");
	buttons += emoticonButton("hohoho", "http://images.paraorkut.com/img/emoticons/images/p/patrick_laughing-276.gif");
	buttons += emoticonButton("ting", "http://images.paraorkut.com/img/emoticons/images/p/patrick_from_spongebob-281.gif");
	buttons += emoticonButton("cape", "http://images.paraorkut.com/img/emoticons/images/s/squidward_sad-299.gif");
	buttons += emoticonButton("angry", "http://images.paraorkut.com/img/emoticons/images/a/angry_squidward-302.gif");
	buttons += emoticonButton("bersin", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/octopus%20kawaii/ox1.gif");
	buttons += emoticonButton("nangis", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/octopus%20kawaii/ox4.gif");
	buttons += emoticonButton("hi", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/octopus%20kawaii/ox6.gif");
	
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