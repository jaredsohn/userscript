// ==UserScript==
// @name           Open Mail in New Tab
// @namespace      http://www.courtrivals.com/
// @include        http://www.courtrivals.com/mail.php*
// ==/UserScript==

//http://img301.imageshack.us/img301/5201/newtab.png

document.addEventListener('click', function(event)
{
	if(event.target == "http://www.courtrivals.com/mail.php#")
	{
		var url = event.target.parentNode.innerHTML.slice(event.target.parentNode.innerHTML.indexOf("ajax/Display-Message.php?mid="));
		url = 'http://www.courtrivals.com/' + url.slice(0,url.indexOf("'"));

		event.stopPropagation();
		event.preventDefault();
		GM_openInTab(url);
	}
}, true);