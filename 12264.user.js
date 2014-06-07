/*
version: 0.9
*/

// ==UserScript==
// @name          Frenzyboard QuickEdit
// @author	  Hans van de Bruggen <pintong@gmail.com>
// @namespace     http://greasemonkey.hansv.com/
// @edited	  Kristina Hansen <kristina@kristinahansen.com.com>
// @namespace     http://www.kristinahansen.com/
// @description	  Adds links for Quoting, Italics, Bold, Underlining, Links and Images to text areas at Frenzies Underground.
// @include       http://*frenzyboard.net/*
// ==/UserScript==
//  New in 1.0:
//  Added strike through!
//  Thanks to Klif for setting up the board for it.
//  New in 0.9:
//  Links and images have "http://" removed automatically, so you don't have to 
//  worry about forgetting to remove it yourself. Also, keyboard shortcuts were 
//  added to let you format your text using Alt (Ctrl on Mac) and the shortcut key!
//  Thanks to Mikeawesome for helping me beta test.
//
//  TODO:
//  After selecting text and making a link or image the cursor is left at back at the
//  point it was at before making a link. Fix this to put the cursor after the formatting.
//  
//  New in 0.5:
//  First version (also, my first ever script!)
//  Based off Jason Rhyley's "Flickr Rich Edit" script at http://www.rhyley.org/gm/ 
//  (available under Creative Commons Attribution-NonCommercial-ShareAlike 2.0)
//
//  TODO:
//  Automatically remove 'http://' from links and images if the user does not. [done in ver. 0.9]
//  Add keyboard shortcuts? [also done in ver. 0.9!]



enableShortcuts = true;		// Set this to "false" to disable keyboard shortcuts.



/*
function checkPrefs () {

  if( getpref( 'enableShortcuts', true ) ) {
    shortcutMode();
  } 
	else {
    start();
  }
  //return;
}
*/

(function start () 	{
if(enableShortcuts) { shortcutMode(); }
else                { classicMode(); }
		})();

// Shortcut mode -------------------------------
function shortcutMode () {
unsafeWindow.tagIt = function (tagOpen,tagClose,i) {
	var v = unsafeWindow.textArray[i].value;
	var selLength = unsafeWindow.textArray[i].textLength;
	var selStart = unsafeWindow.textArray[i].selectionStart;
	var selEnd = unsafeWindow.textArray[i].selectionEnd;
	if (selEnd==1 || selEnd==2) selEnd=selLength;
	var start = (v).substring(0,selStart);
	var middle = (v).substring(selStart, selEnd)
	var end = (v).substring(selEnd, selLength);
	unsafeWindow.textArray[i].value = start + tagOpen + middle + tagClose + end;
	
	unsafeWindow.textArray[i].selectionStart = selStart + tagOpen.length;
	unsafeWindow.textArray[i].selectionEnd = (selEnd - 1) + tagClose.length;
	unsafeWindow.textArray[i].focus();
}

unsafeWindow.linkIt = function (i) {
	var myLink = prompt("Enter URL:",""); // Enter a highlighted message in the 2nd "" if you need one
	if (myLink != null) {
		unsafeWindow.tagIt('[link=' +httpHack(myLink) + ']','[/link]', i);
	}
}

unsafeWindow.imgIt = function (i) {
	var myImg = prompt("Enter image URL:",""); // Enter a highlighted message in the 2nd "" if you need one
	if (myImg != null) {
		unsafeWindow.tagIt('[image]' +httpHack(myImg) + '[/image]','', i);
	}
}

textareas = document.evaluate("//textarea",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
unsafeWindow.textArray = new Array();

for (i=0; i<textareas.snapshotLength; i++) {
	unsafeWindow.textArray[i] = textareas.snapshotItem(i);
	var accessBar = document.createElement("div");
	accessBar.setAttribute('class','shortcutDiv');
	accessBar.innerHTML = "<a href=\"javascript:tagIt('[quote]','[/quote]',"+ i +")\" accesskey='q' title='Alt+Q (Ctrl for Mac users)'><span class='sngl'>Q</span>uote</a> | " +
       		"<a href=\"javascript:tagIt('[i]','[/i]',"+ i +")\" accesskey='i' title='Alt+I (Ctrl for Mac users)'><i><span class='sngl'>I</span>talic</i></a> | " +
		"<a href=\"javascript:tagIt('[b]','[/b]',"+ i +")\" accesskey='b' title='Alt+B (Ctrl for Mac users)'><b><span class='sngl'>B</span>old</b></a> | " +
		"<a href=\"javascript:tagIt('[u]','[/u]',"+ i +")\" accesskey='u' title='Alt+U (Ctrl for Mac users)'><span class='dble'>U</span><span class='sngl'>nderline</span></a> | " +
		"<a href=\"javascript:tagIt('[s]','[/s]',"+ i +")\" accesskey='s' title='Alt+S (Ctrl for Mac users)'><s><span class='sngl'>S</span>trike</s> Throug</a> | " +
		"<a href=\"javascript:linkIt("+i+")\" accesskey='l' title='Alt+L (Ctrl for Mac users)'><span class='sngl'>L</span>ink</a> | " + 
		"<a href=\"javascript:imgIt("+i+")\" accesskey='m' title='Alt+M (Ctrl for Mac users)'>I<span class='sngl'>m</span>age</a>";
	
	unsafeWindow.textArray[i].parentNode.insertBefore(accessBar, unsafeWindow.textArray[i]);
}
return;
}

// Classic mode -------------------------------

function classicMode(){
unsafeWindow.tagIt = function (tagOpen,tagClose,i) {
	var v = unsafeWindow.textArray[i].value;
	var selLength = unsafeWindow.textArray[i].textLength;
	var selStart = unsafeWindow.textArray[i].selectionStart;
	var selEnd = unsafeWindow.textArray[i].selectionEnd;
	if (selEnd==1 || selEnd==2) selEnd=selLength;
	var start = (v).substring(0,selStart);
	var middle = (v).substring(selStart, selEnd)
	var end = (v).substring(selEnd, selLength);
	unsafeWindow.textArray[i].value = start + tagOpen + middle + tagClose + end;
	
	unsafeWindow.textArray[i].selectionStart = selStart + tagOpen.length;
	unsafeWindow.textArray[i].selectionEnd = (selEnd - 1) + tagClose.length;
	unsafeWindow.textArray[i].focus();
}

unsafeWindow.linkIt = function (i) {
	var myLink = prompt("Enter URL:","");
	if (myLink != null) {
		unsafeWindow.tagIt('[link=' +httpHack(myLink) + ']','[/link]', i);
	}
}

unsafeWindow.imgIt = function (i) {
	var myImg = prompt("Enter image URL:","");
	if (myImg != null) {
		unsafeWindow.tagIt('[image]' +httpHack(myImg) + '[/image]','', i);
	}
}

textareas = document.evaluate("//textarea",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
unsafeWindow.textArray = new Array();

for (i=0; i<textareas.snapshotLength; i++) {
	unsafeWindow.textArray[i] = textareas.snapshotItem(i);
	var accessBar = document.createElement("div");
	accessBar.setAttribute('style','');
	accessBar.innerHTML = "<a href=\"javascript:tagIt('[quote]','[/quote]',"+ i +")\">Quote</a> | " +
        "<a href=\"javascript:tagIt('[i]','[/i]',"+ i +")\"><i>Italic</i></a> | " +
		"<a href=\"javascript:tagIt('[b]','[/b]',"+ i +")\"><b>Bold</b></a> | " +
		"<a href=\"javascript:tagIt('[u]','[/u]',"+ i +")\"><u>Underline</u></a> | " +
		"<a href=\"javascript:linkIt("+i+")\">Link</a> | " + 
		"<a href=\"javascript:imgIt("+i+")\">Image</a>";
	
	unsafeWindow.textArray[i].parentNode.insertBefore(accessBar, unsafeWindow.textArray[i]);
}
return;
}

// Begin http:// remover
// Many thanks to my brother Pieter for helping me with this: pvande@gmail.com

function httpHack(url)
{
	var toRet = url;
	
	if (url.indexOf("http://") == 0)
	{
		toRet = url.substring(7);
	}
	else if (url.indexOf("https://") == 0) 	// https links won't work, but that 
												// can't be changed with a script. The 
												// board adds its own http:// by itself,
												// which is why this hack is needed in
												// the first place. This will send a 
												// user to the http version of a https
												// link.
	{
		toRet = url.substring(8);
	}
	
	return toRet;
}

// Underline / double underline CSS
function addCSSStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addCSSStyle('.sngl { border-bottom-style: solid !important; border-bottom-width: 1px}');
addCSSStyle('.dble { border-bottom-style: double !important; border-bottom-width: 3px !important}');
addCSSStyle('.shortcutDiv { text-decoration: none; margin-bottom: 4px }');
addCSSStyle('.shortcutDiv a:hover { text-decoration: none; border-bottom-style: solid; border-bottom-width: 1px !important}');