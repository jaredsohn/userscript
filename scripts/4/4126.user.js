// ==UserScript==
// @name          Flickr Favorite Finder Link
// @description	  This script adds a link to fd's favorite Finder Page page (http://flagrantdisregard.com/flickr/favorites.php). if you visit someones favorites page a link is added to show your photos in this specific collection of favs.
// @author        Nils K. Windisch (netomer)
// @version       0.1 (18/05/06)
// @namespace     http://netomer.de/
// @include       http://flickr.com/photos/*/favorites/*
// @include       http://www.flickr.com/photos/*/favorites/*
// ==/UserScript==

// v0.1 May 18th 2006 initial release

(function() {

var getElementsByClassName = function(clsName)
{
	var elems = document.getElementsByTagName('*');
	var j = 0;
	var arr = new Array();
	for (var i=0; (elem = elems[i]); i++) {
		if (elem.className == clsName) {
			arr[j] = elem;
			j++;
		}
	}
	return (arr.length > 0) ? arr : 'undefined';
}

var go = function()
{

	var extras, header, userId, links, img, link, you, other;

	extras = getElementsByClassName('Buddy');
	links = getElementsByClassName("Links");

	if (!extras || !links) {
		return;
	} else {
		extras = extras[0];
		links = links[0];
	}

	other = extras.innerHTML.split('buddyicons/')[1];
	other = other.split('.jpg')[0];

	you = getElementsByClassName('WhoIs');
	you = you[0].innerHTML;

	img = document.createElement('img');
	img.src = '/images/subnavi_dots.gif';
	img.alt = '';
	img.width = '1';
	img.height = '11';
	link = document.createElement('a');
	link.href = 'http://flagrantdisregard.com/flickr/favorites.php?user1='+you+'&user2='+other+'&button=Go';
	link.appendChild(document.createTextNode(' Your Photos in these Favs'));
	links.appendChild(img);
	links.appendChild(link);


}

go();

})();
