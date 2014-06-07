// ==UserScript==
// @name			torrentz.com OnClick Download
// @author			Przemyslaw Iskra <sparky@pld-linux.org>
// @namespace		http://sparky.homelinux.org
// @description		Allows direct .torrent file download on torrentz.com
// @version			0.2.5
// @date			2008-04-27
// @include			http://torrentz.com/*
// @include			http://*.torrentz.com/*
// @include			http://sumotorrent.com/*
// @include			http://*.sumotorrent.com/*
// @include			http://monova.org/*
// @include			http://*.monova.org/*
// ==/UserScript==


function hrefToTorrent( host, href ) {
	// turn page location into torrent file location
	// type of returned value:
	// - string - treated as exact file location
	// - function - regular expression used to find file name on page
	// - bool true - requires indirect download
	// - bool false - unsupported

	switch ( host.toLowerCase() ) {

		case 'bittorrent.am':
		case 'torrents.am':
		case 'torrentz.ru':
			return href.replace(
				/(http:\/\/[^\/]+)\/torrent\/(\d+)\/\d+\/\d+\/(.*)\.html/,
				"$1/get/$2/$3.torrent"
			);

		case 'btmon.com':
			return href.replace(/\.html$/, '');

		case 'extratorrent.com':
			return href
				.replace( "/torrent/", "/download/" )
				.replace( /\.html$/, ".torrent" );

		case 'fenopy.com':
			return href.replace(/index\.html$/, 'download.html');

		case 'fulldls.com':
			return /<a href="(download-.*?\.torrent)"/;

		case 'mininova.org':
			return href.replace('tor', 'get');

		case 'monova.org': // evil !
			// needs to be redirected to the torrent from it's own site
			return true;

		case 'mybittorrent.com':
			return 'http://www.mybittorrent.com/dl/' + href.match( /\d+/ ) + '/';

		case 'newtorrents.info':
			return href.replace(
					/(http:\/\/[^\/]+)\/torrent\/(\d+)\/(.*?)\.html/g,
					"$1/down.php?id=$2"
				);

		case 'seedpeer.com':
			return /<a rel="nofollow" href="(.*?)">Download This Torrent<\/a>/;

		case 'snarf-it.org':
			return href
				.replace( 'viewTorrent', 'downloadTorrent')
				.replace('.html', '.torrent');

		case 'sumotorrent.com': // evil !
			// needs to be redirected to the torrent from it's own site
			return true;

		case 'thepiratebay.org':
			return 'http://torrents.thepiratebay.org'
				+ href.match( /\/\d+\/.*$/ )
				+ ".TPB.torrent";

		case 'thetorrentsite.com':
			return href.replace( "/viewTorrent/", "/downloadTorrent/" )
				.replace( /\.html$/, ".torrent" );

		case 'torrenthound.com':
			return href.replace(
					/(http:\/\/[^\/]+)\/hash\/([0-9a-f]+)(\/.*)?/,
					'$1/torrent/$2'
				);
		case 'torrentportal.com':
			return href.replace('details', 'download');

		case 'torrentreactor.net':
			var link = href.replace(
					/(http:\/\/)[^\/]+\/torrents\/(\d+)\/(.*?)/,
					"$1dl.torrentreactor.net/download.php?id=$2&name=$3"
				);
			// if first quess was wrong try something else
			if ( link == href ) {
				var torrentName = document
					.getElementById( 'p-body-download-locations' )
					.getElementsByTagName( 'h2' )[0].innerHTML;
				return href.replace(
					/\/view.php\?id=(\d+)/,
					"/download.php?id=$1&name=" + encodeURIComponent( torrentName )
				);
			}
			return link;
	}
	return false;
}

// Adds javascript to the page so it will be executed in page context.
function addJS( js ) {
	var head = document.getElementsByTagName('head')[0];
	if (!head) return;
	var jscript = document.createElement('script');
	jscript.type = 'text/javascript';
	jscript.appendChild( document.createTextNode( js ) );
	head.appendChild( jscript );
}

var requestDownload = "#downloadThisDamnTorrent";

// Main part
function torrentz() {

	// add favicon link
	var icon = document.createElement( 'link' );
	icon.setAttribute( 'rel', 'shortcut icon' );
	icon.setAttribute( 'type', 'image/x-icon' );
	icon.setAttribute( 'href', '/favicon.ico' );
	var head = document.getElementsByTagName('head')[0];
	head.appendChild( icon );

	var divs = document.getElementsByTagName( 'div' );
	var downloadLocations;
	for ( var i = 0; i < divs.length; i++ )
		if ( divs[i].getAttribute( 'class' ) == 'download' ) {
			downloadLocations = divs[i];
			break;
		}

	if (!downloadLocations)
		return;

	GM_addStyle(
		'div.download > dl.download-immediate' +
		'{ background: #e0e0ff; }' +
		'div.download > dl.download-search-ok' +
		'{ background: #cfc; }' +
		'div.download > dl.download-search' +
		'{ background: #eeb; }' +
		'div.download > dl.download-search-failed' +
		'{ background: #f99; }' +
		'div.download > dl.download-unsupported' +
		'{ background: #fcc; }' +
		'div.download > dl.download-indirect' +
		'{ background: #ff8; }' +
		'div.download > dl.download-get-all' +
		'{ background: #eee; }' +
		'.download-invisible' +
		'{ width: 0; height: 0; border: 0; }' +
		'');

	// Track all events to be able to remove them later
	var eventList = new Array();

function setOnClick( a, onclick, index ) {
	// remove old and set new onclick handler
	if ( eventList[ index ] )
		a.removeEventListener( 'click', eventList[ index ], false );
	if ( onclick ) {
		eventList[ index ] = onclick;
		a.addEventListener( 'click', onclick, false );
	}
}

function getAll( max, ignore1, ignore2, event ) {
	// execute all the handlers
	for ( var i = 0; i < max; i++ ) {
		var onclick = eventList[i];
		if ( onclick )
			onclick( event );
	}
}

function OnClick_noDefault( func, arg1, arg2, arg3 ) {
	// return function to use as onclick handler
	return function( event ) {
		func( arg1, arg2, arg3, event );
		event.preventDefault();
	};
}

function noReferer( link ) {
	// opens link location removing referer informarion
	// works like opening using dereferer site (http://ultimod.org/),
	// but much faster, and no need to use external server

	var redir_js = 'document.location="' + link + '"';
	var redir_html = '<html><head><script>'
			+ redir_js + '</script></head></html>';
	var redir = 'data:text/html,' + escape( redir_html );

	return redir;
}

function OpenTorrent( a, link ) {
	// open torrent in iframe

	var p = a.parentNode;
	var iframe = p.getElementsByTagName( 'iframe' );
	if ( iframe && iframe.length > 0 ) {
		iframe = iframe[0];
	} else {
		iframe = document.createElement( 'iframe' );
		iframe.setAttribute( 'class', 'download-invisible' );
		p.appendChild( iframe );
	}
	iframe.src = noReferer( link );
}

function FindAndPrepare( a, regex, index ) {
	// does lots of stuff needed for pages which have to be searched for file name

	var href = a.href;
	var p = a.parentNode.parentNode;

	// blink while checking
	var int = window.setInterval( function() {
			p.setAttribute( 'class',
				'download-search' + (p.getAttribute( 'class' ) == 'download-search' ? '-ok' : '')
			);
		}, 150 );

	// called on error
	var failed = function( a, error ) {
		window.clearInterval( int );
		a.parentNode.parentNode.setAttribute( 'class', 'download-search-failed');
		a.setAttribute( 'title', 'Page search failed: ' + error );
	}

	var onLoad = function( res ) {
		if ( !res.responseText )
			return failed( a, "No data" );

		var link = res.responseText.match( regex );
		if ( !link || link.length < 1 )
			return failed( a, "Link not found" );

		link = link[1].toString();
		if ( link.match( /^http:\/\// ) ) {
			// full URI - nothing to do
		} else if ( link.match( /^\// ) ) {
			// full path, no domain name - add domain
			link = href.match( /(https?:\/\/[^\/]+)\// )[1]
				+ link;
		} else {
			// just file name - add domain and path
			link = href.match( /^(.+\/)[^\/]*$/ )[1]
				+ link;
		}

		window.clearInterval( int );
		a.parentNode.parentNode.setAttribute( 'class', 'download-search-ok' );
		a.setAttribute( 'title', "Direct download: " + link );
		OpenTorrent( a, link );
		// don't trigger page searching again, just download
		setOnClick( a, OnClick_noDefault( OpenTorrent, a, link ), index );
	}

	GM_xmlhttpRequest({
		method: 'get',
		url: href,
		onload: onLoad
	});
}



	var div = downloadLocations.getElementsByTagName( 'p' )[0];
	downloadLocations.removeChild( div );

	var anchorElements = downloadLocations.getElementsByTagName( 'a' );

	var torrentIdRegex = /\d+/;
	var urlRegex = new RegExp(
		'(https?):\/\/' +						// protocol
			'(www\.)?([-A-Z0-9\.]+)' +			// hostname
			'(\/[-A-Z0-9+&@#\/%=~_|!:,.;?]*)?',	// pathname
		'i');

	for (var index = 0, anchorElement;
		anchorElement = anchorElements[index];
		index++)
	{
		var hrefAttributeValue = anchorElement.getAttribute('href');
		var match = urlRegex.exec(hrefAttributeValue);

		if (!match || !(match.length > 1))
			continue;

		var resp = hrefToTorrent( match[3], hrefAttributeValue );

		var class, title, onclick = null;

		switch ( typeof resp ) {
			case 'boolean':
				if ( resp == true ) {
					// indirect
					class = 'indirect';
					title = "Indirect download";
					onclick = OnClick_noDefault( OpenTorrent,
						anchorElement, hrefAttributeValue + requestDownload );
				} else {
					// unsupported
					class = 'unsupported';
					title = "Direct download not supported";
				}
				break;
			case 'string':
				// immediate
				class = 'immediate';
				title = "Direct download: " + resp;
				onclick = OnClick_noDefault( OpenTorrent, anchorElement, resp );
				break;
			case 'function':
				// search
				class = 'search';
				title = "Click to find";
				onclick = OnClick_noDefault( FindAndPrepare,
					anchorElement, resp, index );
				break;

			default:
				continue;
		}

		anchorElement.parentNode.parentNode.setAttribute( 'class', 'download-' + class );
		anchorElement.setAttribute( 'title', title );
		if ( onclick )
			setOnClick( anchorElement, onclick, index );
	}

	if ( index > 1 ) {
		var dl = document.createElement( 'dl' );
		var dt = document.createElement( 'dt' );
		dl.appendChild( dt );
		var dd = document.createElement( 'dd' );
		dl.appendChild( dd );
		var a = document.createElement( 'a' );
		dt.appendChild( a );
		dl.setAttribute( 'class', 'download-get-all' );

		var span = document.createElement( 'span' );
		span.setAttribute( 'class', 'u' );
		span.appendChild( document.createTextNode( "get all !" ) );
		a.appendChild( span );

		span = document.createElement( 'span' );
		span.setAttribute( 'class', 'n' );
		span.appendChild( document.createTextNode( "Download" ) );
		a.appendChild( span );
		a.appendChild( document.createTextNode( " all the torrents" ) );

		a.setAttribute( 'href', '#' );
		a.addEventListener( 'click', OnClick_noDefault( getAll, index ), false );

		downloadLocations.appendChild( dl );
	}
	
	downloadLocations.appendChild( div );
}


// for evil pages which need to be redirected to the torrent from it's own site
function indirectDownload( host ) {
	var regex = new RegExp(
		'^http://' + host + '/download/'
		+ '[0-9]+/[0-9-]+/.+\.torrent$'
	);
	var anchorElements = document.getElementsByTagName( 'a' );
	for ( var i = 0; i < anchorElements.length; i++ ) {
		var a = anchorElements[i];
		if ( a.href.match( regex ) ) {
			document.location = a.href;
			break;
		}
	}
}



{
	var host = document.location.hostname.match( /[^\.]+\.[^\.]+$/ ).toString();
	switch ( host ) {
		case 'torrentz.com':
			torrentz();
			break;
		case 'sumotorrent.com':
			if ( document.location.hash == requestDownload ) {
				// must be redirected to the torrent file in page context,
				// not in GM context; for referer to be set
				addJS( '(' + indirectDownload.toSource()
					+ ')("torrents\.sumotorrent\.com")' );
			}
			break;
		case 'monova.org':
			if ( document.location.hash == requestDownload ) {
				// must be redirected to the torrent file in page context,
				// not in GM context; for referer to be set
				addJS( '(' + indirectDownload.toSource()
					+ ')("www\.monova\.org")' );
			}
			break;
		default:
			GM_log( "Unknown service: " + host + "\n" );
			break;
	}
}

// vim: ts=4:sw=4
