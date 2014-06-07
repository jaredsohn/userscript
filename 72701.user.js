// ==UserScript==
// @name           rp
// @namespace      rp
// @include        *rp.pl/artykul/*
// ==/UserScript==
alert('1');
var body = document.getElementByTagName('body');
if(body)
{
    alert('git');
}
else
{
    alert('nie git');
}
alert('2');
for(x in body)
{
        alert('dupa');
	body[x].display = 'none';
}
alert('3');