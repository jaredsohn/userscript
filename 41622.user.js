// ==UserScript==
// @name	Mouseover Prefetcher
// @namespace
// @author	javascribe
// @description	Loads link into hidden iframe with mouseover addEvent (press shift or hit link x5 in a row - jiggle on the link)
// @version	1.0
//
// @exclude 	file://*
// @exclude 	http://www.youtube.com/*
// 
// ==/UserScript==

var fetch_count;
var fetch_target;

( function () {
	function fstatus(str) {
		var p = document.getElementById( "fetch" );
		p.innerText = str;
		setTimeout( "document.getElementById( 'fetch' ).innerText = ''", 3000 );
	}

	function fetch(e) {
		fetch_count++;
		if( fetch_target != e.target ) {
			fetch_target = e.target;
			fetch_count = 1;
		}
		if( e.shiftKey || fetch_count == 5 ) {
			fetch_count = 0;
			var f = document.getElementById( this.href );
			if( !f ) {
				f = document.createElement( "iframe" );
				f.style.display = "none";
				f.src = this.href;
				document.getElementsByTagName( "body" )[0].appendChild( f );
				fstatus( f.src + " loaded." );
				this.removeEventListener( "mouseover", fetch, true );
			}
		}
	}

	p=document.createElement("p");
	p.id="fetch";
	p.style="font: Tahoma; font-size: 10px; position:fixed; left:0; bottom:0; margin:0; float:left; background: lightyellow; color:black; border:1px solid; border-color: black; opacity: .6;";
	document.getElementsByTagName( "body" )[0].appendChild( p );

	var links = document.getElementsByTagName( "a" );

	for( var i = 0; i < links.length; i++ )
		if( "/^http:\/\//i." + links[i] + "(href)" )
			links[i].addEventListener( "mouseover", fetch, true);

	fstatus( links.length + " links done." );
} ) ();
