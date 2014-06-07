// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by disconnected (http://daniel-disconnected.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Asteeg Smileys
// @namespace      https://sites.google.com/site/disconnectedscript/
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
	buttons += emoticonButton(":jedot:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons0051.gif");
	buttons += emoticonButton(":mangan:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons0052.gif");
	buttons += emoticonButton(":ruwet:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons0053.gif");
	buttons += emoticonButton(":ckck:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons0054.gif");
	buttons += emoticonButton(":kill:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons0055.gif");
	buttons += emoticonButton(":aaaa:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons0056.gif");
	buttons += emoticonButton(":bahu:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons0057.gif");
	buttons += emoticonButton(":bye:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons0058.gif");
	buttons += emoticonButton(":nyesel:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons0059.gif");
	buttons += emoticonButton(":tamparmuka:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00510.gif");
	buttons += emoticonButton(":nangis:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00511.gif");
	buttons += emoticonButton(":headset:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00512.gif");
	buttons += emoticonButton(":mendam:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00513.gif");
	buttons += emoticonButton(":kesurupan:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00514.gif");
	buttons += emoticonButton(":star:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00515.gif");
	buttons += emoticonButton(":yes:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00516.gif");
	buttons += emoticonButton(":eman:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00517.gif");
	buttons += emoticonButton(":turu:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00518.gif");
	buttons += emoticonButton(":love:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00519.gif");
	buttons += emoticonButton(":somse:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00520.gif");
	buttons += emoticonButton(":duo:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00521.gif");
	buttons += emoticonButton(":plak:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00522.gif");
	buttons += emoticonButton(":fyuh:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00523.gif");
	buttons += emoticonButton(":fly:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00524.gif");
	buttons += emoticonButton(":joget1:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00525.gif");
    buttons += emoticonButton(":joget2:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00526.gif");
	buttons += emoticonButton(":uye:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00527.gif");
	buttons += emoticonButton(":horror:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00528.gif");
    buttons += emoticonButton(":praise:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00529.gif");
	buttons += emoticonButton(":ngik:", "http://www.addemoticons.com/emoticon/crazy/AddEmoticons00530.gif");
	buttons += emoticonButton(":lari:", "http://www.addemoticons.com/emoticon/mashimaro/AddEmoticons0151.gif");
    buttons += emoticonButton(":cool:", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04243.gif");
    buttons += emoticonButton(":please:", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04261.gif");
	buttons += emoticonButton(":broken:", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04276.gif");
	buttons += emoticonButton(":sakit:", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04255.gif");
    buttons += emoticonButton(":huek:", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04265.gif");
	buttons += emoticonButton(":isin", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04231.gif");
        buttons += emoticonButton(":calling", "http://www.addemoticons.com/emoticon/animated/AddEmoticons0421.gif");
        buttons += emoticonButton(":falin love", "http://www.addemoticons.com/emoticon/animated/AddEmoticons0425.gif");
	buttons += emoticonButton(":cry", "http://www.addemoticons.com/emoticon/animated/AddEmoticons0429.gif");
	buttons += emoticonButton(":fight", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04222.gif");
	buttons += emoticonButton(":kamsiyah", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04228.gif");
	buttons += emoticonButton(":huaa", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04219.gif");
	buttons += emoticonButton(":wekk", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04224.gif");
	buttons += emoticonButton(":muach", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04225.gif");
	buttons += emoticonButton(":hee?", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04226.gif");
	buttons += emoticonButton(":spirit", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04237.gif");
	buttons += emoticonButton(":hore", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04230.gif");
	buttons += emoticonButton(":think", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04233.gif");
	buttons += emoticonButton(":woee", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04234.gif");
	buttons += emoticonButton(":waow", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04235.gif");
	buttons += emoticonButton(":plak", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04249.gif");
	buttons += emoticonButton(":kepis", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04245.gif");
	buttons += emoticonButton(":kaget", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04239.gif");
	buttons += emoticonButton(":ngiler", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04253.gif");
	buttons += emoticonButton(":ngah-ngih", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04254.gif");
	buttons += emoticonButton(":grrr", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04256.gif");
	buttons += emoticonButton(":loro", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04255.gif");
	buttons += emoticonButton(":daniel", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04257.gif");
	buttons += emoticonButton(":untu", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04258.gif");
	buttons += emoticonButton(":piye yaw?", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04274.gif");
	buttons += emoticonButton(":sstt", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04277.gif");
	buttons += emoticonButton(":emoh", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04279.gif");
	buttons += emoticonButton(":dewean", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04269.gif");
	buttons += emoticonButton(":kliyengan", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04282.gif");
	buttons += emoticonButton(":weekkz", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04287.gif");
	buttons += emoticonButton(":bingung", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04280.gif");
	buttons += emoticonButton(":nyerah", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04264.gif");
	buttons += emoticonButton(":dhaa", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04283.gif");
	buttons += emoticonButton(":happy", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04262.gif");
	buttons += emoticonButton(":ngempet ngguyu", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04263.gif");
	buttons += emoticonButton(":uups", "http://www.addemoticons.com/emoticon/animated/AddEmoticons04212.gif");
    
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