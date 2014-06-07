// ==UserScript==
// @name           Superbar
// @description    Alternative style for Gold Members and Moderators
// @include        http://www.facepunch.com/*
// @match          http://www.facepunch.com/*
// ==/UserScript==

var fonttags = document.getElementsByTagName('font');
for (i = 0; i < fonttags.length; i++)
{
	switch(fonttags[i].color)
	{
		case '#A06000':
			var s = fonttags[i].style;
			s.background = '-webkit-gradient(linear, 0% 0%, 0% 100%, from(#DD9922), to(#A06000))';
			s.padding = '0 5px 0 5px';
			s.color = '#FFFFFF';
			s.textShadow = '0 0 3px #FFFFFF';
			break;
		case '#00aa00':
			var s = fonttags[i].style;
			s.background = '-webkit-gradient(linear, 0% 0%, 0% 100%, from(#005f00), to(#00aa00))';
			s.padding = '0 5px 0 5px';
			s.color = '#FFFFFF';
			s.textShadow = '0 0 3px #FFFFFF';
			break;
		case 'red':
			var s = fonttags[i].style;
			s.background = '-webkit-gradient(linear, 0% 0%, 0% 100%, from(#ff0000), to(#b40000))';
			s.padding = '0 5px 0 5px';
			s.color = '#FFFFFF';
			s.textShadow = '0 0 3px #FFFFFF';
			break;
    }
}