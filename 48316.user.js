// ==UserScript==
// @name           Bestof Button
// @namespace      bestof_button
// @description    Add a link to reddit comments to submit to the bestof subreddit
// @include        http://www.reddit.com/r/*/comments/*
// ==/UserScript==

var allLists = document.getElementsByTagName('ul');
for(var i = 0; i < allLists.length; i++)
{
	if(allLists[i].className == 'flat-list buttons')
	{
		var permaLink = allLists[i].childNodes[0].childNodes[0].href;
		
		var bestOf = document.createElement('li');
		bestOf.setAttribute('id', 'bestof_li_' + i);
		allLists[i].appendChild(bestOf);
		
		var span = document.createElement('span');
		span.setAttribute('id', 'bestof_span_' + i);
		span.setAttribute('class', 'option bestof');
		document.getElementById('bestof_li_' + i).appendChild(span);
		
		var a = document.createElement('a');
		a.setAttribute('class', 'option');
		a.setAttribute('href', 'http://www.reddit.com/r/bestof/submit?url=' + permaLink);
		a.setAttribute('target', '_blank');
		a.innerHTML= 'bestof';
		document.getElementById('bestof_span_' + i).appendChild(a);
	}
}