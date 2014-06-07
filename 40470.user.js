// ==UserScript==
// @name       Groups Separator
// @namespace  vkontakte.ru
// @author     Sergey Rozhenko
// @include    http://vkontakte.ru/profile.php*
// @include    http://www.vkontakte.ru/profile.php*
// @include    http://vkontakte.ru/id*
// @include    http://www.vkontakte.ru/id*
// ==/UserScript==
//
// http://vkontakte.ru/profile.php?id=2093733
// sergroj@mail.ru

function nextElement(a)
{
	var ret = a.firstChild;
	while (a && !ret)
	{
		ret = a.nextSibling;
		a = a.parentNode;
	}
	return ret;	
}

function isValidDiv(div)
{
	if (!div || div.tagName != 'DIV' || !div.attributes) return false;
	var attr = div.attributes['class'];
	if (!attr) return false;
	return (attr.value == 'flexBox clearFix aPad');
}

function patchPage()
{
	var div = document.getElementById('groups');
	while (div && !isValidDiv(div))
		div = nextElement(div);
	
	if (!div) return;
	var txt = div.firstChild;
	var firstStep = true;
	while (txt)
	{
		if (!firstStep) div.insertBefore(document.createElement('br'), txt);
		txt.nodeValue = String.fromCharCode(0x25AA) + ' ';
		
		// Next group
		txt = txt.nextSibling;
		if (txt) txt = txt.nextSibling;
		if (!txt || !txt.nextSibling) break;
		firstStep = false;
	}
}

document.addEventListener("DOMContentLoaded", patchPage, false);

