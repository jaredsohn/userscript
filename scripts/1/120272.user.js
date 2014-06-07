// ==UserScript==
// @name           Bash.org.ru Tweaker / Улучшайзер Башорга
// @version 1.4
// @description Brings back old monospace font, removes ads / Возвращает старый шрифт Courier (до изменения дизайна), убирает рекламу
// @include        http://bash.org.ru/*
// @include        http://bash.im/*
// ==/UserScript==

fontFamily = "Courier, Courier New";

// change the font for the body
document.body.style.fontFamily = fontFamily;

// change the font for the .inputtext class
elements = document.getElementsByClassName('text');
for(i = 0 ; i < elements.length ; i++) {
    elements[i].style.fontFamily = fontFamily;
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

// removes ads
function AdsBeGone()
{
	var quotes = document.getElementsByClassName('quote');
	for(i = 0 ; i < quotes.length ; i++) {
		var elem = quotes[i];
			
			if( !hasClass( elem, 'actions' ) )
				elem.parentNode.removeChild(elem);
				
	}
}

// remove iframe
function remove(id)
{
    return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}

function removeAllIframes()
{
    var iframes = document.getElementsByTagName("iframe");
}

function removeObjects()
{
	var objects = document.getElementsByTagName("object");
	while (objects.length)
		objects[0].parentNode.removeChild(objects[0]);
}


remove('ctf');
removeAllIframes();
removeObjects();
AdsBeGone();
