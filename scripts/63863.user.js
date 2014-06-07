// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by TheNurinAdlina (http://nurinadlina.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons beside the last text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Small Kawaii (Nurin)
// @namespace      http://nurinadlina.blogspot.com/
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
                      
        buttons += emoticonButton("01", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaobiggrin.gif");
buttons += emoticonButton("02", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaoblank.gif");
buttons += emoticonButton("03", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaoblush.gif");
buttons += emoticonButton("04", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaocheering.gif");
buttons += emoticonButton("05", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaoconfused.gif");
buttons += emoticonButton("06", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaocool.gif");
buttons += emoticonButton("07", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaocry.gif");
buttons += emoticonButton("08", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaocute.gif");
buttons += emoticonButton("09", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaoevilo.gif");
buttons += emoticonButton("10", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaohappy.gif");
buttons += emoticonButton("11", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaokiss.gif");
buttons += emoticonButton("12", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaolaughing.gif");
buttons += emoticonButton("13", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaolol.gif");
buttons += emoticonButton("14", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaolove.gif");
buttons += emoticonButton("15", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaomadz.gif");
buttons += emoticonButton("16", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaomouthshut.gif");
buttons += emoticonButton("17", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaonod.gif");
buttons += emoticonButton("18", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaoposh.gif");
buttons += emoticonButton("19", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaoregular.gif");
buttons += emoticonButton("20", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaosad.gif");
buttons += emoticonButton("21", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaoshocked.gif");
buttons += emoticonButton("22", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaosick.gif");
buttons += emoticonButton("23", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaosmile.gif");
buttons += emoticonButton("24", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaosweat.gif");
buttons += emoticonButton("25", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaotongueo.gif");
buttons += emoticonButton("26", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaowink.gif");
buttons += emoticonButton("27", "http://i569.photobucket.com/albums/ss139/newryn/nurin/kaoyesp.gif");

        
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