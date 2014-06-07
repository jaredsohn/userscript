//-----------------------------------------------------------------------//
// Minimo Smileys
// Chokilala Version
// Visit my blog at http://www.chokilala.com
//-----------------------------------------------------------------------//

//Credits to original author : blogmenjerit (http://blogmenjerit.com/)

// ==UserScript==
// @name           Minimo Smileys (Chokilala.com)
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
	buttons += emoticonButton(":minimo_01:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/58.gif");
	buttons += emoticonButton(":minimo_02:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/59.gif");
	buttons += emoticonButton(":minimo_03:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/60.gif");
	buttons += emoticonButton(":minimo_04:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/61.gif");
	buttons += emoticonButton(":minimo_05:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/40.gif");
	buttons += emoticonButton(":minimo_06:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/41.gif");
	buttons += emoticonButton(":minimo_07:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/42.gif");
	buttons += emoticonButton(":minimo_08:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/43.gif");
	buttons += emoticonButton(":minimo_09:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/45.gif");
	buttons += emoticonButton(":minimo_10:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/46.gif");
	buttons += emoticonButton(":minimo_11:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/47.gif");
	buttons += emoticonButton(":minimo_12:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/48.gif");
	buttons += emoticonButton(":minimo_13:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/50.gif");
	buttons += emoticonButton(":minimo_14:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/51.gif");
	buttons += emoticonButton(":minimo_15:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/52.gif");
	buttons += emoticonButton(":minimo_16:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/53.gif");
	buttons += emoticonButton(":minimo_17:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/55.gif");
	buttons += emoticonButton(":minimo_18:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/56.gif");
	buttons += emoticonButton(":minimo_19:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/57.gif");
    buttons += emoticonButton(":minimo_20:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/13.gif");
	buttons += emoticonButton(":minimo_21:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/2.gif");
	buttons += emoticonButton(":minimo_22:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/20.gif");
	buttons += emoticonButton(":minimo_23:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/23.gif");
	buttons += emoticonButton(":minimo_24:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/24.gif");
	buttons += emoticonButton(":minimo_25:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/29.gif");
	buttons += emoticonButton(":minimo_26:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/30.gif");
	buttons += emoticonButton(":minimo_27:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/31.gif");
	buttons += emoticonButton(":minimo_28:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/32.gif");
	buttons += emoticonButton(":minimo_29:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/33.gif");
	buttons += emoticonButton(":minimo_30:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/34.gif");
	buttons += emoticonButton(":minimo_31:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/35.gif");
	buttons += emoticonButton(":minimo_32:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/36.gif");
	buttons += emoticonButton(":minimo_33:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/37.gif");
	buttons += emoticonButton(":minimo_34:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/38.gif");
	buttons += emoticonButton(":minimo_35:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/cute1.gif");
	buttons += emoticonButton(":minimo_36:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/cute2.gif");
	buttons += emoticonButton(":minimo_37:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/cute3.gif");
	buttons += emoticonButton(":minimo_38:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/cute4.gif");
	buttons += emoticonButton(":minimo_39:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/cute5.gif");
	buttons += emoticonButton(":minimo_40:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/cute6.gif");
	buttons += emoticonButton(":minimo_41:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/cute7.gif");
	buttons += emoticonButton(":minimo_42:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/cute8.gif");
	buttons += emoticonButton(":minimo_43:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/cute9.gif");
	buttons += emoticonButton(":chokilala:", "http://i305.photobucket.com/albums/nn235/izah87/minimo/chokilala_.gif");
	
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

    
