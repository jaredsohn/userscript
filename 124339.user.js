//-----------------------------------------------------------------------//
// © All Copyright by Afeeqah 
// The original code by me and original smilies from bibi1004
// Visit my blog at http://bon-soir-elle.blogspot.com
//-----------------------------------------------------------------------//

// ==UserScript==
// @name           Bibiissmilies
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
	
	buttons += emoticonButton(":1:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-29.gif");
	buttons += emoticonButton(":2:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-21.jpg");
	buttons += emoticonButton(":3:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/74.gif");
	buttons += emoticonButton(":4:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/72.gif");
	buttons += emoticonButton(":5:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/62.jpg");
	buttons += emoticonButton(":6:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/40-1.gif");
	buttons += emoticonButton(":7:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/10-1.gif");
	buttons += emoticonButton(":5:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/11-1.gif");
	buttons += emoticonButton(":9:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/12-1.gif");
	buttons += emoticonButton(":8:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/13-1.gif");
	buttons += emoticonButton(":10:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/14-1.gif");
	buttons += emoticonButton(":11:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/15-1.gif");
	buttons += emoticonButton(":12:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/9-1.gif");
	buttons += emoticonButton(":13:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-28.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-27.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-26.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-25.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-24.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-23.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-22.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-20.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-19.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-18.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-17.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-16.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-15.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-14.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-13.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-12.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-11.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-10.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-9.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-7.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-8.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-6.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-5.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-4.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-3.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-2.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/girl-1.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/cutiepie10.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/cutiepie9.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/cutiepie8.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/cutiepie7.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/cutiepie6.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/cutiepie5.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/cutiepie4.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/cutiepie3.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/cutiepie2.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/cutiepie1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/88.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/87.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/86.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/85.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/84.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/82.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/83.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/81.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/80.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/79.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/78.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/76.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/77.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/71.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/73.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/75.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/68.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/69.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/70.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/65.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/66.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/67.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/64.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/63.jpg");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/062.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/61.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/60.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/59.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/58.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/57.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/56.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/55.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/54.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/054.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/42-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/43.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/44.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/45.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/46.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/47.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/48.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/49.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/50.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/51.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/52.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/53.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/41-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/39-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/38-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/37-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/36-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/038-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/34-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/035.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/35-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/31-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/32-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/33-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/19-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/20-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/22-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/21-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/23-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/24-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/25-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/26-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/27-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/28-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/29-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/30-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/18-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/16-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/17-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/6-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/7-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/8-1.png");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/5-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/4-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/3-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/2-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/1-1.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/42.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/31.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/32.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/33.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/34.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/36.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/35.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/37.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/038.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/38.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/39.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/40.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/41.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/29.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/30.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/28.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/25.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/26.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/27.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/22.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/23.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/24.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/19.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/20.gif");
	buttons += emoticonButton(":angry:", "http://i1097.photobucket.com/albums/g350/missminthe/smilies/21.gif");
	
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

    
