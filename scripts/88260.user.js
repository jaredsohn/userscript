// Based on the original emoticons for blogger by Fathinie (http://chocthinie.blogspot.com)
// Modified by Nuraina Fathinie (http://chocthinie.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name Emoticons for Blogger Onion 3.0
// @namespace http://chocthinie.blogspot.com/
// @description You can use emoticons in Blogger. by chocthinie.blogspot.com
// @include http://*.blogger.com/post-edit.g?*
// @include http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname)
{
var editbar = document.getElementById(domname);
if (editbar) {

var buttons = "
";

buttons += emoticonButton(">_<", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy17.png");
buttons += emoticonButton(":3", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy16.png");
buttons += emoticonButton("^_^", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy15.png");
buttons += emoticonButton("<3_<3", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy14.png");
buttons += emoticonButton("-,-", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy13.png");
buttons += emoticonButton("TT^TT", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy12.png");
buttons += emoticonButton(":O", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy11.png");
buttons += emoticonButton("???", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy10.png");
buttons += emoticonButton(">~<", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy9.png");
buttons += emoticonButton(";)", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy8.png");
buttons += emoticonButton("blink", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy7.png");
buttons += emoticonButton("OnO", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy6.png");
buttons += emoticonButton("~.~", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy5.png");
buttons += emoticonButton("/_\", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy4.png");
buttons += emoticonButton(">^<", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy3.png");
buttons += emoticonButton(">.>", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy2.png");
buttons += emoticonButton("\O/", "http://i827.photobucket.com/albums/zz198/aienbeni97/Daisy%20smileys/daisy1.png");


buttons += separator();

editbar.innerHTML += buttons;
}
}


function emoticonButton(name, url) {
return "\";})();ButtonMouseDown(this);'>'\n";
}

function separator() {
return "
\n";
}

setemoticons("formatbar");

}, false);