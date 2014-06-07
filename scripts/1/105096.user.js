//-----------------------------------------------------------------------//
// Visit my blog at http://akusimple17.blogspot.com
//its complete version
// union_head
//-----------------------------------------------------------------------//

//Original author : simple(http://akusimple17.blogspot.com)

// ==UserScript==
// @name          simple17

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

   var buttons = "
";


  buttons += emoticonButton("::):", "http://i1103.photobucket.com/albums/g463/genkz10/01.gif");
 buttons += emoticonButton("::(:", "http://i1103.photobucket.com/albums/g463/genkz10/02.gif");
 buttons += emoticonButton("::'(:", "http://i1103.photobucket.com/albums/g463/genkz10/03.gif");
 buttons += emoticonButton(":^_^:", "http://i1103.photobucket.com/albums/g463/genkz10/04.gif");
 buttons += emoticonButton(":^^,:", "http://i1103.photobucket.com/albums/g463/genkz10/05.gif");
 buttons += emoticonButton(":>.<:", "http://i1103.photobucket.com/albums/g463/genkz10/06.gif");
 buttons += emoticonButton("::P:", "http://i1103.photobucket.com/albums/g463/genkz10/07.gif");
 buttons += emoticonButton("::D:", "http://i1103.photobucket.com/albums/g463/genkz10/09.gif");
 buttons += emoticonButton(":lari:", "http://i1103.photobucket.com/albums/g463/genkz10/10.gif");
 buttons += emoticonButton(":tido:", "http://i1103.photobucket.com/albums/g463/genkz10/13.gif");
 buttons += emoticonButton(":geram:", "http://i1103.photobucket.com/albums/g463/genkz10/14.gif");
 buttons += emoticonButton(":marah:", "http://i1103.photobucket.com/albums/g463/genkz10/16.gif");
 buttons += emoticonButton(":diam:", "http://i1103.photobucket.com/albums/g463/genkz10/22.gif");
 buttons += emoticonButton(":sunyi:", "http://i1103.photobucket.com/albums/g463/genkz10/26.gif");
 buttons += emoticonButton(":bisu:", "http://i1103.photobucket.com/albums/g463/genkz10/28.gif");
 buttons += emoticonButton(":malas:", "http://i1103.photobucket.com/albums/g463/genkz10/33.gif");
 buttons += emoticonButton(":kecewa:", "http://i1103.photobucket.com/albums/g463/genkz10/40.gif");
 buttons += emoticonButton(":suka:", "http://i1103.photobucket.com/albums/g463/genkz10/41.gif");
 buttons += emoticonButton(":cinta:", "http://i1103.photobucket.com/albums/g463/genkz10/46.gif");
 buttons += emoticonButton(":peluk:", "http://i1103.photobucket.com/albums/g463/genkz10/58.gif");
 buttons += emoticonButton(":sayang:", "http://i1103.photobucket.com/albums/g463/genkz10/63.gif");
 buttons += emoticonButton(":mata:", "http://i1103.photobucket.com/albums/g463/genkz10/65.gif");
 buttons += emoticonButton(":tumbuk:", "http://i1103.photobucket.com/albums/g463/genkz10/66.gif");
 buttons += emoticonButton(":jogging:", "http://i1103.photobucket.com/albums/g463/genkz10/76.gif");
 buttons += emoticonButton(":terkejut:", "http://i1103.photobucket.com/albums/g463/genkz10/79.gif");
 buttons += emoticonButton(":jauh:", "http://i1103.photobucket.com/albums/g463/genkz10/80.gif");
 buttons += emoticonButton(":dekat:", "http://i1103.photobucket.com/albums/g463/genkz10/82.gif");   
 buttons += emoticonButton(":lama:", "http://i1103.photobucket.com/albums/g463/genkz10/87.gif");
 buttons += emoticonButton(":kamu:", "http://i1103.photobucket.com/albums/g463/genkz10/101.gif");
 buttons += emoticonButton(":saya:", "http://i1103.photobucket.com/albums/g463/genkz10/108.gif");

   buttons += separator();

   editbar.innerHTML += buttons;
 }
}


function emoticonButton(name, url) {
 return "\";})();ButtonMouseDown(this);'> \n";
}

function separator() {
 return "
  
\n";
}

setemoticons("formatbar");

}, false);

