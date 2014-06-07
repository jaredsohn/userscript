// ==UserScript==
// @name                Google - Page Rank
// @version        		1.02
// @description	        Shows page and rank for google results.
// @include				https://google.com/search*
// @include				https://www.google.com/search*
// @include				https://google.co.uk/search*
// @include				https://www.google.co.uk/search*
// ==/UserScript==

var result = document.getElementsByClassName('st');

for(var i=0;i<result.length;i++)
{
    page = document.createElement('text');
    page.id = 'page_number';
    page.innerHTML = Math.ceil((i+1)/10) + " /";
    page.style.fontFamily = "tahoma";
    page.style.fontSize = "15px";
    page.style.position = "absolute";
    page.style.left = "-50px"
    
	rank = document.createElement('text');
    rank.id = 'page_rank';
    rank.innerHTML = '&nbsp;' + ((i+1) - 10*Math.floor((i)/10));
    rank.style.fontFamily = "tahoma";
    rank.style.fontSize = "15px";
    rank.style.position = "absolute";
    
    result[i].appendChild(page);
    page.appendChild(rank);
}
