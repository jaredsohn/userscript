// ==UserScript==
// @name           forum.a42.ru
// @include        http://forum.a42.ru/*
// ==/UserScript==

var b = document.getElementsByTagName('body')[0];

b.removeChild(b.childNodes[0]);
b.removeChild(b.childNodes[0]);

var wrap = document.getElementById("wrap");

for (var i=0; i<wrap.childNodes.length; i++)
{
	//alert(wrap.childNodes[i].tagName);
}

wrap.removeChild(wrap.childNodes[7]);



var b = document.getElementsByTagName('b');

for (var i=0; i<b.length; i++)
{
    //alert(i+'\n'+b[i].innerHTML+'\n'+b[i].innerHTML.length);
    /*if (b[i].innerHTML.match(/Кемерова/i))
    {
        b[i].innerHTML = 'qwerty';
        //= b[i].innerHTML.replace(/Кемерова/, 'Кемерово');
    }*/

}
b[0].innerHTML = 'Форум Кемерово';

var title = document.getElementsByTagName('title')[0];
title.innerHTML = title.innerHTML.replace(/Кемерова/, 'Кемерово');
