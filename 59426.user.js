// ==UserScript==
// @name           Badoo
// @include        http://badoo.com/*
// @include        http://*.badoo.com/*
// ==/UserScript==

cls = ['priority_messages', 'spotlight', 'attach_them', 'bann']
for (i in cls) {
	x = document.getElementsByClassName(cls[i])
	if (x[0]) x[0].style.display = 'none';
}

document.getElementById('wrap1').style.paddingBottom = 0;

if (/contacts\/message/.test(location)) {
	document.getElementById('userlist').style.width = '150px';
	document.getElementById('userlist').style.overflow = 'hidden';
	document.getElementById('messages').style.marginLeft = '151px';
	document.getElementById('first').style.marginLeft = '151px';
	document.getElementById('type').style.marginLeft = '151px';
	document.getElementById('type_disabled').style.marginLeft = '151px';
	window.resizeTo(550,500);
}

for(i = 0; i < document.links.length; ++i) {
  with (document.links[i]) {
		if (/\?relationship=(Taken|Open)/.test(href)) {
			style.color = 'red';
			style.fontSize = '42px';
			style.textDecoration = 'none';
			style.fontWeight = 'bold';
			style.lineHeight = 1;
		}
	}
}
