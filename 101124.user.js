// ==UserScript==
// @name           erepublik messages advanced
// @namespace      http://userscripts.org/users/308196
// @description    add donate links in messages
// @include        http://www.erepublik.com/en/main/messages-inbox
// @include        http://www.erepublik.com/en/main/messages-read/*
// ==/UserScript==

var arrgetcurrent = document.getElementsByTagName("a");
var currentid = 0;
for(var i = 0; i < arrgetcurrent.length; i++)
{
	if (arrgetcurrent[i].className == 'citizen_name')
	{
		currentid = arrgetcurrent[i].href.substr(44);
	}
}

var arrdiv = document.getElementsByTagName("div");
for(var i = 0; i < arrdiv.length; i++)
{
	if (arrdiv[i].className == 'nameholder')
	{
		var arra = arrdiv[i].getElementsByTagName("a");				
		var id = arra[0].href.substr(44);

		if (currentid != id)
		{
			arrdiv[i].innerHTML += '<a target="_blank" title="donate item" href="http://economy.erepublik.com/en/citizen/donate/' + id + '"><img width="22" height="22" src="http://www.erepublik.com/images/icons/industry/1/q1.png" /></a>';
			arrdiv[i].innerHTML += '<a target="_blank" title="donate money" href="http://economy.erepublik.com/en/citizen/donate/money/' + id + '"><img width="14" height="16" src="http://www.erepublik.com/images/parts/icon-gold.gif" /></a>';
		}
	}
}