// ==UserScript==
// @name           Reddit Admin Button
// @namespace      Submit to Admin Subreddit
// @description    Submits a link to a comment from the Reddit Admins' user profiles
// @include        http://www.reddit.com/user/hueypriest
// @include        http://reddit.com/user/hueypriest
// @include        http://www.reddit.com/user/keysersosa
// @include        http://reddit.com/user/keysersosa
// @include        http://www.reddit.com/user/jedberg
// @include        http://reddit.com/user/jedberg
// @include        http://www.reddit.com/user/ketralnis
// @include        http://reddit.com/user/ketralnis
// @include        http://www.reddit.com/user/raldi
// @include        http://reddit.com/user/raldi
// @include        http://www.reddit.com/user/paradox
// @include        http://reddit.com/user/paradox
// @include        http://www.reddit.com/user/spez
// @include        http://reddit.com/user/spez
// @include        http://www.reddit.com/user/kn0thing
// @include        http://reddit.com/user/kn0thing
// @include       http://www.reddit.com/user/Reddit
// @include        http://reddit.com/user/Reddit
// @include        http://www.reddit.com/user/hueypriest*
// @include        http://reddit.com/user/hueypriest*
// @include        http://www.reddit.com/user/keysersosa*
// @include        http://reddit.com/user/keysersosa*
// @include        http://www.reddit.com/user/jedberg*
// @include        http://reddit.com/user/jedberg*
// @include        http://www.reddit.com/user/ketralnis*
// @include        http://reddit.com/user/ketralnis*
// @include        http://www.reddit.com/user/raldi*
// @include        http://reddit.com/user/raldi*
// @include        http://www.reddit.com/user/paradox*
// @include        http://reddit.com/user/paradox*
// @include        http://www.reddit.com/user/spez*
// @include        http://reddit.com/user/spez*
// @include        http://www.reddit.com/user/kn0thing*
// @include        http://reddit.com/user/kn0thing*
// @include       http://www.reddit.com/user/Reddit*
// @include        http://reddit.com/user/Reddit*
// @include        http://www.reddit.com/user/redditads*
// @include        http://reddit.com/user/redditads*
// @include        http://www.reddit.com/user/pixelinaa*
// @include        http://reddit.com/user/pixelinaa*
// @include        http://www.reddit.com/user/cupcake1713*
// @include        http://reddit.com/user/cupcake1713*     
// ==/UserScript==

var allLists = document.getElementsByTagName('ul');
for(var i = 0; i < allLists.length; i++)
{
	if(allLists[i].className == 'flat-list buttons')
	{
		var permaLink = allLists[i].childNodes[0].childNodes[0].href;
		
		var admin = document.createElement('li');
		admin.setAttribute('id', 'admin_li_' + i);
		allLists[i].appendChild(admin);
		
		var span = document.createElement('span');
		span.setAttribute('id', 'admin_span_' + i);
		span.setAttribute('class', 'option admin');
		document.getElementById('admin_li_' + i).appendChild(span);
		
		var a = document.createElement('a');
		a.setAttribute('class', 'option');
		a.setAttribute('href', 'http://www.reddit.com/r/admin/submit?url=' + permaLink);
		a.setAttribute('target', '_blank');
		a.innerHTML= 'admin';
		document.getElementById('admin_span_' + i).appendChild(a);
	}
}