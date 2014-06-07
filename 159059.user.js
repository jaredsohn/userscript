// ==UserScript==
// @name            Funnyjunk Thumb Button
// @description     Nothing.
// @include         *funnyjunk.com*
// ==/UserScript==

var btn = document.createElement( 'input' );
with( btn ) {
  setAttribute( 'onclick', "$('a.thUp').click()" );
  setAttribute( 'value', 'Thumb Orgy' );
  setAttribute( 'type', 'button' );
  setAttribute( 'style', 'position: fixed; top: 40px; right: 15px;');


}
  setAttribute( 'onkeydown', "$('a.thUp').click()" );
// append at end
document.getElementsByTagName( 'body' )[ 0 ].appendChild( btn );