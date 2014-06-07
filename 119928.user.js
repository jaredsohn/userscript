// ==UserScript==
// @name           Dirty-42
// @namespace      ru.dirty
// @description    Dirty-42
// @include        http://dirty.ru/*
// @include        http://*.dirty.ru/*
// ==/UserScript==


var votes = document.querySelectorAll('strong.vote_result');

function _42_It() {

    for (i = 0; i < votes.length; i++) {
        votes[i].textContent = '42';
	votes[i].setAttribute('onclick', '');
    }
}

_42_It();