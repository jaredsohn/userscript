// ==UserScript==
// @name           WHATauto Made Easy
// @description    The script adds a link besides each torrent. The link opens a box with the 
//		   text required to make your WHATAuto bot download the torrent.
// @author         yots
// @include        http://what.cd/artist.php*
// @include        http://what.cd/torrents.php*
// @include        https://ssl.what.cd/artist.php*
// @include        https://ssl.what.cd/torrents.php*
// @version        0.1
// @date           2010-04-10
// ==/UserScript==

idmatch = "id=([\\d]+)";
idreg = new RegExp(idmatch);

function selectAll(id)
{
    document.getElementById(id).focus();
    document.getElementById(id);
}

function findTorrents()
{
	allGroupTorrent = document.getElementsByClassName('group_torrent');
	allTorrents = new Array();

	for (i = 0; i < allGroupTorrent.length; ++i) 
	{
	    	thisGroup = allGroupTorrent[i];
    		if (thisGroup.getElementsByClassName('edition_info').length == 0)
		{
			allTorrents.push(thisGroup);
		}
	}
	
	return allTorrents;
}

function createBox(dlId)
{
	waTR = document.createElement('tr');
	waTR.setAttribute('id', 'wa_' + dlId);
	waTR.setAttribute('class', 'pad hidden');
	waTD = document.createElement('td');
	waTD.setAttribute('colspan', '5');
	waTR.appendChild(waTD);
	waBQ = document.createElement('blockquote');
	waBQ.appendChild(document.createTextNode("%download what " + dlId));
	waTD.appendChild(waBQ);

	return waTR;
}

function createLink(dlId)
{
	newLink = document.createElement('a');
	newLink.appendChild(document.createTextNode("WA"));
	waID = 'WA' + dlId;
	newLink.setAttribute('id', waID);
	newLink.setAttribute('onClick', "document.getElementById(\'wa_" + dlId + "\').setAttribute('class', 'pad ');return false;");

	return newLink;
}

function addWA(thisTorrent)
{
	mainTD = thisTorrent.getElementsByTagName('td')[0];
	dlSpan = mainTD.getElementsByTagName('span');
	dlA = dlSpan[0].getElementsByTagName('a')[0];
	dlLink = dlA.getAttribute('href');
	dlId = idreg.exec(dlLink)[1];

	newBox = createBox(dlId);
	thisTorrent.parentNode.insertBefore(newBox, thisTorrent.nextSibling);
	
	newLink = createLink(dlId);
	dlA.parentNode.insertBefore(newLink, dlA);
	dlA.parentNode.insertBefore(document.createTextNode(' | '), dlA);
}

torrents = findTorrents();

for (i = 0; i < torrents.length; ++i)
{
	thisTorrent = torrents[i];
	addWA(thisTorrent);
}