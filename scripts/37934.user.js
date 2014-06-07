/*
version: 0.1
*/

// ==UserScript==
// @name          Frenzyboard Sparkles
// @author	  Kristina Hansen <kristina@kristinahansen.com.com>
// @namespace     http://www.kristinahansen.com/
// @description	  Adds Sparkles to Frenzyboard
// @include       http://*frenzyboard.net/*
// Based on Hans' scripts. See www.hansv.com
// ==/UserScript==





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
	accessBar.innerHTML = "<a href=\"javascript:tagIt('[robin]','[/robin]',"+ i +")\" accesskey='r' title='Alt+R (Ctrl for Mac users)'><span class='sngl'>Sparkles!</span></a> | ";
	
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
	accessBar.innerHTML = "<a href=\"javascript:tagIt('[robin]','[/robin]',"+ i +")\">Robin</a>";
	
	unsafeWindow.textArray[i].parentNode.insertBefore(accessBar, unsafeWindow.textArray[i]);
}
return;
}

