// ==UserScript==
// @name           Next-Episode -> NZBindex
// @namespace      armeagle.nl
// @description    Add search links to the Next-Episode main history page that link directly to NZBindex.nl
// @include        http://next-episode.net/
// ==/UserScript==
var search_url_srp = '__________';
var search_url = 'http://nzbindex.nl/search/?q=' + search_url_srp +'&age=&max=25&sort=agedesc&minsize=100&maxsize=&poster=teevee&nfo=&hidespam=0&hidespam=1&more=0'; // use search_url_srp to be replaced with a search string
var arr_search_url_replace = {' ' : '+',
							  '\\$\\#\\*!' : 'shit',
							  '\\(US\\)': 'US',
							  "Harry's": 'Harrys'}; // can set multiple replace strings this way. Occurances of 'key' are replaced with 'value' before the search string is entered in the search url

// find all episode entries

var arr_node_episodes = document.querySelectorAll('tr > td > span.footer a'); // some links are to the forum, parentnode is b.forumlinks
for ( key in arr_node_episodes ) {
	var node_episode = arr_node_episodes[key];
	// check whether it isn't a forum link
	if ( node_episode.parentNode !== undefined && node_episode.parentNode.className == 'forumlinks' ) {
		continue;
	}
	if ( node_episode.nextSibling === undefined ) {
		continue;
	}
	season_episode = formatSeasonEpisodeString(node_episode.nextSibling.nodeValue);	
	/*
	// Find next <br> tag, so we can put the search link just before that.
	// TODO: while getting to this BR tag, store all text in intermediate text nodes
	var node_walker = node_episode;
	console.log(node_episode.nextSibling.nodeValue);
	var season_episode = ''; // find and store '(Season: x Episode: y)' string
	while ( node_walker !== null && (node_walker.nodeType != 1 || node_walker.nodeType == 1 && node_walker.tagName.toLowerCase() != 'br') ) {
		if ( node_walker.nodeType == 3 && node_walker.nodeValue.indexOf('Season') > 0) {
			season_episode = node_walker.nodeValue;
		}
		node_walker = node_walker.nextSibling;
	}
	season_episode = formatSeasonEpisodeString(season_episode);
	*/

	// create search string
	var search_string = node_episode.textContent +' '+ season_episode;
	// create search link
	var node_search_link = document.createElement('a');
	node_search_link.setAttribute('href', createSearchString(search_string));
	node_search_link.setAttribute('style', 'margin-left: 5px;');
	node_search_link.textContent = 'search';
	if ( node_episode.parentNode.tagName.toLowerCase() == 'strong' ) {
		node_episode.parentNode.appendChild(node_search_link);
	} else {
		node_episode.parentNode.insertBefore(node_search_link, node_episode.nextSibling.nextSibling.nextSibling);
	}
}

// Apply search_url_replace to the subject and insert it in the search_url
function createSearchString(subject) {
	for ( key in arr_search_url_replace ) {
		subject = subject.replace(new RegExp(key, 'g'), arr_search_url_replace[key]);
	}
	return search_url.replace(search_url_srp, subject);
}

// clean up and format the '(Season: x Episode: y)' string
function formatSeasonEpisodeString(seas_ep) {
	seas_ep = seas_ep.replace(/&nbsp;/, '').replace(/ /, '').replace('(Season:', '').replace(')', '').replace('Episode:', ',').replace(' -', '').split(' , ');
	var season_snr = Number(seas_ep[0]);
	if ( season_snr < 10 ) {
		season_snr = '0'+ season_snr;
	}
	var episode_snr = Number(seas_ep[1]);
	if ( episode_snr < 10 ) {
		episode_snr = '0'+ episode_snr;
	}

	return 'S'+ season_snr + 'E' + episode_snr;
}