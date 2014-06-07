// ==UserScript==
// @name           Giant Bomb non-streaming videos
// @namespace      by-t2t2
// @description    Makes Giant Bomb videos play over http requests instead of streaming.
// @include        http://www.giantbomb.com/*
// ==/UserScript==
if(document.getElementById('tabcontent-vid_featured')) { // Currently only way to find if it's a video
	document.getElementById('tabcontent-vid_featured').childNodes[4].setAttribute('flashvars', document.getElementById('tabcontent-vid_featured').childNodes[4].getAttribute('flashvars').replace('sparams', 'params')) // Replaces sparams with params to get old data. Suprisingly, it works!
	document.getElementById('tabcontent-vid_featured').childNodes[4].setAttribute('src', document.getElementById('tabcontent-vid_featured').childNodes[4].getAttribute('src')) // Flashes flash... Bad jokes aside, re-loads flash file.
	document.getElementById('tabcontent-vid_featured').childNodes[1].firstChild.firstChild.innerHTML += ' - Streaming disabled'
}