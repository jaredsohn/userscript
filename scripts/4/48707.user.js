// ==UserScript==
// @name                Nukezone DB Statistics Central
// @namespace           NukezoneDB
// @description         Allows you to see more stuff in the statistics central using a database. Early test version only.
// @include			 	http://www.nukezone.nu/clanstatistics.asp*
// ==/UserScript==

var serverURL = getGMValue('serverURL'); // the server location
var databasename = getGMValue('databaseName');// database name
var serverlogin = getGMValue('login'); // server db login
var serverpass = getGMValue('password');// server db pass
var retrievePage = 'retrieve.php';
var retrieveUnitsPage = 'retrieveUnits.php';


var data;



if (document.location.href.search('X=Military') != -1)
{
	var tables = document.getElementsByTagName('table');
	for (var i=0; i < tables.length; i++) {
		if (tables[i].getAttribute('class') == 'content')
		{
			var mp = document.createElement('td');
			var sp = document.createElement('td');
			mp.setAttribute('Width', '3%');
			sp.setAttribute('Width', '3%');
			mp.setAttribute('Align', 'right');
			sp.setAttribute('Align', 'right');
			mp.innerHTML = 'MP';
			sp.innerHTML = 'SP';
			
			var namecol;
			var moralecol;
			var unitscol;
			var unittypecol;
			var mpcol;
			var spcol;
			var landcol;
			
			var table = tables[i];
			var trs = table.getElementsByTagName('tr');
			
			var header = trs[0];
			var entries = header.getElementsByTagName('td');
			for (var z=0; z < entries.length; z++)
			{
				if (entries[z].innerHTML == 'Morale')
				{
					header.insertBefore(mp, entries[z + 1]);
					header.insertBefore(sp, entries[z + 1]);
				}
			}
			header = trs[0];
			for (var a=0; a < header.getElementsByTagName('td').length; a++)
			{
				if (header.getElementsByTagName('td')[a].innerHTML == 'Province Name')
					namecol = a;
				else if (header.getElementsByTagName('td')[a].innerHTML == 'Morale')
					moralecol = a;
				else if (header.getElementsByTagName('td')[a].innerHTML == 'Units')
					unitscol = a;
				else if (header.getElementsByTagName('td')[a].innerHTML == 'Unit Types')
					unittypecol = a;
				else if (header.getElementsByTagName('td')[a].innerHTML == 'MP')
					mpcol = a;
				else if (header.getElementsByTagName('td')[a].innerHTML == 'SP')
					spcol = a;
				else if (header.getElementsByTagName('td')[a].innerHTML == 'Land')
					landcol = a;
			}
			
			for (var b=1; b < trs.length - 1; b++)
			{
				var tds = trs[b].getElementsByTagName('td');
				var name = tds[namecol].innerHTML;
				var id = name.substring(name.indexOf('#') + 1, name.indexOf(')'));
				
				var mptd = document.createElement('td');
				var sptd = document.createElement('td');
				mptd.setAttribute('align', 'right');
				sptd.setAttribute('align', 'right');

				

				trs[b].insertBefore(sptd, tds[spcol]);
				trs[b].insertBefore(mptd, tds[mpcol]);
				showDBValue(id, 'moralepool', tds[moralecol], 1);
				marketStuff(id, tds[unitscol], tds[unittypecol]);
				showDBValue(id, 'satellitepower', tds[spcol], 0);
				showDBValue(id, 'missilepower', tds[mpcol], 0);
				
				
			}
			trs[trs.length - 1].getElementsByTagName('td')[0].setAttribute('colspan', '12');
		}
	}
}
		
function getGMValue(value)
{
	if (GM_getValue(value) == null)
	{
		var newlink = prompt('Please enter your ' + value, '');
		GM_setValue(value, newlink);
		return newlink;
	}
	return GM_getValue(value);
}

function showDBValue(idz, name, location, replaceType)
{
	if (serverURL.charAt(serverURL.length - 1) != '/')
		serverURL += '/';
	GM_xmlhttpRequest({
		method: 'POST',
		url: serverURL + retrievePage,
		headers: { 'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('db=' + databasename + '&login=' + serverlogin + '&pass=' + serverpass + '&provID=' + idz + '&name=' + name),
		onload: function(responseDetails) {
			filteredText = responseDetails.responseText.substring(responseDetails.responseText.indexOf('|') + 1, responseDetails.responseText.lastIndexOf('|'));
			if (filteredText != 'error')
			{
				if (filteredText == '%')
				{
					filteredText = 'N/A';
				}
				if (replaceType == 0)
				{
					location.innerHTML = filteredText;
				}
				if (replaceType == 1)
				{
					location.innerHTML += ' (' + filteredText + ')';
				}
			}
	    }

	});
}

function marketStuff(idz, locationu, locationt)
{
	if (serverURL.charAt(serverURL.length - 1) != '/')
		serverURL += '/';
	GM_xmlhttpRequest({
		method: 'POST',
		url: serverURL + retrieveUnitsPage,
		headers: { 'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('db=' + databasename + '&login=' + serverlogin + '&pass=' + serverpass + '&provID=' + idz),
		onload: function(responseDetails) {
			var text = responseDetails.responseText;
			var slice = 'hai';
			var hurrz = 0;
			var sea = 0;
			var air = 0;
			var veh = 0;
			var inf = 0;
			if (text.search('error') == -1)
			{
			while (text.search('|') != -1 && slice != '')
			{
				slice = text.substring(text.indexOf('|'), text.indexOf('}') + 1);
				text = text.substring(text.indexOf('}') + 1);
				if (slice.substring(1, 4) == 'sea')
				{
					sea += Number(slice.substring(slice.indexOf('+') + 1, slice.indexOf('}')));
				}
				if (slice.substring(1, 4) == 'air')
				{
					air += Number(slice.substring(slice.indexOf('+') + 1, slice.indexOf('}')));
				}
				if (slice.substring(1, 4) == 'veh')
				{
					veh += Number(slice.substring(slice.indexOf('+') + 1, slice.indexOf('}')));
				}
				if (slice.substring(1, 4) == 'inf')
				{
					inf += Number(slice.substring(slice.indexOf('+') + 1, slice.indexOf('}')));
				}
			}
			var sum = sea + air + veh + inf;
			locationu.innerHTML += ' (' + sum + ')';
			var unitstring = ' (';
			if (sea != 0)
				unitstring += 'S';
			if (air != 0)
				unitstring += 'A';
			if (veh != 0)
				unitstring += 'V';
			if (inf != 0)
				unitstring += 'I';
			unitstring += ')';
			locationt.innerHTML += unitstring;
			}
			
    	}
	
	});
	
}