// ==UserScript==
// @name           imdb2leech
// @description    Add links from IMDB movie pages to torrent sites -- easy downloading from IMDB
// @author		Anon, updated by Minigeek
// @namespace    http://userscripts.org/scripts/show/95157
// @version	       1.00
//
// @include        http://*.imdb.com/title/tt*
// @include        http://*.imdb.de/title/tt*
// @include        http://*.imdb.es/title/tt*
// @include        http://*.imdb.fr/title/tt*
// @include        http://*.imdb.it/title/tt*
// @include        http://*.imdb.pt/title/tt*
// ==/UserScript==

/* - Version History -
 * 
 * 1.00 - Initial public release, everything works on barebones greasemonkey
 *
 */


//defaults -                               
var show_strikeout_links =  false;
var pirate_header_text = 'Download: ';
var debug_imdb2leech = true;
var retard_cant_middle_click = false;

function add_link_areas()
{
	var action_box = document.getElementById('action-box');
	if (action_box) {
		var p = document.createElement('p');
		p.setAttribute('id', 'piratebox');
		action_box.insertBefore(p, action_box.firstChild);
	}
	var h1_list = document.getElementsByTagName('h1');
	if (h1_list) {
		var p = document.createElement('p');
		p.setAttribute('id', 'pirateheader');
		h1_list[0].parentNode.appendChild(p);
	}
}

function add_link(search_url, link_text, strikeout)
{
	var text = document.createTextNode(link_text);
	var a = document.createElement('a');
	a.setAttribute('href', search_url);

	if (retard_cant_middle_click)
	a.setAttribute('target', '_blank');

	if (strikeout) {
		var s = document.createElement('s');
		s.appendChild(text);
		a.appendChild(s);
	} else {
		a.appendChild(text);
	}

	var piratebox = document.getElementById('piratebox');
	if (piratebox) {
		if (!piratebox.hasChildNodes()) {
			var pirate_header = document.createElement('h4');
			pirate_header.setAttribute('class', 'inline');
			pirate_header.appendChild(document.createTextNode(pirate_header_text));
			piratebox.appendChild(pirate_header);
		}
		piratebox.appendChild(a.cloneNode(true));
		piratebox.appendChild(document.createTextNode(' '));
	}
	var pirateheader = document.getElementById('pirateheader');
	if (pirateheader) {
		if (!pirateheader.hasChildNodes()) {
			var pirate_header = document.createElement('h4');
			pirate_header.setAttribute('class', 'inline');
			pirate_header.appendChild(document.createTextNode(pirate_header_text));
			pirateheader.appendChild(pirate_header);
		}
		pirateheader.appendChild(a);
		pirateheader.appendChild(document.createTextNode(' '));
	}
}

function maybe_add_link(link_text, search_urls, search_fail_match)
{
	var search_url;

	if (typeof(search_urls) == 'object') {
		search_url = search_urls[0];
		search_urls.shift();
	} else {
		search_url = search_urls;
		search_urls = new Array;
	}

	GM_xmlhttpRequest({
		method: 'GET',
		url: search_url,
		onload: function(responseDetails)
		{
			if (String(responseDetails.responseText).match(search_fail_match)) {
				if (search_urls.length) {
					maybe_add_link(link_text, search_urls, search_fail_match);
				} else {
					if (show_strikeout_links)
					add_link(search_url, link_text, true);
				}
			} else {
				add_link(search_url, link_text, false);
			}

			if (debug_imdb2leech) {
				GM_log([responseDetails.finalUrl + ' => ' + responseDetails.statusText,
				"",
				responseDetails.responseHeaders,
				responseDetails.responseText
				].join("\n"));
			}
		}
	});
}

var match = String(document.URL).match(/tt([0-9]*)\/?$/);
if (match) {
	var tt = 'tt' + match[1];
	var nott = match[1];

	add_link_areas();


	maybe_add_link('PTP', 'http://passthepopcorn.me/torrents.php?imdb=' + tt, /<h2>Your search did not match anything.<\/h2>|Keep me logged in/);
	maybe_add_link('TPB', 'https://thepiratebay.org/search/' + tt,
		/No hits. Try adding an asterisk in you search phrase.<\/h2>/);
	maybe_add_link('D', 'http://www.demonoid.me/files/?query=' + tt, 
		/<b>No torrents found<\/b>|We are currently performing the daily site maintenance/);
	maybe_add_link('Goem', 'http://goem.org/browse.php?s_type=2&cat=0&search=' + tt,
		/Try again with a refined searchstring|<h1>Note: You need cookies enabled to log in.<\/h1>/);			
	maybe_add_link('SCC', 'http://sceneaccess.org/browse?method=1&search=' + tt,
		/Try again with a refined search string.|<h1>Note: Three (3) failed login attempts will result in a temporary security lockout.<\/h1>/);

	/*

maybe_add_link('CG', Array('http://cinemageddon.net/browse.php?search=' + tt,
'http://cinemageddon.net/browse.php?descr=1&search=t' + nott),
/<h2>Nothing found!<\/h2>|<h1>Not logged in!<\/h1>/);
maybe_add_link('KG', 'http://www.karagarga.net/browse.php?search_type=imdb&search=' + nott,
/<h2>Nothing found!<\/h2>|<h1>Not logged in!<\/h1>/);
maybe_add_link('Tik', 'http://cinematik.net/browse.php?srchdtls=1&incldead=1&search=' + tt,
/The page you tried to view can only be used when you're logged in|<h2>Nothing found!<\/h2>/);
maybe_add_link('SM', Array('http://www.surrealmoviez.info/advanced_search.php?simdb=' + tt,
'http://www.surrealmoviez.info/search.php?stext=' + tt),
/0 Movies found matching search criteria|Login/);
maybe_add_link('ILC', 'http://www.iloveclassics.com/browse.php?incldead=1&searchin=2&search=' + tt,
/Try again with a refined search string|<h1>Not logged in!<\/h1>/);
maybe_add_link('x264', 'http://x264.me/browse.php?incldead=0&xtype=0&stype=3&search=' + tt,
/Try again with a refined search string.|x264 Login/);
maybe_add_link('ADVD', 'http://asiandvdclub.org/browse.php?descr=1&btnSubmit=Submit&search=' + tt,
/Your search returned zero results|Forgot your password and\/or username?/);
maybe_add_link('NZB',
'http://0000000000nzbmatrix.com/nzb-search.php?cat=0&searchin=weblink&maxage=0&grp=&larger=0&smaller=0&minhits=0&maxhits=0&sort=0&type=asc&search=' + tt,
/^$|The search found no results, please try again\./); // When not logged in, NZB returns an empty page with a "refresh: 0; url=..." HTTP header.
maybe_add_link('BitHD', 'http://www.bit-hdtv.com/torrents.php?cat=0&description_search=1&search=' + tt, /<h2>No match!<\/h2>|Forgot password/);
maybe_add_link('RevTT', 'https://www.revolutiontt.net/browse.php?search=' + tt, /<h2>Nothing found!<\/h2>|Password Recovery/);

*/
}