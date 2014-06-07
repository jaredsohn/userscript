// ==UserScript==
// @version		1.1
// @author		Daniel Vasarhelyi
// @name		nCore search (HU)
// @namespace		http://userscripts.org/users/293336
// @description		Search for episodes on nCore
// @include		http://*myepisodes.com/views.php*
// ==/UserScript==

// add the corresponding header (NC)
h = document.evaluate("//th[text()='A']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < h.snapshotLength; i++) {
	th = document.createElement('th');
	th.innerHTML="";
	h.snapshotItem(i).parentNode.insertBefore(th, h.snapshotItem(i));
}

allEpisodes = document.evaluate("//table[@class='mylist']/tbody/tr[@class!='header']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allEpisodes.snapshotLength; i++) {
	episode_line = allEpisodes.snapshotItem(i);

	// Retrieve show name and episode number
	var show_name = document.evaluate("./td[@class='showname']/a/text()", episode_line, null, XPathResult.STRING_TYPE, null).stringValue;
	var season_episode = document.evaluate("./td[@class='longnumber']/text()", episode_line, null, XPathResult.STRING_TYPE, null).stringValue;
	var season = season_episode.split("x")[0];
	var episode = season_episode.split("x")[1];

	// assemple nCore icon
	var img = document.createElement('img');
	img.setAttribute('src', 'https://ncore.cc/favicon.ico');
	img.setAttribute('height', '20');
	img.setAttribute('width', '20');
	var link = document.createElement('a');
	link.setAttribute('href', 'https://ncore.cc/torrents.php?miben=name&tipus=xvidser&mire='+show_name+' s'+season+'e'+episode);
	link.setAttribute('target', '_blank');
	var td = document.createElement('td');

	link.appendChild(img)
	td.appendChild(link)

	// insert icon before the first <td class="status"> - the 'A' checkbox
	var anchor = document.evaluate("./td[@class='status'][1]", episode_line, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	anchor.parentNode.insertBefore(td, anchor);

	// onClick trigger to check "acquired" checkbox
	var acquired_id = document.evaluate("./input/@id", anchor, null, XPathResult.STRING_TYPE, null).stringValue;
	link.setAttribute('onmousedown','document.getElementById("'+acquired_id+'").checked = true');
}
