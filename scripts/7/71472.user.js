// ==UserScript==
// @name           Quote++
// @namespace      Quote++
// @include        http://patator.frbb.net/post.forum?mode=quote&p*
// ==/UserScript==

num = parseInt(window.location.href.substr(48));
if(!isNaN(num))
{
	num++;
	if(document.getElementById('page-footer') != null)
	{
		if(document.getElementById('text_editor_textarea') == null ||  document.getElementById('text_editor_textarea').innerHTML.indexOf('[quote="G-man"]') != 0)
		{
			window.location.href="http://patator.frbb.net/post.forum?mode=quote&p="+num;
		}
		else
		{
			alert('G-man founded');
		}
	}
	else
	{
		alert('no page');
	}
}
else
{
	alert('parsing error');
}