// ==UserScript==
// @name                Nukezone Thief Script
// @namespace           NZTS
// @description         A thiefscript for solo play
// @include             http://www.nukezone.nu/*
// ==/UserScript==

if (document.location.href.search('Action=Clans') != -1 && document.location.href.search('X=') != -1)
{

	var headers = 0;
	var clanid;
	var weee = 0;
	var trs = document.getElementsByTagName('tr');
	var timestamp = document.body.innerHTML.search('Current date\/time is');
	timestamp = document.body.innerHTML.substr(timestamp + 21, 19);
	for (var i=0;i<trs.length;i++)
	{
		var tr = trs[i];
		if (tr.getAttribute('class') == 'header')
		{
			headers++;
		}
		if (headers == 1 && weee == 0)
		{
			clanid = tr.innerHTML.substring(tr.innerHTML.lastIndexOf('#'), tr.innerHTML.lastIndexOf(')'));
			clanid = clanid.substr(1);
			weee = 1;
		}
		while (headers == 3)
		{
			if (tr.getAttribute('class') == 'header')
			{
				var newheader = document.createElement('td');
				newheader.innerHTML = 'Age / previous NW';
				newheader.setAttribute('align', 'center');
				tr.insertBefore(newheader, tr.getElementsByTagName('td')[3].nextSibling);
			}
			i++;
			tr = trs[i];
			if (tr.getAttribute('class') == 'header')
			{
				headers++;
			}
			else
			{
				var tds = tr.getElementsByTagName('td');
				var nw = tds[3].innerHTML;
				nw = nw.replace('<b>', '');
				nw = nw.replace('</b>', '');
				var prov = tds[1].getElementsByTagName('a')[0].getAttribute('href');
				var id = prov.substr(prov.lastIndexOf('=') + 1);
				GM_setValue(id + 'clan', clanid);
				if (nw == GM_getValue(id + 'nw') && nw != '$1')
				{
					var newtd = document.createElement('td');
					newtd.setAttribute('align', 'right');
					newtd.innerHTML = GM_getValue(id + 'time');
					tr.insertBefore(newtd, tr.getElementsByTagName('td')[3].nextSibling);
				}
				else if (nw != '$1')
				{

					var newtd = document.createElement('td');
					newtd.setAttribute('align', 'right');
					newtd.innerHTML = GM_getValue(id + 'nw', 'new');
					GM_setValue(id + 'time', timestamp);
					GM_setValue(id + 'nw', nw);
					tr.insertBefore(newtd, tr.getElementsByTagName('td')[3].nextSibling);
					
					var allprovs = GM_getValue('allprovs', '');
					id = '#' + id;
					if (allprovs.search(id + '#') != -1)
					{
						allprovs = allprovs.replace(id, '');
					}
					allprovs += id;
					GM_setValue('allprovs', allprovs);
				}
				else
				{
					var newtd = document.createElement('td');
					newtd.setAttribute('align', 'right');
					newtd.innerHTML = 'dead/inactive';
					tr.insertBefore(newtd, tr.getElementsByTagName('td')[3].nextSibling);
				}
				

				
			}

		}
		if (headers == 4)
		{
			tr.getElementsByTagName('td')[0].setAttribute('colspan', '5');
		}
	}
}

if (document.location.href.search('search.asp') != -1 && document.location.href.search('X=') == -1)
{
	var tables = document.getElementsByTagName('table');
	var searchtable;
	for (var h=0; h<tables.length; h++)
	{
		var table = tables[h];
		if (table.getAttribute('width') == '660')
		searchtable = table.parentNode;
	}
	var newtable = document.createElement('table');
	newtable.setAttribute('class', 'content');
	newtable.setAttribute('width', '660');
	newtable.setAttribute('border', '0');
	searchtable.insertBefore(newtable, null);
	
	var tbody = document.createElement('tbody');
	newtable.insertBefore(tbody, null);
	
	var trheader = document.createElement('tr');
	trheader.setAttribute('class', 'header');
	tbody.insertBefore(trheader, null);
	
	var tdprov = document.createElement('td');
	tdprov.innerHTML = 'Province';
	tdprov.setAttribute('align', 'center');
	trheader.insertBefore(tdprov, null);
	
	var tdclan = document.createElement('td');
	tdclan.innerHTML = 'Clan';
	tdclan.setAttribute('align', 'center');
	trheader.insertBefore(tdclan, null);
	
	var tdstamp = document.createElement('td');
	tdstamp.innerHTML = 'Timestamp';
	tdstamp.setAttribute('align', 'center');
	trheader.insertBefore(tdstamp, null);
	
	var provstring = GM_getValue('allprovs', '');
	var provs = provstring.split('#');
	var oldest;
	for (var j=1; j<provs.length; j++)
	{
		var prov = provs[j];
		var timestring = GM_getValue(prov + 'time', '99999999999999999999lolbug');
		var year = timestring.substr(0, 4);
		var month = timestring.substr(5, 2);
		var day = timestring.substr(8, 2);
		var hour = timestring.substr(11, 2);
		var min = timestring.substr(14, 2);
		var sec = timestring.substr(17, 2);
		
		var clan = GM_getValue(prov + 'clan');
		
		var trprovstuff = document.createElement('tr');
		var tdprovid = document.createElement('td');
		var aprovid = document.createElement('a');
		aprovid.setAttribute('href', 'http://www.nukezone.nu/show.asp?Action=Players&X=' + prov);
		aprovid.innerHTML = '#' + prov;
		tdprovid.insertBefore(aprovid, null);
		trprovstuff.insertBefore(tdprovid, null);
		
		var tdprovclan = document.createElement('td');
		var aprovclan = document.createElement('a');
		aprovclan.setAttribute('href', 'http://www.nukezone.nu/show.asp?Action=Clans&X=' + clan);
		aprovclan.innerHTML = '#' + clan;
		tdprovclan.insertBefore(aprovclan, null);
		trprovstuff.insertBefore(tdprovclan, null);
		
		var tdprovstamp = document.createElement('td');
		tdprovstamp.innerHTML = timestring;
		trprovstuff.insertBefore(tdprovstamp, null);
		
		tbody.insertBefore(trprovstuff, null);
		
	}
}
