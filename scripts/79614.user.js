
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

buttons += emoticonButton("hai", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-001.gif");
buttons += emoticonButton("T_T", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-002.gif");
buttons += emoticonButton("^_^", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-003.gif");
buttons += emoticonButton("^_^"", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-004.gif");
buttons += emoticonButton("O.o", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-005.gif");
buttons += emoticonButton("ish", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-006.gif");
buttons += emoticonButton("xD", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-007.gif");
buttons += emoticonButton(":">", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-008.gif");
buttons += emoticonButton("bye", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-009.gif");
buttons += emoticonButton("=="", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-010.gif");
buttons += emoticonButton("muahaha", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-011.gif");
buttons += emoticonButton(">.<", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/girl/emo-girl-012.gif");


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