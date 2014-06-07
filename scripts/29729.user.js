// ==UserScript==
// @version			0.3
// @name          	Myepisodes NZB Search
// @namespace		http://userscripts.org/scripts/show/29729
// @description   	Search for episodes on Myepisodes.com using nzbs.org
// @include       	http://*myepisodes.com/views.php*
// ==/UserScript==

//Code samples from http://diveintogreasemonkey.org/

//Insert new table column for Newzleech links
var h = document.evaluate("//th[@title='Aquired']", document, null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var newHeader = document.createElement('th');
newHeader.innerHTML = 'nzbs.org';
h.parentNode.insertBefore(newHeader, h);

//Add link for every episode
var allEpisodes, thisEpisode;
allEpisodes = document.evaluate("//td[@class='showname']", document, null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allEpisodes.snapshotLength; i++) {
    thisEpisode = allEpisodes.snapshotItem(i);	
	
    //Retrieve show name and episode number	
	var showName = thisEpisode.firstChild.innerHTML;
	var epNb = document.evaluate(".//td[@class='longnumber']", thisEpisode.parentNode, null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;
				
	//Change episode number format from 12x34 tot s12e34
	var tempArray = epNb.split("x");
	epNb = "s" + tempArray[0] + "e" +tempArray[1];
	
	//Insert Newzleech link in the appropriate column
	var link = 'http://nzbs.org/index.php?action=search&q='
				+ showName + ' ' + epNb + '&catid=0&age=';
	var newElement = document.createElement('td');
	newElement.innerHTML = '<td><a href ="' + link + '" target="_blank">NZB</a></td>';
	var afterElement = document.evaluate(".//td[@class='status']", thisEpisode.parentNode, null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);		
    afterElement.parentNode.insertBefore(newElement, afterElement);
}