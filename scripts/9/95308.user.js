//
// ==UserScript==
// @name          Dirty New Comments Fix
// @author        crea7or
// @namespace     http://dirty.ru/
// @include       http://dirty.ru/*
// @include       http://www.dirty.ru/*
// ==/UserScript==


var divNc = document.getElementById('js-comments');
if ( divNc )
{
	var divClass = divNc.getAttribute('class');
	divClass = divClass.replace(/new_only/ig, '');
	divNc.setAttribute('class', divClass );
}
