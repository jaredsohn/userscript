//-----------------------------------------------------------------------//
// 
// Visit my blog at http://rainbowonigiri.blogspot.com/
//-----------------------------------------------------------------------//

// ==UserScript==
// @name           onigiri-chan ^^
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
	buttons += emoticonButton(":01:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_dancing.gif");

	buttons += emoticonButton(":02:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_xd.gif");

	buttons += emoticonButton(":03:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_ramen.gif");

	buttons += emoticonButton(":04:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_big_eyes.gif");

	buttons += emoticonButton(":05:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_cheerleader.gif");

	buttons += emoticonButton(":06:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_crying_deeply.gif");

	buttons += emoticonButton(":07:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_cute.gif");

	buttons += emoticonButton(":08:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_dance.gif");

	buttons += emoticonButton(":09:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_dead.gif");

	buttons += emoticonButton(":10:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_dizzy.gif");

	buttons += emoticonButton(":11:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_kawaii.gif");

	buttons += emoticonButton(":12:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_happy.gif");

	buttons += emoticonButton(":13:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_oo.gif");

	buttons += emoticonButton(":14:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_smilie.gif");

	buttons += emoticonButton(":15:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_angry.gif");

	buttons += emoticonButton(":16:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_crazy_eyes.gif");

	buttons += emoticonButton(":17:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_scaried.gif");

	buttons += emoticonButton(":18:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_mad_eyes.gif");

	buttons += emoticonButton(":19:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_drink.gif");

	buttons += emoticonButton(":20:", "http://anikaos.com/0038-onigiri_rice_balls/onigiri_sleeping_drop.gif");

	

	
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

