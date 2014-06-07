// ==UserScript==
// @name                Nukezone Clan Total Land Calculator
// @namespace           Nukezone
// @description         Calculates the total land in a clan when viewing it in the spy reports central
// @include             http://www.nukezone.nu/clan.asp?Action=SpyReports&Q=*
// @include				http://www.nukezone.se/clan.asp?Action=SpyReports&Q=*
// ==/UserScript==
var totalland = 0;
var tables = document.getElementsByTagName('table');
for (var a=0; a < tables.length; a++)
{
	var table = tables[a];
	if (table.getAttribute('class') == 'content')
	{
		var trs = table.getElementsByTagName('tr');
		for (var b=0; b < trs.length; b++)
		{
			var tr = trs[b];
			if (tr.getAttribute('class') != 'header')
			{
				var landtd = tr.getElementsByTagName('td')[1];
				var land = Number(landtd.innerHTML.substr(0, landtd.innerHTML.length - 3).replace('&nbsp;', '').replace('&nbsp;', '').replace('&nbsp;', ''));
				totalland += land;
			}
		}
	}
}

var forms = document.getElementsByTagName('form');
for (var c=0; c < forms.length; c++)
{
	var form = forms[c];
	if (form.getAttribute('name') == 'spyreports')
	{
		var newline = document.createElement('center');
		newline.innerHTML = 'Total land: ' + totalland;
		form.parentNode.appendChild(newline);
	}
}