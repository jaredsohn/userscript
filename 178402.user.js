// ==UserScript==
// @name       Usuwanie komentarzy z 'usuń konto'
// @namespace  http://wykop.pl/ludzie/karid
// @version    1.1
// @description  Skrypt traktuje wszystkie komentarze z wybornym żartem "usuń konto" jako zczarnolistowane.
// @include      http://*.wykop.pl/*
// @copyright  2013, karid
// ==/UserScript==

var elements = document.getElementsByClassName('compactcomments');
var blacklist = '<a class="show-comment toggle-comment block lheight20 boxh tdnone dnone tcenter small">pokaż komentarz</a>';

$(function() {
	for(var i = 0; i<elements.length; i++)
	{	var comment = elements[i].innerHTML;
		var blockquote = elements[i].getElementsByTagName('blockquote');
        var p = blockquote[0].getElementsByTagName('p');

		if(comment.toLowerCase().indexOf('usun konto') > -1 || comment.toLowerCase().indexOf('usuń konto') > -1)
		{ elements[i].parentElement.classList.add('hidden');
		  p[0].insertAdjacentHTML('afterend', blacklist);
		}

	}
});