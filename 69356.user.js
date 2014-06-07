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
var editbar = dodesudesuent.getElementById(domname);
if (editbar) {

var buttons = "
";

buttons += emoticonButton("shocked", "http://img21.imageshack.us/img21/3092/shockedy.png");
buttons += emoticonButton("yuck", "http://img97.imageshack.us/img97/5865/yuck.png");
buttons += emoticonButton("opps", " http://img504.imageshack.us/img504/9153/oopsg.png");
buttons += emoticonButton("tounge", " http://img211.imageshack.us/img211/3950/tongue.png");
buttons += emoticonButton("corny smile", " http://img222.imageshack.us/img222/717/cornysmile.png");
buttons += emoticonButton("cute", " http://img211.imageshack.us/img211/7623/cutex.png");
buttons += emoticonButton("disagree", " http://img442.imageshack.us/img442/7227/disagree.png");
buttons += emoticonButton("unsure", " http://img709.imageshack.us/img709/2584/unsure.png");
buttons += emoticonButton("fell-good", " http://img517.imageshack.us/img517/6315/feelgood.png");
buttons += emoticonButton("happy", " http://img28.imageshack.us/img28/1286/happyg.png");
buttons += emoticonButton("scared", " http://img213.imageshack.us/img213/1894/scaredq.png");
buttons += emoticonButton("hrmpf", " http://img96.imageshack.us/img96/2155/hrmpf.png");
buttons += emoticonButton("smile", " http://img62.imageshack.us/img62/3204/smilep.png");
buttons += emoticonButton("mad", " http://img521.imageshack.us/img521/3236/madw.png");
buttons += emoticonButton("unhappy", " http://img11.imageshack.us/img11/7121/unhappy.png");
buttons += emoticonButton("angero", " http://img692.imageshack.us/img692/1338/angero.png");
buttons += emoticonButton("worried ", " http://img186.imageshack.us/img186/4421/worried.png");
buttons += emoticonButton("not-content", " http://img269.imageshack.us/img269/9264/notcontent.png");


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
