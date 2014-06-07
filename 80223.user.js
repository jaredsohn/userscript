
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

buttons += emoticonButton("worried", "http://i984.photobucket.com/albums/ae324/aliaazmi98/worried.png");
buttons += emoticonButton("unsure", "http://i984.photobucket.com/albums/ae324/aliaazmi98/unsure.png");
buttons += emoticonButton("unhappy", "http://i984.photobucket.com/albums/ae324/aliaazmi98/unhappy.png");
buttons += emoticonButton("tongue", "http://i984.photobucket.com/albums/ae324/aliaazmi98/tongue.png");
buttons += emoticonButton("smile", "http://i984.photobucket.com/albums/ae324/aliaazmi98/smile.png");
buttons += emoticonButton("shocked", "http://i984.photobucket.com/albums/ae324/aliaazmi98/shocked.png");
buttons += emoticonButton("scared", "http://i984.photobucket.com/albums/ae324/aliaazmi98/scared.png");
buttons += emoticonButton("oops", "http://i984.photobucket.com/albums/ae324/aliaazmi98/oops.png");
buttons += emoticonButton("mad", "http://i984.photobucket.com/albums/ae324/aliaazmi98/mad.png");
buttons += emoticonButton("hmm", "http://i984.photobucket.com/albums/ae324/aliaazmi98/hrmpf.png");
buttons += emoticonButton("happy", "http://i984.photobucket.com/albums/ae324/aliaazmi98/happy.png");
buttons += emoticonButton("feelgood", "http://i984.photobucket.com/albums/ae324/aliaazmi98/feel-good.png");
buttons += emoticonButton("disagree", "http://i984.photobucket.com/albums/ae324/aliaazmi98/disagree.png");
buttons += emoticonButton("cute", "http://i984.photobucket.com/albums/ae324/aliaazmi98/cute.png");
buttons += emoticonButton("cornysmiled", "http://i984.photobucket.com/albums/ae324/aliaazmi98/corny-smile.png");
buttons += emoticonButton("anger", "http://i984.photobucket.com/albums/ae324/aliaazmi98/anger.png");
buttons += emoticonButton("yuck", "http://i984.photobucket.com/albums/ae324/aliaazmi98/yuck.png");


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