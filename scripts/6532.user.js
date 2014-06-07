// ==UserScript==
// @name		BlockFlash-Revisited
// @namespace		http://snippets.dzone.com/posts/show/3054
// @description	Do not start Flash animation until you click on them.
// @include		*
// @exclude		http://www.macromedia.com/*
// @exclude		http://www.atomfilms.com/*
// @exclude		http://uploads.ungrounded.net/*
// @exclude		http://www.albinoblacksheep.com/*
// ==/UserScript==

/*
	Revised by Andrew Pennebaker (andrew.pennebaker@gmail.com)

	Author: Jos van den Oever (jos@vandenoever.info)

	License: GPL

	Version history:
		2006-02-12: initial version
		2006-11-28: changed appearance

Inspiration for this script comes from the removeFlash script and the FlashBlock firefox extension.
*/

(function () {
	var objects=document.getElementsByTagName("object");

	for (i=0; i<objects.length; i++) {
		var flash=objects[i];

		if (flash.innerHTML.match(/.swf|shockwave|flash/)) {
			var placeholder=document.createElement("div");

			placeholder.style.cursor='pointer';
			placeholder.style.background='orange'; // 'gray '
			placeholder.style.textAlign='center';
			placeholder.style.color='black';
			placeholder.innerHTML="[Play Flash]";

			flash.parentNode.insertBefore(placeholder, flash);
			flash.on=false;

			placeholder.addEventListener(
				'click',
				function() {
					if (flash.on) {
						flash.style.display='none';
						placeholder.innerHTML="[Play Flash]";
						flash.on=false;
					}
					else {
						flash.style.display='';
						placeholder.innerHTML="[Stop Flash]";
						flash.on=true;
					}
				},
				true
			);

			flash.style.display='none';
		}
	}
})();