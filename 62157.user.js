// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by theaisya (http://ceritabasiaisya.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           aisya3 Emoticons
// @namespace      http://ceritabasiaisya.blogspot.com
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
                     
buttons += emoticonButton("emoticon01", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-001.gif");
buttons += emoticonButton("emoticon02", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-002.gif");
buttons += emoticonButton("emoticon03", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-003.gif");
buttons += emoticonButton("emoticon04", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-004.gif");
buttons += emoticonButton("emoticon05", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-005.gif");
buttons += emoticonButton("emoticon06", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-006.gif");
buttons += emoticonButton("emoticon07", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-007.gif");
buttons += emoticonButton("emoticon08", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-008.gif");
buttons += emoticonButton("emoticon09", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-009.gif");
buttons += emoticonButton("emoticon10", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-010.gif");
buttons += emoticonButton("emoticon11", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-011.gif");
buttons += emoticonButton("emoticon12", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-012.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-013.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-014.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-015.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-016.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-017.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-018.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-019.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-020.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-021.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-022.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-023.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-024.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-025.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-026.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-027.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-028.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-029.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-030.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-031.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-032.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-033.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-034.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-030.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-035.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-036.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-037.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-038.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-039.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-040.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-041.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-042.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-043.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-044.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-045.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-046.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-047.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-048.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-049.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-050.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-051.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-052.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-053.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-054.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-055.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-056.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-057.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-058.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-059.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-060.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-061.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-062.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-063.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-064.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-065.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-066.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-067.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-068.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-069.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/fun%20girl/funny-girl-emo-070.gif");






    buttons += separator();
    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"\\\" height=\\\"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);