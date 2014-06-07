// ==UserScript==
// @name           SpotifyWhat
// @namespace      http://userscripts.org
// @description    Spotify links on What
// @include        https://what.cd/torrents.php?id=*
// @include        https://what.cd/artist.php?id=*
// @include        https://tracker.beathau5.com/torrents.php?id=*
// @include        https://tracker.beathau5.com/artist.php?id=*
// ==/UserScript==

function makeSpotify(searchInput,hoverText) {
	var spotifyLink = document.createElement('a');
	spotifyLink.href = 'spotify:search:' + searchInput;

	var spotifyImage = document.createElement('img');
	spotifyImage.title = hoverText;
	spotifyImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAulJREFUOE99k0dMVFEUhv8Z3wxlxhkURbogRVpYuCEqkWJBlKaCiIgIhIBKszFIGzpEaQIBCxgFRRSIlMESXRhNXLgwcaGJiTsXLok7EwK/Zyi2EF/y57x3ynfPve9cFVZ53PwUQ0y6JkJnmA9cIJR5Kl/fTM29+vh67utq+b98bv5q+ws92qa6EeV7y6SaLY8VkQ2bJmxZN66bK+nTje3P0XmtColIsXEyD2ret05p2DZty/ZpPdstRnZYHMU6sc3izCtTzjSPOM6mmgzhf0HsjdBW3Na+7bToePWxkZWDRpb0GVncu45lA05sGvVg11Nf9jwPYMcTf4E4z+4+pff5BcltsC3smDEyzmRHzzjQLRaL1suqg0vv/slrGF1sYNF1b7bObOWZbsfpFYCqfMDwueeZB039rizsdmHjQx+2TXiweWwdK4YU5lwD95SCHodAzQ5wW46eVWMu8yFRWl94Bqu9Wyc38caLQFEIi/rcmFBpw6hzYIRorwk80ggW3AKrRsETbWByM1gyrGJimZKPyDRt5LWnnrz5MpQ1Dxy48yyYVA0eawJTJTHeDIYVgu5HweBsMLMLvDAMFt0DE8pQj+2JmvB2iyebJ/SsHwcbRBWScHFQEu+CpZJoXbn0Phgr4D2XwXMSLxD/wUuowcbNKtfyIbv5akmqHQPTO0SdYFbPktLkO6lFOmqXojtLxYVSfFrgkfnIXDzI7Ga8q3wEVovMAqoRkFlkXdnqN42AuXIGaQIukk7ODoEZ3fjh5AeXRUBEBpKtLV+UQHSZ7PcYaIgHHRJBn0zwQC1YLKuuFOdJJ/vOo//PYVKFZ2HEPgZE9LKixK5oF7hBgCd7wXxp/XAdvjgHwPGvabRbDzslCKPYCfqelMOqlD1KN64pAhIf5P+vFfj+Unzy24XfU/jPxVC7h+H4kQp8yOrCQp7sO28ADEgH1cH4pnihVmeE/r83cjmo3uCFLUG7ERsSg0TXIIQqtrBZrfAnQu9iOCQV6McAAAAASUVORK5CYII=';

	spotifyLink.appendChild(spotifyImage);
	return spotifyLink;
}
function makeGrooveshark(searchInput,hoverText) {
	var grooveLink = document.createElement('a');
	grooveLink.target = '_newtab';
	grooveLink.href = 'http://grooveshark.com/#/search/?query=' + searchInput;

	var grooveImg = document.createElement('img');
	grooveImg.title = hoverText;
	grooveImg.height = '15';
	grooveImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAAUdEVYdENyZWF0aW9uIFRpbWUAMS81LzEwM8ezhQAAAoZJREFUOI2Vks1rVFcYxn/nzLn3zp0a40dNGqRCnKroRlCykboThAj92BQKpYsuu+miUrsp2H9AhFJ3unIjLlSUUtBFSxSVIGgxJdGOtKQlMaN3MrnjzD3n3HteF2oxpYK+8Kze5/nxLB7Vu3Z0rOq2p0I/b/IGpxtDrdrwpv2mXJqfMiO7mo0974PWr5cOAdu62iyXfp8y0mk3zc5RQv/umxTAbBzFz/3aNOIKUI8Q/+KlUEoQEUC9mqByxBUYbS34/OV+XDh+mb2Hxtn83lZQ5pUMbS1GnEVeBohw5+4iP1+a5eAHW5n8YgKTvPW/AHEWg/0PAMUTCSwNPGfOt7gz+5ivvtnN0MYNUItWE6xFYx24/F9VvYyHuaOnNZkP3JjpcPjIdTp/3Ieiu8qLdWj8swYvdO9em8Xc0QN6QC4wu2D5/sQDXKe9you31A6vU0f1Fo9ODfmy5bsTLf565MmTmK4IQYSgNfNZSSQVO5IVakWGTg1hro269ducNEbf5sq3+zh7M2N+qSKEwKnbD0iN5pNdW0BpFJCsbXBu+j6myHjnlwOEK49Rn5+ck3T9WvZuS7h48TTZTIuDX37NwywlhMD2Mce5H48ztH2cjz7+jNstj4gwvq7DyA+foj48NiPrx0ZIU9j8bgwKFv4u6fefjalmAuPNOrHStP50OCt47xkejknpYrornn7ZIaonLCyWDAYD4jhGRDDGUFUV7XaJUoqyLCnLkiiKWPinSzkYYJY7g2lZthOmnpKuWYNzjiRReO+J4xjnHCEEGo3G83nXyJf7+P4ApJo2WtcnV1ae/KR6YaKX9bHWEpmImqlRFAVRFBNCRTsERIQ4TnC2oN5Ip5PETD4FV25kQaL6O5kAAAAASUVORK5CYII=';

	grooveLink.appendChild(grooveImg);
	return grooveLink;
}


if (document.URL.match(/http.*:\/\/.*what.cd\/torrents\.php\?id=[0-9]/)) {
	var title = document.querySelector('h2 span');
	var artistList = document.querySelectorAll('li.artist_main');
	var artists = []; for (var i = 0; i < artistList.length; i++) { artists.push(artistList[i].querySelector('a').innerHTML); }
	var album = title.innerHTML.split('</a> - ')[1];

	title.parentNode.appendChild(document.createTextNode(' '));
	var searchInput = 'artist:"' + artists.join('" OR "') + '" album:"' + album + '"';
	title.parentNode.appendChild(makeSpotify(searchInput.split('&').join('&'),'Search for this release on Spotify.'));
	title.parentNode.appendChild(document.createTextNode(' '));
	title.parentNode.appendChild(makeGrooveshark(album.split(' ').join('+').split('&').join('&'),'Search for this release on Grooveshark.'));

	var linkbox = document.querySelector('div .linkbox');

	var one = document.createElement('a');
	one.href = 'javascript:void(0);';
	one.innerHTML = '<b>[Spotify search]</b>';
	one.addEventListener('click', function() {
		var sp = document.querySelector('.spSearch');
		if (sp.style.display == 'none') { sp.style.display = null; }
		else { sp.style.display = 'none'; }
	}, false);
	linkbox.appendChild(one);

	var spSearch = document.createElement('span');
	spSearch.style.display = 'none';
	spSearch.className = 'spSearch';
	spSearch.innerHTML = 'Spotify: ' + 
			'<a href=\'spotify:search:artist:"' + artists.join('" OR "') + '"\'>[Search artists]</a> ' +
			'<a href=\'spotify:search:album:"' + album + '"\'>[Search album]</a> ';
	linkbox.appendChild(document.createElement('br'));
	linkbox.appendChild(spSearch);
}
if (document.URL.match(/http.*:\/\/.*what.cd\/artist\.php\?id=[0-9]/)) {
	var artist = document.querySelector('h2');
	var artist2 = artist.innerHTML.split('&').join('&');
	artist.appendChild(document.createTextNode(' '));
	artist.appendChild(makeSpotify('artist:"' + artist2.trim() + '"', 'Search for this artist on Spotify.'));
	artist.appendChild(document.createTextNode(' '));
	artist.appendChild(makeGrooveshark(artist2.trim().split(' ').join('+'), 'Search for this artist on Spotify.'));

	var searchInput = '';
	var hyperlinks = document.querySelectorAll('a[title="View Torrent"][href*="torrents.php?id="]');
	for (var i = 0; i < hyperlinks.length; i++) {
		searchInput = 'artist:"' + artist2 + '" album:"' + hyperlinks[i].innerHTML.split('&').join('&') + '"';
		hyperlinks[i].parentNode.insertBefore(makeSpotify(searchInput, 'Search for this release on Spotify'),hyperlinks[i]);
		hyperlinks[i].parentNode.insertBefore(document.createTextNode(' '), hyperlinks[i]);
		hyperlinks[i].parentNode.insertBefore(makeGrooveshark(artist2.split(' ').join('+') + '+' + hyperlinks[i].innerHTML.split('&').join('&').split(' ').join('+'), 'Search for this release on Grooveshark'),hyperlinks[i]);
		hyperlinks[i].parentNode.insertBefore(document.createTextNode(' '), hyperlinks[i]);
	}

}
if (document.URL.match(/http.*:\/\/.*tracker.beathau5.com\/torrents\.php\?id=[0-9]/)) {
	var title = document.querySelector('h2 span');
	var artistList = document.querySelectorAll('li.artist_main');
	var artists = []; for (var i = 0; i < artistList.length; i++) { artists.push(artistList[i].querySelector('a').innerHTML); }
	var album = title.innerHTML.split('</a> - ')[1];

	title.parentNode.appendChild(document.createTextNode(' '));
	var searchInput = 'artist:"' + artists.join('" OR "') + '" album:"' + album + '"';
	title.parentNode.appendChild(makeSpotify(searchInput.split('&').join('&'),'Search for this release on Spotify.'));
	title.parentNode.appendChild(document.createTextNode(' '));
	title.parentNode.appendChild(makeGrooveshark(album.split(' ').join('+').split('&').join('&'),'Search for this release on Grooveshark.'));

	var linkbox = document.querySelector('div .linkbox');

	var one = document.createElement('a');
	one.href = 'javascript:void(0);';
	one.innerHTML = '<b>[Spotify search]</b>';
	one.addEventListener('click', function() {
		var sp = document.querySelector('.spSearch');
		if (sp.style.display == 'none') { sp.style.display = null; }
		else { sp.style.display = 'none'; }
	}, false);
	linkbox.appendChild(one);

	var spSearch = document.createElement('span');
	spSearch.style.display = 'none';
	spSearch.className = 'spSearch';
	spSearch.innerHTML = 'Spotify: ' + 
			'<a href=\'spotify:search:artist:"' + artists.join('" OR "') + '"\'>[Search artists]</a> ' +
			'<a href=\'spotify:search:album:"' + album + '"\'>[Search album]</a> ';
	linkbox.appendChild(document.createElement('br'));
	linkbox.appendChild(spSearch);
}
if (document.URL.match(/http.*:\/\/.*tracker.beathau5.com\/artist\.php\?id=[0-9]/)) {
	var artist = document.querySelector('h2');
	var artist2 = artist.innerHTML.split('&').join('&');
	artist.appendChild(document.createTextNode(' '));
	artist.appendChild(makeSpotify('artist:"' + artist2.trim() + '"', 'Search for this artist on Spotify.'));
	artist.appendChild(document.createTextNode(' '));
	artist.appendChild(makeGrooveshark(artist2.trim().split(' ').join('+'), 'Search for this artist on Spotify.'));
}