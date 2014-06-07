// version        0.4.1
// ==UserScript==

// @name          SSBar, the Smart Status bar (REMIX)

// @namespace     *

// @description   Do you need the statusbar all the time? Why not put it away and show a simple statusbar when needed? in a CRAZY way!!!!

// @include       *

// ==/UserScript==



var sb = document.getElementById('statusbar-sb');

if( !sb ) {

	sb = document.createElement('div');

	sb.setAttribute('id', 'statusbar-sb');

    // DEFINE INTERFACE OF THE STATUS BAR
	sb.style.color = '#145';
	sb.style.fontFamily = 'stencil, "lucida console", sans-serif';
	sb.style.fontSize = '11px';
	sb.style.lineHeight = 'large';

	sb.style.display = 'none';

	sb.style.position = 'moveable';

	sb.style.bottom = '0px';

	sb.style.left = '0px';
	sb.style.minWidth = '445px';

	sb.style.background = '#d6d6d6';
	sb.style.borderTop = '1px solid #b4b4b4';
	sb.style.borderRight = '1px solid #b4b4b4';
	sb.style.zIndex = '999';

	sb.style.padding = '3px 21px 3px 3px';
	sb.style.textAlign = 'middle';
    // INTERFACE HAS BEEN DEFINED


	var text = document.createElement('span');

	text.setAttribute('id','statusbar-text');

	sb.appendChild(text);

	top.document.body.appendChild(sb);

}



var text = document.getElementById('statusbar-text');
var csTimeout;



for( var i = 0; i < document.links.length; i++ ) {

	var a = document.links[i];
	a.setAttribute('linkID',i);



	a.addEventListener('mouseover', function( event ) {
		var hURL = document.links[event.target.getAttribute( 'linkID' )].href;
		if( hURL != "" && hURL != null ) {
			sb.style.display = 'block';
			while( text.lastChild ) {
				text.removeChild( text.lastChild );
			}
			text.appendChild( document.createTextNode( hURL ) );
			clearTimeout( csTimeout );
		}


		event.stopPropagation();

		event.preventDefault();

    	}, true);



	a.addEventListener('mouseout', function( event ) {

		csTimeout = setTimeout(function() {
			sb.style.display='none';

			while( text.lastChild ) {
				text.removeChild( text.lastChild );
			}


			event.stopPropagation();

			event.preventDefault();
		}, 700);

	}, true);
