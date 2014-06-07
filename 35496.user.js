// ==UserScript==
// @name           Facebook - Typing Speed Hack
// @namespace      #avg
// @description    Moar fucking up shitty facebook games; I've released a "fix" for this game Usage : every word now becomes "aaaaaaa", so just copy it to the clipboard.
// @include        http://typingspeed.appdelight.com/*
// @version        0.2.2
// ==/UserScript==
with(unsafeWindow)
{
	for(i=0;i<200;i++)
		word_arr[i]="aaaaaaa";
	mode=word_arr
}