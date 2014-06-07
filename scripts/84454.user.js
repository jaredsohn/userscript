// ==UserScript==
// @name           Reddit Spam Button
// @namespace      Submit to Spam Subreddit
// @description    Submits a spammer's profile to /r/repotthespammers
// @include        http://*reddit.com/*
// ==/UserScript==

var allLists = document.getElementsByTagName('ul');
for(var i = 0; i < allLists.length; i++)
{
    if(allLists[i].className == 'flat-list buttons')
    {
        var permaLink = allLists[i].childNodes[0].childNodes[0].href;
	var authorProfileLink = allLists[i].previousSibling.firstChild.nextSibling.href;

        var spam = document.createElement('li');
        spam.setAttribute('id', 'spam_li_' + i);
        allLists[i].appendChild(spam);

        var span = document.createElement('span');
        span.setAttribute('id', 'spam_span_' + i);
        span.setAttribute('class', 'option spam');
        document.getElementById('spam_li_' + i).appendChild(span);

        var a = document.createElement('a');
        a.setAttribute('class', 'option');
        a.setAttribute('href', 'http://www.reddit.com/r/reportthespammers/submit?url=' + authorProfileLink);void(0);
        a.setAttribute('target', '_blank');
        a.innerHTML= 'spam';
        document.getElementById('spam_span_' + i).appendChild(a);
    }
}