// ==UserScript==

// @name          Millie's "Next" All the Cats

// @namespace     http://catroulette.be

// @description   Next all the cats to make them feel unwanted

// @include       http://catroulette.be/*

// ==/UserScript==

function goNext()
{
	window.location.href = $(".btn-next").attr('href');
}

window.addEventListener('load', goNext,true);