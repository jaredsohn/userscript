// ==UserScript== 
// @name Opinion Page Rewrite
// @include https://a.next.westlaw.com/*
// ==/UserScript==

var pageNums = document.getElementsByClassName('co_starPage');
var singleAsterixRegex = /^\*\d/;
var marginPageNumberHTML;
var pageNum;

for (var i = 0; i < pageNums.length; i++)
{
	pageNum = pageNums[i];
	if (singleAsterixRegex.test(pageNum.textContent))
	{
		marginPageNumberHTML = "<hr><a style=\"left:10px; position:absolute; color: #aaaaaa; text-decoration: none;\">";
		marginPageNumberHTML += pageNum.textContent;
		marginPageNumberHTML += "</a>";
		
		pageNum.insertAdjacentHTML("afterend",marginPageNumberHTML);
		pageNum.parentElement.removeChild(pageNum);
		i--;
	}
}