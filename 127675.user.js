// ==UserScript==
// @name           Newgrounds Psychopath
// @namespace      psycho@snakehole.net
// @description    Selects a random smiley, making you seem like a very confused psychopath.
// @include        http://www.newgrounds.com/bbs/post/reply/*
// ==/UserScript==

function NgPsycho()
{
	var smileys = document.querySelectorAll('.smileyselect input[type="radio"]')

	smileys[0].removeAttribute('checked');
	smileys[Math.floor(Math.random()*41)].setAttribute('checked', 'checked');
}

NgPsycho()