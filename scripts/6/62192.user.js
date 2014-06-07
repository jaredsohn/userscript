// ==UserScript==
// @name           Magnacity (Magnet links for torrentz.com)
// @namespace      http://userscripts.org/users/vulcano
// @description    Adds direct download links to the result pages of torrentz.com. It uses the so-called magnet URI scheme to provide a more user-friendly, faster way to access your favorite torrents.
// @grant          none
// @include        http://torrentz.tld/*
// @include        http://www.torrentz.tld/*
// @license        Creative Commons Attribution-Share Alike http://creativecommons.org/licenses/by-sa/3.0/
// @copyright      (c) 2009-2012 Dr. Vulcano
// @version        1.1.0
// ==/UserScript==

// -----------------------------------------------------
// Created: 2009-11-17
// Updated: 2011-01-01
//
// Changelog:
//  - 1.1.0 (2012-11-30)
//     - fix problem with Firefox 17
//     - include @grant
//
//  - 1.0.4 (2011-01-01)
//     - update for new domain (torrentz.eu)
//
//  - 1.0.3 (2009-12-30)
//     - fixed some more problems with 'www.torrentz.com'
//     - adding three default trackers to any magnet link
//
//  - 1.0.2 (2009-12-30)
//     - now both 'www.torrentz.com' and 'torrenz.com' are
//       correctly treated
//
//  - 1.0.1 (2009-12-05)
//     - small bugfix (incompatibility with certain custom
//       css styles)
//
//  - 1.0.0 (2009-11-17)
//     - initial release
// -----------------------------------------------------



// ---------------------------
// part 1: code for the search result details
// ---------------------------
var url = null;
if ((url = location.href.match(/torrentz\.(eu|com|org|net|info)\/([a-f0-9]{40})/))) {

	if (url != null) {
		var hash = url[2];
		
		// read the tracker list
		var trackerregex1 = /<h2>Torrent Trackers<\/h2>(.*)<p>This lists all the active trackers for this torrent/;
		var trackerregex2 = /<dl><dt><a href="\/tracker_[0-9]+">(.*?)<\/a><\/dt><dd><span class="a"><span title=".*?">.*?<\/span><\/span> <span class="u">[0-9]*<\/span> <span class="d">[0-9]*<\/span><\/dd><\/dl>/ig;
		var trackerhtml = document.body.innerHTML.match(trackerregex1);
		var trackers = '';
		while ( (match = trackerregex2.exec(trackerhtml[1])) ) {
			trackers += '&tr=' + match[1];
		}
		
		// default trackers
		if (trackers == '' || trackers.length <= 0) {
			alert('Failed to load trackers, using some default trackers.');
			trackers = '&tr=http://tracker.openbittorrent.com/announce'+
				'&tr=http://tracker.publicbt.com:80/announce'+
				'&tr=http://denis.stalker.h3q.com:6969/announce';
		}
		
		// read title
		var title = document.title.substr(0, document.title.length - 17);
		if (title == '') title = 'unknown torrent';
		
		var magnet = "magnet:?xt=urn:btih:"+hash+trackers+'&dn='+title;
		
		// add downloadlink
		var head, style, body;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '#magnetlinkurlid {'+
		'		border:1px #4995FF solid;'+
		'		z-index:10000;'+
		'		-moz-border-radius: 3px;'+
		'		background: #AACDFF;'+
		'		padding:4px 10px;'+
		'		display:block;'+
		'		position:fixed;'+
		'		right:10px;'+
		'		top:10px;'+
		'		font-family:Verdana;'+
		'		font-size:18px;'+
		'	}';
		head.appendChild(style);
		
		body = document.getElementsByTagName('body')[0];
		if (!body) { return; }
		style = document.createElement('div');
		style.id = 'magnetlinkurlid';
		style.innerHTML = '<a href="'+magnet+'">Download</a>';
		body.appendChild(style);
	}

}



// ---------------------------
// part 2: code for the search result overview
// ---------------------------
if (location.href.match(/torrentz\.(eu|com|org|net|info)\/.*\?[qf]=/)) {
	// the code to insert into torrentz.com
	var embedded_js_code = " \n \
			var xmlhttp = null; \n \
			var current_id = -1; \n \
			function download_torrent(id, hash) { \n \
				xmlhttp = new XMLHttpRequest(); \n \
				if (xmlhttp == null) { \n \
					alert('ERROR: Your browser does not support XML HTTP Request.'); \n \
					return; \n \
				} \n \
				var url = 'http://'+location.hostname+'/announce_'+hash; \n \
				last_id = id; \n \
				xmlhttp.onreadystatechange = function() \n \
					{ \n \
						download_ready(id, hash); \n \
					}; \n \
				xmlhttp.open('GET', url, true); \n \
				xmlhttp.send(null); \n \
			} \n \
			function download_ready(id, hash) { \n \
				if (id != last_id) return; \n \
				if (xmlhttp.readyState == 4) { \n \
					trackers = '&tr=' + xmlhttp.responseText.replace(/[\\t\\r\\n]{2}/gi,'&tr='); \n \
					trackers = trackers.substr(0, trackers.length-4); \n \
					// failed to load? \n \
					if (trackers == '' || trackers.length <= 0) { \n \
						alert('Failed to load trackers, using some default trackers.'); \n \
					} \n \
					// add default trackers \n \
					trackers += '&tr=http://tracker.openbittorrent.com/announce'+ \n \
							'&tr=http://tracker.publicbt.com:80/announce'+ \n \
							'&tr=http://denis.stalker.h3q.com:6969/announce'; \n \
					// get title \n \
					el = document.getElementById('resultelement_'+id); \n \
					link = el.firstChild.firstChild; \n \
					title = link.innerHTML.replace(/<\\/?.*?>/gi, ''); // replace html tags \n \
					if (title == '') title = 'unknown torrent'; \n \
					var magnet = 'magnet:?xt=urn:btih:'+hash+'&'+trackers+'&dn='+title; \n \
					// nothing pending anymore \n \
					last_id = -1; \n \
					// open magnet link \n \
					location.href = magnet; \n \
				} \n \
			}";


	// find result div
	var elem = null;
	var arr = document.getElementsByTagName('div');
	for (i = 0; i < arr.length; i++) {
		if (arr[i].className == 'results') { elem = arr[i]; break }
	}

	// loop through result list (if available)
	if (elem != null) {

		// add some js to the page
		var head, code;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		code = document.createElement('script');
		code.type = 'text/javascript';
		code.innerHTML = embedded_js_code;
		head.appendChild(code);
		
		var el, link, name, hash, dlbutton;
		elem = elem.getElementsByTagName('dl');
		for (var i = 0; i < elem.length; i++)
		{
			el = elem[i];
			
			// change style of this element
			el.setAttribute('style','position:relative;');
			el.setAttribute('id','resultelement_'+i);
			
			// get the name and hash
			link = el.firstChild.firstChild;
			name = link.innerHTML.replace(/<\/?.*?>/gi, ''); // replace html tags
			link = link.href;
			hash = link.match(/torrentz\.(eu|com|org|net|info)\/([a-f0-9]{40})/)[2];
			
			// append the downloadbutton
			dlbutton = document.createElement('a');
			dlbutton.innerHTML = '&darr;';
			dlbutton.setAttribute('href', 'javascript:download_torrent('+i+',"'+hash+'");');
			dlbutton.setAttribute('title', 'Download \n \''+name+'\'');
			dlbutton.setAttribute('id','dlbutton_'+i);
			dlbutton.setAttribute('style', 'position:absolute;right:-43px;top:4px;'+
				'border:1px #4995FF solid;'+
				'z-index:10000;'+
				'-moz-border-radius: 3px;'+
				'background: #AACDFF;'+
				'padding:0px 4px 1px;'+
				'margin-right:10px;'+
				'display:block;'+
				'font-family:Verdana;'+
				'font-size:13px;'
			);
			el.appendChild(dlbutton);
		}
	}
}


