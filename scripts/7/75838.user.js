// ==UserScript==
// @name           CC98_Emotion_insertion_fix_in_firefox
// @namespace      http://blog.kohana.me
// @description    Fix insertion position of emotion when posting or editing
// @include     http://www.cc98.org/reannounce.asp?*
// @include	http://www.cc98.org/announce.asp?*
// @include	http://www.cc98.org/dispbbs.asp?*
// ==/UserScript==
var f = unsafeWindow.insertsmilie; 
var self = unsafeWindow.self;

//This function is used to insert cc98/custom emotion into the textarea after the cursor.
//You can also use this function in other greasemonkey scripts to fix the bug.
unsafeWindow.insertsmilie = function(smilieface) { 
	self.document.frmAnnounce.Content.focus();
	selectionstart = document.getElementsByTagName('textarea')[0].selectionStart;
	selectionend = document.getElementsByTagName('textarea')[0].selectionEnd;
	self.document.frmAnnounce.Content.value = 
		self.document.frmAnnounce.Content.value.substring(0,selectionstart)+smilieface+self.document.frmAnnounce.Content.value.substring(selectionstart);
	document.getElementsByTagName('textarea')[0].setSelectionRange(selectionstart+smilieface.length,selectionstart+smilieface.length);
}