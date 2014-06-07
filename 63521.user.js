// Based on the original tutorial by Eriyza (http://eriyza.via.my/ | http://eriyza.aeropama.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Eriyza Emoticons for Blogger by Eriyza
// @namespace      http://eriyzaqistina.blogspot.com
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
        buttons += emoticonButton("hp", "http://i377.photobucket.com/albums/oo215/mimimeowcute/fon.gif");
buttons += emoticonButton("girl", "http://i377.photobucket.com/albums/oo215/mimimeowcute/girl-1.gif");
buttons += emoticonButton("bunny", "http://i377.photobucket.com/albums/oo215/mimimeowcute/girl.png");
buttons += emoticonButton("hk", "http://i377.photobucket.com/albums/oo215/mimimeowcute/hk2.png");
buttons += emoticonButton("rumah", "http://i377.photobucket.com/albums/oo215/mimimeowcute/house.png");
buttons += emoticonButton("kasut", "http://i377.photobucket.com/albums/oo215/mimimeowcute/kasut.png");
buttons += emoticonButton("makan", "http://i377.photobucket.com/albums/oo215/mimimeowcute/makan2.gif");
buttons += emoticonButton("cerah", "http://i377.photobucket.com/albums/oo215/mimimeowcute/mtahari.gif");
buttons += emoticonButton("hadiah", "http://i377.photobucket.com/albums/oo215/mimimeowcute/parcel.png");
buttons += emoticonButton("laptop", "http://i377.photobucket.com/albums/oo215/mimimeowcute/pc2.gif");
buttons += emoticonButton("sekolah", "http://i377.photobucket.com/albums/oo215/mimimeowcute/skola.png");
buttons += emoticonButton("graudet", "http://i377.photobucket.com/albums/oo215/mimimeowcute/thminifacul.gif");
buttons += emoticonButton("shopping", "http://i377.photobucket.com/albums/oo215/mimimeowcute/trolley.gif");
buttons += emoticonButton("bufday", "http://i377.photobucket.com/albums/oo215/mimimeowcute/108c.gif");
buttons += emoticonButton("jln", "http://i377.photobucket.com/albums/oo215/mimimeowcute/bag.gif");
buttons += emoticonButton("baju", "http://i377.photobucket.com/albums/oo215/mimimeowcute/baju.png");
buttons += emoticonButton("bus", "http://i377.photobucket.com/albums/oo215/mimimeowcute/bas.gif");
buttons += emoticonButton("boy", "http://i377.photobucket.com/albums/oo215/mimimeowcute/boyis.gif");
buttons += emoticonButton("buku", "http://i377.photobucket.com/albums/oo215/mimimeowcute/buku.gif");
buttons += emoticonButton("cake", "http://i377.photobucket.com/albums/oo215/mimimeowcute/cake.png");
buttons += emoticonButton("camera", "http://i377.photobucket.com/albums/oo215/mimimeowcute/camera.gif");
buttons += emoticonButton("coklat", "http://i377.photobucket.com/albums/oo215/mimimeowcute/cklat.png");
buttons += emoticonButton("kuar", "http://i377.photobucket.com/albums/oo215/mimimeowcute/car.png");
       
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"50\\\" height=\\\"50\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img width=\"25\" height=\"25\" src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);