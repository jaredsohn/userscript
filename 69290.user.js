
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

buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/9.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/8.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/7.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/6.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/51.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/5.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/49.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/48.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/47.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/46.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/45.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/43.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/42.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/4.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/39.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/38.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/37.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/36.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/35.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/34.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/33.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/32.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/31.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/30.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/3.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/29.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/28.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/27.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/26.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/25.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/24.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/23.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/22.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/21.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/2.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/19.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/18.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/16.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/11.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/10.gif");
buttons += emoticonButton("fathinie", "http://i890.photobucket.com/albums/ac106/Fathinie1905/Emoticons/1.gif");



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

}, false