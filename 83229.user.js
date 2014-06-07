// ==UserScript==
// @name			Hide "who to follow"
// @description		Removes Twitter's new annoying "who to follow" on your timeline.
// @include			http://twitter.com/
// @include			https://twitter.com/
// @creator			Jarred Trainor
// ==/UserScript==

document.getElementById('recommended_users').setAttribute('style', 'display:none');
document.getElementById('primary_nav').style.marginTop='10px';
