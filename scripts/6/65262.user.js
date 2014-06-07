// ==UserScript==
// @name           SA Post Counter
// @namespace      http://userscripts.org/users/124130
// @include        http://forums.somethingawful.com/showthread.php*
// ==/UserScript==

const thread = document.getElementById("thread");
const posts = thread.getElementsByTagName("table");
	
for(var i in posts)
{
	const postdate = GetPostDate(posts[i]);
	if(postdate != null)
		postdate.innerHTML += '<span style="float: right; margin-right: 5px; font-weight: bold;">' + ((i * 1) + 1) + '</span>';
}

function GetPostDate(post)
{
	const tds = post.getElementsByTagName("td");
	for(var i in tds)
	{
		if(tds[i].className == "postdate")
			return tds[i];
	}
	return null;
}