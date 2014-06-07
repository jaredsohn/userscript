// ==UserScript==
// @name           phpbb.com
// @description    Adds some link changes to faster validating. You need to change "senky" part in "http://www.phpbb.com/customise/db/author/senky/contributions/" and "http://www.phpbb.com/customise/db/author/senky/support/" link to your phpbb.com nick!
// @include        http://www.phpbb.com/*
// @history        v1.0.1 - added "usefulness" paragraphs blocking at main phpbb.com page; changed link of contributions in main menu to your support section in Titania
// @history        v1.0.0 - first release
// ==/UserScript==

function change_links()
{
  var i;

	if(window.location == 'http://www.phpbb.com/')
	{
  	var p = document.getElementsByTagName('p');
  	for(i=36; i < 40; i++)
  	{
			p[i].style.display='none';
		}
	}

	var a = document.getElementsByTagName('a');
	var already_done = false;
	for(i=1; i <= a.length; i++)
	{
		if(a[i].href=='http://www.phpbb.com/customise/db/author/senky/contributions/' && already_done != true)
		{
			a[i].href='http://www.phpbb.com/customise/db/author/senky/support/';
			already_done = true;
		}
		if(a[i].href=='http://www.phpbb.com/customise/' || a[i].href=='/customise/')
		{
			a[i].href='http://www.phpbb.com/customise/db/author/senky/support/';
		}
		if(a[i].href=='http://www.phpbb.com/customise/db/manage/')
		{
      a[i].href='http://www.phpbb.com/customise/db/manage/tag_all-limit_50';
		}
	}
}
window.onload = change_links();