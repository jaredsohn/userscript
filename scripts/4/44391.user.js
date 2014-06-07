// ==UserScript==
// @name                Nukezone Golden Growth
// @namespace           noes
// @description         Gives those clans their award! Still unofficial, but better than nothing :)
// @include             http://*nukezone.nu/show.asp?Action=Clans*
// ==/UserScript==

if (document.location.href.search('X=51707') != -1)
{
	//29
	var smalllist = document.getElementById('fieldShowButton').parentNode.innerHTML;
	smalllisttwo = smalllist.substring(0, smalllist.lastIndexOf('R28') + 3);
	smalllisttwo += '<br/>Golden Growth - R29';
	smalllisttwo += smalllist.substring(smalllist.lastIndexOf('R28') + 3);
	document.getElementById('fieldShowButton').parentNode.innerHTML = smalllisttwo;
}

if (document.location.href.search('X=96219') != -1)
{
	//31
	var tds = document.getElementsByTagName('td');
	for (var i=0; i < tds.length; i++)
	{
		var td = tds[i];
		if (td.innerHTML.search('United Boundaries') != -1 && td.getElementsByTagName('td').length == 0)
		{
			var smalllist = td.innerHTML;
			smalllisttwo = smalllist.substring(0, smalllist.lastIndexOf('R26') + 3);
			smalllisttwo += '<br/>Golden Growth - R31';
			smalllisttwo += smalllist.substring(smalllist.lastIndexOf('R26') + 3);
			td.innerHTML = smalllisttwo;
			break;
		}
	}
}

if (document.location.href.search('X=75599') != -1)
{
	//30
	var tds = document.getElementsByTagName('td');
	for (var i=0; i < tds.length; i++)
	{
		var td = tds[i];
		if (td.innerHTML.search('Networth Champion') != -1 && td.getElementsByTagName('td').length == 0)
		{
			var smalllist = td.innerHTML;
			smalllisttwo = smalllist.substring(0, smalllist.lastIndexOf('R29') + 3);
			smalllisttwo += '<br/>Golden Growth - R30';
			smalllisttwo += smalllist.substring(smalllist.lastIndexOf('R29') + 3);
			td.innerHTML = smalllisttwo;
			break;
		}
	}
}