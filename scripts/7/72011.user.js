// Based on the original emoticons for blogger by Fathinie (http://chocthinie.blogspot.com)
// Modified by Nuraina Fathinie (http://chocthinie.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name Emoticons for Blogger Onion 1.0
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

buttons += emoticonButton("nama emotikon", "http://s815.photobucket.com/albums/zz78/Mohd-Zul-Haziq/?action=view&current=15.gif");
buttons += emoticonButton("nama emotikon", "http://s815.photobucket.com/albums/zz78/Mohd-Zul-Haziq/?action=view&current=19.gif");
buttons += emoticonButton("nama emotikon", "http://s815.photobucket.com/albums/zz78/Mohd-Zul-Haziq/?action=view&current=29.gif");
buttons += emoticonButton("nama emotikon", "http://s815.photobucket.com/albums/zz78/Mohd-Zul-Haziq/?action=view&current=yoyo-emoticon-1-048.gif");
buttons += emoticonButton("nama emotikon", "http://s815.photobucket.com/albums/zz78/Mohd-Zul-Haziq/?action=view&current=10.gif");


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