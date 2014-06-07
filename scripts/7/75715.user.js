//-----------------------------------------------------------------------//
// Bofu OrangeSmileys
// Chokilala Version
// Visit my blog at http://www.ainurnajwarozaidi.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : blogmenjerit (http://blogmenjerit.com/)

// ==UserScript==
// @name           Kawaii Emoticons (4)
// ==/UserScript==

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

window.addEventListener("load", function(e) {

function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";

buttons += emoticonButton(":01:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/cooking.png");
	buttons += emoticonButton(":02:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/coffee.png");
	buttons += emoticonButton(":03:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/christmastree.gif");
	buttons += emoticonButton(":04:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/chocolate.png");
	buttons += emoticonButton(":05:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/cherryhappy.png");
	buttons += emoticonButton(":06:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/cherry.png");
	buttons += emoticonButton(":07:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/cart.png");
	buttons += emoticonButton(":08:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/camera.png");
	buttons += emoticonButton(":09:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/cake.png");
	buttons += emoticonButton(":10:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/bzbee.png");
        buttons += emoticonButton(":11:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/bread.png");
	buttons += emoticonButton(":12:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/bra.png");
	buttons += emoticonButton(":13:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/bowl.png");
	buttons += emoticonButton(":14:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/blythedolls.png");
	buttons += emoticonButton(":15:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/blythe.png");
	buttons += emoticonButton(":16:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/blog.png");
	buttons += emoticonButton(":17:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/blackcar.png");
	buttons += emoticonButton(":18:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/below.png");
	buttons += emoticonButton(":19:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/bath1.png");
	buttons += emoticonButton(":20:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/balloons.png");
	buttons += emoticonButton(":21:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/babyt.png");
	buttons += emoticonButton(":22:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/babymilkbottle.png");
	buttons += emoticonButton(":23:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/baby.png");
	buttons += emoticonButton(":24:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/atuk.png");
	buttons += emoticonButton(":25:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/arrow.png");
	buttons += emoticonButton(":26:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/and2.png");
        buttons += emoticonButton(":27:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/and1.png");
	buttons += emoticonButton(":28:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/above.png");
	buttons += emoticonButton(":29:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/687455.gif");
	buttons += emoticonButton(":30:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/687438.gif");
	buttons += emoticonButton(":31:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/emoticons%20kawaii/7Eleven.gif");

	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);

    
