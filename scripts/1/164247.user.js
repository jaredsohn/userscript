// ==UserScript==
// @name            Funnyjunk Anti Thumb Orgy Button
// @description     Hi all my fellow faggots
// @include         *funnyjunk.com*
// ==/UserScript==

var btn = document.createElement( 'input' );
with( btn ) {
setAttribute( 'onclick', "$('a.thDn').click()" );
setAttribute( 'value', 'Thumb down' );
setAttribute( 'type', 'button' );
setAttribute( 'style', 'position: fixed; top: 60px; right: 15px;');
}



// append at end
document.getElementsByTagName( 'body' )[ 0 ].appendChild( btn );