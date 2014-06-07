// ==UserScript==
// @name           Avanturist_autoexpand_script
// @description    Avanturist autoexpand script
// @version        0.2
// @include        http://glav.su*
// @include        http://www.glav.su*
// @include        https://glav.su*
// @include        https://www.glav.su*
// @grant          none
// ==/UserScript==

var ms = 500;

function secondl() {
var e;

e = document.getElementsByClassName('forumBoardSuperTopicExpandButton blackToggle bold');
for (i=0; i<e.length; i++) {
	e[i].click();
};
}

setTimeout(secondl, ms);