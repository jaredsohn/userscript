// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Encik Crab
// @namespace      http://dieyna-afieyna.blogspot.com/
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
                      
        buttons += emoticonButton("01", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab1.gif");
buttons += emoticonButton("02", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab2.gif");
buttons += emoticonButton("03", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab3.gif");
buttons += emoticonButton("04", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab4.gif");
buttons += emoticonButton("05", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab5.gif");
buttons += emoticonButton("06", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab6.gif");
buttons += emoticonButton("07", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab7.gif");
buttons += emoticonButton("08", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab8.gif");
buttons += emoticonButton("09", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab9.gif");
buttons += emoticonButton("10", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab10.gif");
buttons += emoticonButton("11", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab11.gif");
buttons += emoticonButton("12", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab12.gif");
buttons += emoticonButton("13", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab13.gif");
buttons += emoticonButton("14", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab14.gif");
buttons += emoticonButton("15", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab15.gif");
buttons += emoticonButton("16", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/crab/crab16.gif");


        
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