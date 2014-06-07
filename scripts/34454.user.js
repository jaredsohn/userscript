// ==UserScript==
// @name           no dailytech comments
// @namespace      http://www.delgenio.com
// @description    The comments posted on DailyTech articles drive me nuts and are killing my faith in the intelligence of humanity.  I can't bear to witness them anymore.
// @include        http://www.dailytech.com/*
// ==/UserScript==

function rem(element)
{
if (element)
	element.parentNode.removeChild(element);
}

var comments = document.getElementsByClassName('ArticleComments');
for(var i = 0; i < comments.length; i++)
{
	rem(comments[i]);	
}

var quotes = document.getElementsByClassName('quotesub');
for(var i = 0; i < quotes.length; i++)
{
	rem(quotes[i]);
}

rem(document.getElementById('ctl00_MainContent_lnkImgTalk'));
rem(document.getElementById('ctl00_MainContent_lnkTalk'));

	
