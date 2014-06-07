// ==UserScript==
// @version		1.0
// @author		Daniel Vasarhelyi
// @name		Myepisodes ISO Search
// @namespace		http://userscripts.org/users/293336
// @description		Updates Myepisodes.com "my episodes" tab to point direct links to corresponding isohunt.com and eztv searches
// @include		http://*myepisodes.com/views.php*
// ==/UserScript==

// based on work of szandor (http://userscripts.org/users/264329),
// original at: http://userscripts.org/scripts/show/92722

// fix some table headers, first
var h = document.evaluate("//th[text()='Episode Title']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

element = document.createElement('th');
element.innerHTML = 'ez';
h.parentNode.insertBefore(element, h.nextSibling);

var element = document.createElement('th');
element.innerHTML = 'iso';
h.parentNode.insertBefore(element, h.nextSibling);

// and an other
var h = document.evaluate("//table/tbody/tr[@class='header']/th[@class='season']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < h.snapshotLength; i++)
	h.snapshotItem(i).setAttribute("colspan", parseInt(h.snapshotItem(i).getAttribute("colspan"))+parseInt(2));


// now link for every episode
var allEpisodes, thisEpisode;
allEpisodes = document.evaluate("//table[@class='mylist']/tbody/tr[@class!='header']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < allEpisodes.snapshotLength; i++) {
	episode_line = allEpisodes.snapshotItem(i);

	// Retrieve show name and episode number
	var episode_name_element = document.evaluate("./td[@class='epname']", episode_line, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var name = document.evaluate("./td[@class='showname']/a/text()", episode_line, null, XPathResult.STRING_TYPE, null).stringValue;
	var season_episode = document.evaluate("./td[@class='longnumber']/text()", episode_line, null, XPathResult.STRING_TYPE, null).stringValue;
	var season = season_episode.split("x")[0];
	var episode = season_episode.split("x")[1];


	// go with eztv
	var img = document.createElement('img');
	img.setAttribute('src', 'http://www.ezrss.it/favicon.ico');
	img.setAttribute('height', '20');
	img.setAttribute('width', '20');
	var link = document.createElement('a');
	link.setAttribute('href', 'http://www.ezrss.it/search/index.php?show_name='+name+'&show_name_exact=true&quality_exact=false&season='+season+'&episode='+episode+'&mode=advanced');
	link.setAttribute('target', '_blank');
	var td = document.createElement('td');

	link.appendChild(img)
	td.appendChild(link)

	episode_name_element.parentNode.insertBefore(td, episode_name_element.nextSibling);
	

	// go with isohunt

	var img = document.createElement('img');
	img.setAttribute('src', 'http://isohunt.com/favicon.ico');
	img.setAttribute('height', '20');
	img.setAttribute('width', '20');
	var link = document.createElement('a');
	link.setAttribute('href', 'http://isohunt.com/torrents/?ihq='+name+'+s'+season+'e'+episode+'&iht=-1&ihp=1&ihs1=1&iho1=d');
	link.setAttribute('target', '_blank');
	var td = document.createElement('td');

	link.appendChild(img)
	td.appendChild(link)

	episode_name_element.parentNode.insertBefore(td, episode_name_element.nextSibling);
}


