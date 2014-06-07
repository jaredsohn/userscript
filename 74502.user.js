// Based on the original smilies by bibi1004 (http://www.bibi1004.com/)
// Modified by miss.mika (http://chrispy-cookies.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           smilies1
// @namespace      http://www.chrispy-cookies.blogspot.com/
// @description    You can use emoticons in Blogger. by chrispy-cookies.blogspot.com
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	

buttons += emoticonButton(":28:", "http://img24.imageshack.us/img24/1252/girl28.gif");
buttons += emoticonButton(":27:", "http://img651.imageshack.us/img651/8972/girl27.gif");
buttons += emoticonButton(":26:", "http://img532.imageshack.us/img532/1695/girl26.jpg");
buttons += emoticonButton(":25:", "http://img694.imageshack.us/img694/8028/girl25.jpg");
buttons += emoticonButton(":24:", "http://img688.imageshack.us/img688/2531/girl24.jpg");
buttons += emoticonButton(":23:", "http://img199.imageshack.us/img199/791/girl23u.jpg");
buttons += emoticonButton(":21:", "http://img83.imageshack.us/img83/4205/girl21.jpg");
buttons += emoticonButton(":22:", "http://img705.imageshack.us/img705/4314/girl22f.jpg");
buttons += emoticonButton(":20:", "http://img532.imageshack.us/img532/7104/girl20.jpg");
buttons += emoticonButton(":19:", "http://img258.imageshack.us/img258/8451/girl19.jpg");
buttons += emoticonButton(":18:", "http://img40.imageshack.us/img40/4751/girl18s.jpg");
buttons += emoticonButton(":17:", "http://img43.imageshack.us/img43/1216/girl17g.jpg");
buttons += emoticonButton(":16:", "http://img221.imageshack.us/img221/8873/girl16.jpg");
buttons += emoticonButton(":15:", "http://img502.imageshack.us/img502/708/girl15.jpg");
buttons += emoticonButton(":14:", "http://img91.imageshack.us/img91/885/girl14f.jpg");
buttons += emoticonButton(":13:", "http://img3.imageshack.us/img3/1613/girl13e.jpg");
buttons += emoticonButton(":12:", "http://img121.imageshack.us/img121/3910/girl12.jpg");
buttons += emoticonButton(":11:", "http://img706.imageshack.us/img706/4010/girl11.jpg");
buttons += emoticonButton(":10:", "http://img52.imageshack.us/img52/6177/girl10.jpg");
buttons += emoticonButton(":9:", "http://img686.imageshack.us/img686/2108/girl9m.jpg");
buttons += emoticonButton(":8:", "http://img132.imageshack.us/img132/527/girl8.gif");
buttons += emoticonButton(":7:", "http://img710.imageshack.us/img710/6642/girl7c.gif");
buttons += emoticonButton(":6:", "http://img718.imageshack.us/img718/5056/girl6.jpg");
buttons += emoticonButton(":5:", "http://img203.imageshack.us/img203/9026/girl5c.jpg");
buttons += emoticonButton(":4:", "http://img651.imageshack.us/img651/6427/girl4h.jpg");
buttons += emoticonButton(":3:", "http://img714.imageshack.us/img714/6323/girl3j.jpg");
buttons += emoticonButton(":2:", "http://img62.imageshack.us/img62/5523/girl2zo.jpg");
buttons += emoticonButton(":1:", "http://img716.imageshack.us/img716/1480/girl1.jpg");
	
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