// ==UserScript==
// @name           Jump to the Dashboard
// @namespace      www.courtrivals.com/
// @include        http://www.courtrivals.com/maingame.php
// @include        http://www.courtrivals.com/index.php
// @include        http://www.courtrivals.com/index.php?mess=nologin
// @include        http://www.courtrivals.com/
// @include        http://www.courtrivals.com/dashboard.php
// @description    Redirects to the Dashboard after login
// ==/UserScript==

if(window.location.href == 'http://www.courtrivals.com/')
{
	GM_setValue('previouspage','login');
	document.getElementById('gogym').value = "Continue to the Dashboard";
	document.getElementById('gogym').addEventListener('click', function()
	{
		GM_setValue('previouspage','reset');
		window.location.href = 'http://www.courtrivals.com/dashboard.php';
	}, false);
}
else if(window.location.href == 'http://www.courtrivals.com/dashboard.php')
{
	GM_setValue('previouspage','reset');
}
else if(window.location.href != 'http://www.courtrivals.com/maingame.php')
{
	GM_setValue('previouspage','login');
}
else
{
	if(GM_getValue('previouspage') == 'login')
	{
		GM_setValue('previouspage','reset');
		window.location.href = 'http://www.courtrivals.com/dashboard.php';
	}
}

