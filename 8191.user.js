// ==UserScript==
// @name lastfmjunkie
// @description adds btjunkie searching for last.fm artists
// @include http://www.last.fm/music/*
// ==/UserScript==

function lastfmjunkie_search() {

	var title = document.getElementsByTagName( 'title' )[0];

	if ( !title ) return;

	var string = new String( title.firstChild.nodeValue );
	string = string.replace( /([\w&; ]+) .*/, '$1' );

	lastfmjunkie_setResults( 'Searching BTJunkie...' );

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://btjunkie.org/rss.xml?query=' + escape(string),
		onload: function( res ) {
			if ( res.readyState == 4 && res.status == 200 )
				lastfmjunkie_displayXml( res.responseText, string );
		}
	});

};

function lastfmjunkie_xmlChildValue( node, name ) {
	var child = node.getElementsByTagName( name )[0];
	return child ? child.firstChild.nodeValue : '';
}

function lastfmjunkie_setResults( text ) {

	var results = document.getElementById( 'lastfmjunkie_results' );

	while ( results.firstChild )
		results.removeChild( results.firstChild );

	results.appendChild(
		document.createTextNode(text)
	);
	results.style.display = 'block';

}

function lastfmjunkie_displayXml( xmlText, band ) {

	var parser = new DOMParser();
	var xml = parser.parseFromString( xmlText, 'application/xml' );
	var root = xml.documentElement;
	var items = root.getElementsByTagName( 'item' );
	var results = document.getElementById( 'lastfmjunkie_results' );
	var header = document.createElement( 'h5' );

	lastfmjunkie_setResults( '' );

	header.appendChild( document.createTextNode('BTJunkie Results (first 20)') );
	results.appendChild( header );

	if ( !items.length )
		results.appendChild(
			document.createTextNode('nothing found, sorry...')
		);

	else for ( var i=0; i<items.length && i<20; i++ ) {

		var item = items[ i ];
		var stitle = lastfmjunkie_xmlChildValue(item,'title');
		var slink = lastfmjunkie_xmlChildValue(item,'link');
		var sdesc = lastfmjunkie_xmlChildValue(item,'description');
		var elink = document.createElement( 'a' );
		var etext = document.createTextNode( stitle );

		elink.style.display = 'block';
		elink.href = slink;
		elink.appendChild( etext );

		results.appendChild( elink );

	}

	var more = document.createElement( 'a' );
	more.href = 'http://btjunkie.org/search?q=' + escape(band);
	more.appendChild( document.createTextNode('see all results') );
	more.style.fontWeight = 'bold';

	var close = document.createElement( 'a' );
	close.href = 'javascript:;';
	close.addEventListener( 'click', function() {
		results.style.display = 'none';
	}, true );
	close.appendChild( document.createTextNode('close') );

	results.appendChild( document.createElement('br') );
	results.appendChild( more );
	results.appendChild( document.createTextNode(' - ') );
	results.appendChild( close );

}

function lastfmjunkie_run() {

	var catpage = document.getElementById( 'catPage' );

	if ( !catpage ) return;

	var h3 = catpage.getElementsByTagName( 'h3' )[0];
	var h5 = catpage.getElementsByTagName( 'h5' )[0];
	var title = h3;
	var link = document.createElement( 'a' );
	var linkImg = document.createElement( 'img' );
	var results = document.createElement( 'div' );

	linkImg.src = 'data:image/x-ico;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgEAAAkFAwAHBQQAGBALACQYEAAoGQ8AOCIVAEIoGAA6ODYAPDo6AD08PABQPjQAQEBAAHpLLQBbTEQAhFExAF1ORgBeU0wAYVRMAIVXOgBlWVIAj2FEAGxkXwB6eXgAfXx8AICAgACphW8ArIp0ALCPegCwkHwAm5SPAKGWjwC4mogAuJyKALqdiwC%2Bo5IAwKaWAMKomADEq5wAxq%2BhAM66rQDQvLAA1MO4ANfGvADYyL4A39LKAODTywDg1MwA4dXNAObb1QDo3tgA5eTjAPDq5gD07%2BwA9fHuAPr4%2BAD8%2BvoA%2FPz7AP%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADRoaGhoaGhoaGhoaGhoaDRo7Ozs7Ozs7Ozs7Ozs6GhoTJiYmKDE7Ozs7NiYmIDsaCBAQEBAQGzo7OjMQEC47GggQKSweEBAqOgsPEBAwOxoIEDU7ORAQIgsADBAQMDsaCBArLyQQDgQAAAwQEDA7GggQEBAQFAUAAAAPEBAwOxoIECUnFgcAAAALMhAQMDsaCBA1OhICAAALOjMQEDA7GggQIxUAAAAJISMdEBAcIxEIEAYBAAALNxAQEBAQEBAIFy0fAwALOjotLS0tLS0tFxk6GDQLODs7Ozs7Ozs7OxoLADo7Ozs7Ozs7Ozs7OzsaDQoZGhoaGhoaGhoaGhoaDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D';
	linkImg.style.border = 'none';
	linkImg.style.margin = '0px 0px 0px 10px';

	results.id = 'lastfmjunkie_results';
	results.style.display = 'none';
	results.style.padding = '5px';
	results.style.border = '1px #ccc solid';
	results.style.backgroundColor = '#eee';
	results.style.margin = '5px 5px 15px 5px';

	title.style.float = 'left';
	link.style.float = 'left';
	link.href = 'javascript:;';
	link.addEventListener( 'click', lastfmjunkie_search, true );
	link.appendChild( linkImg );

	h3.appendChild( link );
	h5.parentNode.insertBefore( results, h5.nextSibling );

}

setTimeout( lastfmjunkie_run, 2000 );
