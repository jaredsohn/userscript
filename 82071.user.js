// ==UserScript==
// @name                Nukezone Clan Total Land Calculator v2 (updated by glamDring, original by friblurks)
// @namespace           Nukezone
// @description         Calculates the total land in a clan when viewing it in the spy reports central
// @include             http://www.nukezone.nu/clan.asp?Action=SpyReports&Q=*
// @include				http://www.nukezone.se/clan.asp?Action=SpyReports&Q=*
// ==/UserScript==
var totalland = 0;
var members = 0;
var average = 0;
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
				members++;
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
		average = totalland/members;
		average = average.toFixed();
		
		if (totalland < 1000)
			output = totalland;
		
		else if (totalland >= 1000 && totalland < 100000)
			output = totalland.toString().substring(0, 2)+' '+totalland.toString().slice(-3);
		
		else if (totalland >= 100000 && totalland < 1000000)
			output = totalland.toString().substring(0, 3)+' '+totalland.toString().slice(-3);
		
		else if (totalland >= 1000000)
			output = totalland.toString().substring(0, 1)+' '+totalland.toString().substring(1, 4)+' '+totalland.toString().slice(-3);
		
		if (average < 1000)
			average = average;
		
		else if (average >= 1000 && average < 100000)
			average = average.toString().substring(0, 2)+' '+average.toString().slice(-3);
		
		else if (average >= 100000 && average < 1000000)
			average = average.toString().substring(0, 3)+' '+average.toString().slice(-3);
		
		else if (average >= 1000000)
			average = average.toString().substring(0, 1)+' '+average.toString().substring(1, 4)+' '+average.toString().slice(-3);
		
		var newline = document.createElement('center');
		newline.innerHTML = 'Total land: ' + output + ' m²<br>Average: ' + average + ' m²';
		form.parentNode.appendChild(newline);
	}
}