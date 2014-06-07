// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Jan Di (http://momoiro-box.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Sozai
// @namespace      http://nanarabu.blogspot.com
// @description    Cute Sozai for Blogger by nanarabu.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";


buttons += emoticonButton(":a:", "http://i724.photobucket.com/albums/ww242/heart_nana28/x7.gif");
buttons += emoticonButton(":b:", "http://i724.photobucket.com/albums/ww242/heart_nana28/x6.gif");
buttons += emoticonButton(":c:", "http://i724.photobucket.com/albums/ww242/heart_nana28/x5.gif");
buttons += emoticonButton(":d:", "http://i724.photobucket.com/albums/ww242/heart_nana28/x4.gif");
buttons += emoticonButton(":e:", "http://i724.photobucket.com/albums/ww242/heart_nana28/x3.gif");
buttons += emoticonButton(":f:", "http://i724.photobucket.com/albums/ww242/heart_nana28/x2.gif");
buttons += emoticonButton(":g:", "http://i724.photobucket.com/albums/ww242/heart_nana28/x1.gif");
buttons += emoticonButton(":h:", "http://i724.photobucket.com/albums/ww242/heart_nana28/twinklepink.gif");
buttons += emoticonButton(":i:", "http://i724.photobucket.com/albums/ww242/heart_nana28/tear.gif");
buttons += emoticonButton(":j:", "http://i724.photobucket.com/albums/ww242/heart_nana28/t08.gif");
buttons += emoticonButton(":k:", "http://i724.photobucket.com/albums/ww242/heart_nana28/t07.gif");
buttons += emoticonButton(":l:", "http://i724.photobucket.com/albums/ww242/heart_nana28/t06.gif");
buttons += emoticonButton(":m:", "http://i724.photobucket.com/albums/ww242/heart_nana28/t05.gif");
buttons += emoticonButton(":n:", "http://i724.photobucket.com/albums/ww242/heart_nana28/t04.gif");
buttons += emoticonButton(":o:", "http://i724.photobucket.com/albums/ww242/heart_nana28/t03.gif");
buttons += emoticonButton(":p:", "http://i724.photobucket.com/albums/ww242/heart_nana28/t02.gif");
buttons += emoticonButton(":q:", "http://i724.photobucket.com/albums/ww242/heart_nana28/t01.gif");
buttons += emoticonButton(":r:", "http://i724.photobucket.com/albums/ww242/heart_nana28/pointdot3.gif");
buttons += emoticonButton(":s:", "http://i724.photobucket.com/albums/ww242/heart_nana28/pointdot2.gif");
buttons += emoticonButton(":t:", "http://i724.photobucket.com/albums/ww242/heart_nana28/pointdot1.gif");
buttons += emoticonButton(":u:", "http://i724.photobucket.com/albums/ww242/heart_nana28/pikapika.gif");
buttons += emoticonButton(":v:", "http://i724.photobucket.com/albums/ww242/heart_nana28/minibow6.gif");
buttons += emoticonButton(":w:", "http://i724.photobucket.com/albums/ww242/heart_nana28/minibow5.gif");
buttons += emoticonButton(":x:", "http://i724.photobucket.com/albums/ww242/heart_nana28/minibow4.gif");
buttons += emoticonButton(":y:", "http://i724.photobucket.com/albums/ww242/heart_nana28/minibow3.gif");
buttons += emoticonButton(":z:", 
"http://i724.photobucket.com/albums/ww242/heart_nana28/minibow2.gif");
buttons += emoticonButton(":a1:", 
"http://i724.photobucket.com/albums/ww242/heart_nana28/minibow1.gif");
buttons += emoticonButton(":a2:", 
"http://i724.photobucket.com/albums/ww242/heart_nana28/mail.gif");
buttons += emoticonButton(":a3:", 
"http://i724.photobucket.com/albums/ww242/heart_nana28/mad_mark.gif");
buttons += emoticonButton(":1:", "http://i724.photobucket.com/albums/ww242/heart_nana28/maca2.gif");
buttons += emoticonButton(":2:", "http://i724.photobucket.com/albums/ww242/heart_nana28/kissyheart.gif");
buttons += emoticonButton(":3:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icotxt10.gif");
buttons += emoticonButton(":4:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icotxt9.gif");
buttons += emoticonButton(":5:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icotxt8.gif");
buttons += emoticonButton(":6:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icotxt7.gif");
buttons += emoticonButton(":7:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icotxt6.gif");
buttons += emoticonButton(":8:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icotxt5.gif");
buttons += emoticonButton(":9:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icotxt4.gif");
buttons += emoticonButton(":10:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icotxt3.gif");
buttons += emoticonButton(":11:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icotxt2.gif");
buttons += emoticonButton(":12:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icotxt1.gif");
buttons += emoticonButton(":13:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icon9.gif");
buttons += emoticonButton(":14:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icon8.gif");
buttons += emoticonButton(":15:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icon7.gif");
buttons += emoticonButton(":16:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icon5.gif");
buttons += emoticonButton(":17:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icon4.gif");
buttons += emoticonButton(":18:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icon3.gif");
buttons += emoticonButton(":19:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icon2.gif");
buttons += emoticonButton(":20:", "http://i724.photobucket.com/albums/ww242/heart_nana28/icon1.gif");
buttons += emoticonButton(":21:", "http://i724.photobucket.com/albums/ww242/heart_nana28/heart1.gif");
buttons += emoticonButton(":22:", "http://i724.photobucket.com/albums/ww242/heart_nana28/cupcakedot1.gif");
buttons += emoticonButton(":23:", "http://i724.photobucket.com/albums/ww242/heart_nana28/check29.gif");
buttons += emoticonButton(":24:", "http://i724.photobucket.com/albums/ww242/heart_nana28/check28.gif");
buttons += emoticonButton(":25:", "http://i724.photobucket.com/albums/ww242/heart_nana28/check27.gif");
buttons += emoticonButton(":26:", "http://i724.photobucket.com/albums/ww242/heart_nana28/check16.gif");
buttons += emoticonButton(":27:", "http://i724.photobucket.com/albums/ww242/heart_nana28/check15.gif");
buttons += emoticonButton(":29:", "http://i724.photobucket.com/albums/ww242/heart_nana28/check10.gif");
buttons += emoticonButton(":30:", "http://i724.photobucket.com/albums/ww242/heart_nana28/check9.gif");
buttons += emoticonButton(":31:", "http://i724.photobucket.com/albums/ww242/heart_nana28/check2.gif");
buttons += emoticonButton(":32:", "http://i724.photobucket.com/albums/ww242/heart_nana28/check1.gif");
buttons += emoticonButton(":33:", "http://i724.photobucket.com/albums/ww242/heart_nana28/candydot1.gif");
buttons += emoticonButton(":34:", "http://i724.photobucket.com/albums/ww242/heart_nana28/cakedot3.gif");
buttons += emoticonButton(":35:", "http://i724.photobucket.com/albums/ww242/heart_nana28/cakedot2.gif");
buttons += emoticonButton(":36:", "http://i724.photobucket.com/albums/ww242/heart_nana28/cakedot1.gif");
buttons += emoticonButton(":37:", "http://i724.photobucket.com/albums/ww242/heart_nana28/bnew3.gif");
buttons += emoticonButton(":38:", "http://i724.photobucket.com/albums/ww242/heart_nana28/bnew2.gif");
buttons += emoticonButton(":39:", "http://i724.photobucket.com/albums/ww242/heart_nana28/bnew.gif");
buttons += emoticonButton(":40:", "http://i724.photobucket.com/albums/ww242/heart_nana28/bear5.gif");
buttons += emoticonButton(":41:", "http://i724.photobucket.com/albums/ww242/heart_nana28/bear4.gif");
buttons += emoticonButton(":42:", "http://i724.photobucket.com/albums/ww242/heart_nana28/bear3.gif");
buttons += emoticonButton(":43:", "http://i724.photobucket.com/albums/ww242/heart_nana28/bear2.gif");
buttons += emoticonButton(":44:", "http://i724.photobucket.com/albums/ww242/heart_nana28/bear1.gif");
buttons += emoticonButton(":45:", "http://i724.photobucket.com/albums/ww242/heart_nana28/balloontext.gif");
buttons += emoticonButton(":46:", "http://i724.photobucket.com/albums/ww242/heart_nana28/ase.gif");


	
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