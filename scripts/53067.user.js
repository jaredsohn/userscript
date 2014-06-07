// ==UserScript==
// @name           /r/friends Link Adder
// @namespace      Reddit
// @include        *.reddit.com*
// @version			.02
// ==/UserScript==
var links = [
	{text:"all",link:"http://www.reddit.com/r/all"},
	{text:"friends",link:"http://www.reddit.com/r/friends"}
]
function appendSubreddits ( reddits, container )	{
	var i, htmlstr='';
	for (i = 0; i < links.length; i++)	{
		htmlstr += '<a class="choice" ' +(i==reddits.length-1?'style="border-bottom: 1px dotted #336699;"':'') + ' href="' + reddits[i].link + '">' + reddits[i].text + '</a>';
	}
	container.innerHTML = htmlstr + container.innerHTML;
}
var list = document.getElementById("sr-header-area").childNodes[1];
appendSubreddits(links,list);