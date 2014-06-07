// ==UserScript==
// @name            Group hider.
// @author          iwantwin93
// @version         1.1
// @description     Hides groups on the group overview
// @include         http://nl*.tribalwars.nl/game.php?*screen=overview_villages*mode=groups*
// @include         http://nl*.tribalwars.nl/game.php?*screen=overview_villages*
// ==/UserScript==

(function ( f ) {
  var d = document,
    s = d.createElement( 'script' );
  s.textContent = '$(document).ready(' + f.toString() + ')';
  (d.body || d.head || d.documentElement).appendChild( s );
})( function () {
  if ( $( "#group_table" ).length == 1 ) {
    $( '#group_table' ).find( 'tr:first' ).hide();
    $( '#group_table' ).find( 'tr:first' ).append( '<img src="/graphic/rename.png" title="Groep herbenoemen" onclick="$(\'#group_table\').find(\'tr\').not(\':first\').toggle();" />' );
  }
} ); 