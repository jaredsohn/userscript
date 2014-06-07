?//-----------------------------------------------------------------------//
// Bofu OrangeSmileys
// Chokilala Version
// Visit my blog at http://www.ainurnajwarozaidi.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : blogmenjerit (http://blogmenjerit.com/)

// ==UserScript==
// @name           pinky (1)
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
	buttons += emoticonButton(":01:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thzzz.gif");
	buttons += emoticonButton(":02:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thx2rara.gif");
	buttons += emoticonButton(":03:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thsyafi-1.gif");
	buttons += emoticonButton(":04:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thsweetcouple.gif");
	buttons += emoticonButton(":05:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thsobssobs.gif");
	buttons += emoticonButton(":06:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thribbonlalala.gif");
	buttons += emoticonButton(":07:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thraracar.gif");
	buttons += emoticonButton(":08:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thrara2-1.gif");
	buttons += emoticonButton(":09:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thrara1.gif");
	buttons += emoticonButton(":10:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thquest.gif");
	buttons += emoticonButton(":11:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thnaik.gif");
	buttons += emoticonButton(":12:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thmakeup.gif");
	buttons += emoticonButton(":13:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thlove-4.gif");
	buttons += emoticonButton(":14:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thlove-2-1.gif");
	buttons += emoticonButton(":15:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thlappyrara.gif");
	buttons += emoticonButton(":16:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thkissing.gif");
	buttons += emoticonButton(":17:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thkilat.gif");
	buttons += emoticonButton(":18:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thkbxbhc.gif");
	buttons += emoticonButton(":19:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thkahkah.gif");
	buttons += emoticonButton(":20:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thk2.gif");
	buttons += emoticonButton(":21:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thishk.gif");
	buttons += emoticonButton(":22:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thi_0714.gif");
	buttons += emoticonButton(":23:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thi_0449.gif");
	buttons += emoticonButton(":24:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thhuh.gif");
	buttons += emoticonButton(":25:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thhooray.gif");
	buttons += emoticonButton(":26:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thhkj.gif");
	buttons += emoticonButton(":27:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thhkitty.gif");
	buttons += emoticonButton(":28:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thhk6.gif");
	buttons += emoticonButton(":29:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thhk5.gif");
	buttons += emoticonButton(":30:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thhikhik.gif");
	buttons += emoticonButton(":31:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thhah.gif");
	buttons += emoticonButton(":32:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thgirlheart.gif");
	buttons += emoticonButton(":33:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thgirlcamera.gif");
	buttons += emoticonButton(":34:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thgirl3.gif");
	buttons += emoticonButton(":35:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thggr.gif");
	buttons += emoticonButton(":36:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thfuh.gif");
	buttons += emoticonButton(":37:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thf3feb6653beb74c8f5b029ac4e234e0e.gif");
	buttons += emoticonButton(":38:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thergh.gif");
	buttons += emoticonButton(":39:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thcooking.gif");
	buttons += emoticonButton(":40:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thclap.gif");
        buttons += emoticonButton(":41:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thcine.gif");
	buttons += emoticonButton(":42:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thchorando.gif");
	buttons += emoticonButton(":43:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thcar.gif");
	buttons += emoticonButton(":44:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thbye-3.gif");
	buttons += emoticonButton(":45:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/thand-1.gif");
	buttons += emoticonButton(":46:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/tha2.gif");
	buttons += emoticonButton(":47:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/th481572490355cc2e12bc0cee32ac5ed6.gif");
	buttons += emoticonButton(":48:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/th1237783525-919767.gif");
	buttons += emoticonButton(":49:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/th1399239mk08nhom9u.gif");
	buttons += emoticonButton(":50:", "http://i804.photobucket.com/albums/yy322/ainurnajwarozaidi/th821495.gif");

	
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

    
