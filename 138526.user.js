// ==UserScript==
// @name           Post to Facebook - auto unticker
// @namespace      http://userscripts.org/users/lorriman
// @description    Avoid accidental posts to your facebook profile when you comment on 3rd party websites.
// @version .1
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @match        http://www.facebook.com/*
// @match        https://www.facebook.com/*
// ==/UserScript==

checkboxes=document.getElementsByClassName('postToProfileCheckbox');
for(i=0;i<checkboxes.length;i++){
	checkboxes[i].setAttribute('checked','0');
	checkboxes[i].click();
}
