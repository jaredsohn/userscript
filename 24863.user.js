// ==UserScript==
// @name          BigMap for TribalWars
// @namespace     http://plemiona.game-host.org/
// @description	  Integrate BigMap into TribalWars (only polish plemiona supported right now)
// @author        SamChi
// @homepage      http://plemiona.game-host.org/
// @include       http://*.plemiona.pl/game.php*
// ==/UserScript==

var bigmapServer = 'plemiona.game-host.org';

function windowReplace (event) {
	window.top.location = this.getAttribute( 'href' );
	event.preventDefault();
	event.stopPropagation();
}

function externalMap ()
{
	for ( var i = 0; i < document.links.length; i++ ) {
		var link = document.links[i];
		if ( link.href.indexOf( 'screen=map' ) < 0 )
			continue;
		
		var text = link.firstChild.nodeValue;
		if ( !text || !text.match( /\S/ ) ) // empty text node - map arrows
			continue;

		// XXX: only polish tribalwars supported at the time
		m = link.host.match( /^(.+)\.plemiona\.pl$/ );
		if ( !m || m.length < 1 )
			continue;

		var bigmap = 'http://' + m[1] + '.' + bigmapServer + '/';
		var opt = [];
		var href = link.href;

		m = href.match( /[&?]village=(\d+)/ );
		if ( m && m.length >= 1 )
			opt.push( 'ownvillage=' + m[1] );

		var x; var y;
		m = href.match( /[&?]x=(\d+)/ );
		if ( m && m.length >= 1 )
			x = m[1];
		m = href.match( /[&?]y=(\d+)/ );
		if ( m && m.length >= 1 )
			y = m[1];


		if ( x && y ) {
			opt.push( 'markvillageat=' + x + ',' + y );
			opt.push( 'center=' + x + ',' + y );
		}

		if ( opt )
			bigmap += '?' + opt.join( ';' );

		var a = document.createElement( 'a' );
		a.setAttribute( 'href', bigmap );
		a.appendChild( document.createTextNode( unescape('du%u017Ca') ) );
		var p = link.parentNode;
		p.insertBefore( a, link.nextSibling );
		p.insertBefore( document.createTextNode( ' (' ), a );
		p.insertBefore( document.createTextNode( ')' ), a.nextSibling );

		a.addEventListener( 'click', windowReplace, false );
	}
}

if ( location.pathname == '/game.php' ) {
	externalMap();
}
