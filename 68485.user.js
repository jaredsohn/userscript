// ==UserScript==
// @name           alertOnNonEmptyTextArea
// @namespace      tmb
// @include        http*://*themixingbowl.org/thread/*
// @include        http*://*themixingbowl.org/my/prefs/*
// @include        http*://*tmb.dj/thread/*
// @include        http*://*tmb.dj/my/prefs/*
// @include        http*://*themixingbowl.org/message/send/*
// @include        http*://*themixingbowl.org/torrent/upload/*
// @include        http*://*themixingbowl.org/forum/newthread/*
// @include        http*://*tmb.dj/message/send/*
// @include        http*://*tmb.dj/torrent/upload/*
// @include        http*://*tmb.dj/forum/newthread/*
// @include        http*://*dubstepforum.com/posting*

// ==/UserScript==

/*Based on code by Anthony Lieuallen, and O'Reillys Greasemonkey hacks
http://www.arantius.com/article/arantius/protect+textarea/
http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Web_Forms#Confirm_Before_Closing_Modified_Pages
*/

//indicator to skip handler because the unload is caused by form submission
var _pt_skip=false;
var real_submit = null;

//find all textarea elements and record their original value
var els=document.evaluate('//textarea', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var el=null, i=0; el=els.snapshotItem(i); i++) {
	var real_el = el.wrappedJSObject || el;
	real_el._pt_orig_value=el.value;
}

//if i>0 we found textareas, so do the rest
if (i == 0) { return; }

//this function handles the case where we are submitting the form,
//in this case, we do not want to bother the user about losing data
var handleSubmit = function() {
	_pt_skip=true;
	return real_submit();
}
	
//this function will handle the event when the page is unloaded and
//check to see if any textareas have been modified
var handleUnload = function() {
	if (_pt_skip) { return; }
	var els=document.getElementsByTagName('textarea');
	for (var el=null, i=0; el=els[i]; i++) {
		var real_el = el.wrappedJSObject || el;
		if (real_el._pt_orig_value!=el.value && el.value != '') {
			return '';
		}
	}
}

// trap unload to check for unmodified textareas
unsafeWindow.onbeforeunload = handleUnload;