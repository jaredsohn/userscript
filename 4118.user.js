// ==UserScript==
// @name          Flickr Scout Link
// @description	  This script adds a link to fd's scout page (http://flagrantdisregard.com/flickr/scout.php) if you on your or others photo stream page. it is partly based on steeev's work (http://steeev.f2o.org/flickr/) and scragz work (http://www.flickr.com/photos/scragz/).
// @author        Nils K. Windisch (netomer)
// @version       0.2 (19/05/06)
// @namespace     http://netomer.de/
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// ==/UserScript==


// v0.2 May 18th 2006 bugfix
// v0.1 initial release

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
	// the include wildcards match too many pages. we only want the index.
	var onlyIndexRE = /.*\/photos\/([^\/]*)(\/)?$/gi;
	if (!document.location.href.match(onlyIndexRE)) return;

	var extras, header, userId, links, img, link;

	extras = getElementsByClassName('Extras');
	links = getElementsByClassName("Links");

	if (!extras || !links) {
		return;
	} else {
		extras = extras[0];
		links = links[0];
	}

	if (extras.innerHTML && (extras = extras.innerHTML.split('relationship.gne?id=')[1])) {
		userId = extras.split('\"')[0];
	}
	if (!userId) {
		userId = getElementsByClassName('WhoIs');
		userId = userId[0].innerHTML;
	}

	img = document.createElement('img');
	img.src = '/images/subnavi_dots.gif';
	img.alt = '';
	img.width = '1';
	img.height = '11';
	link = document.createElement('a');
	link.href = 'http://flagrantdisregard.com/flickr/scout.php?username='+ userId + '&sort=date&year=0';
	link.appendChild(document.createTextNode(' Scout'));
	links.appendChild(img);
	links.appendChild(link);


}

go();

})();
