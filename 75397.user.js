// ==UserScript==
// @name           MenuMouseOverDisable
// @namespace      http://videotutorials-bg.com
// @include        http://www.dveri.bg/*
// ==/UserScript==

div4e = document.getElementsByClassName('menu');
lita = div4e[0].innerHTML.split('<li');


for(var i=1;i<lita.length;i++)
{
	posStart    = lita[i].indexOf('onmouseover');
	posEnd      = lita[i].indexOf(');',posStart);
	posEnd     += 3;
	
	functionTxt = 'onclick'+lita[i].substring(posStart+11,posEnd)+' ';
	
	tmpTxt      = lita[i].substring(0,posStart) + lita[i].substring(posEnd,lita[i].length);
	
	posStart    = tmpTxt.indexOf('ononclick');
	posEnd      = tmpTxt.indexOf(';',posStart);
	posEnd     += 2;		
	
	tmpTxt      = tmpTxt.substring(0,posStart) + functionTxt + tmpTxt.substring(posEnd,tmpTxt.length);
	lita[i]     = '<li' + tmpTxt;
}

tmpTxt = lita.join('');

div4e[0].innerHTML = tmpTxt;
easytabs('1', '1');
