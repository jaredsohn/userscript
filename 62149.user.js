// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://ceritabasiaisya.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           gile Emoticons
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
                     
buttons += emoticonButton("emoticon01", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu1.gif");
buttons += emoticonButton("emoticon02", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu2.gif");
buttons += emoticonButton("emoticon03", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu3.gif");
buttons += emoticonButton("emoticon04", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu4.gif");
buttons += emoticonButton("emoticon05", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu5.gif");
buttons += emoticonButton("emoticon06", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu6.gif");
buttons += emoticonButton("emoticon07", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu7.gif");
buttons += emoticonButton("emoticon08", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu8.gif");
buttons += emoticonButton("emoticon09", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu9.gif");
buttons += emoticonButton("emoticon10", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu10.gif");
buttons += emoticonButton("emoticon11", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu11.gif");
buttons += emoticonButton("emoticon12", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu12.gif");
buttons += emoticonButton("emoticon13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu13.gif");
buttons += emoticonButton("emoticon14", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu14.gif");
buttons += emoticonButton("emoticon15", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu15.gif");
buttons += emoticonButton("emoticon16", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu16.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu17.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu18.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu19.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu20.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu21.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu22.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu23.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/donggu/donggu24.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri1.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri2.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri3.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri4.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri5.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri6.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri7.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri8.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri9.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri10.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri11.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri12.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri13.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri14.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri15.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri16.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri17.gif");
buttons += emoticonButton("emoticon17", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/onigiri/onigiri18.gif");



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