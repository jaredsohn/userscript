// ==UserScript==
// @name           Facebook Unreminder
// @namespace      *
// @include        https://www.facebook.com/*
// ==/UserScript==

for(var i=0; i<document.getElementsByClassName('clearfix fbRemindersStory').length; i++){
	var reminderDiv = document.getElementsByClassName('clearfix fbRemindersStory')[i];
	reminderDiv.parentNode.removeChild(reminderDiv);
}