// ==UserScript== 
// @name          Aanvallen tellen op de overlevende troepen 
// @description 
// @namespace     c1b1.de 
// @include       http://nl*.tribalwars.nl/game.php*screen=place*mode=sim* 
// @exclude       http://forum.die-staemme.de/* 
// ==/UserScript== 
// ds.simulatorCountOffs.user.js 
// (c) by C1B1SE 
// Translated by BeNnOo.
void function ( ) { 
var form = document . getElementsByTagName( 'form' )[0] ; 
var link = form . previousSibling ; 
var now = ( document . location . href . indexOf ( '#' ) != -1 ) ? ( parseInt ( document . location . href . split ( '#' ) . pop ( ) ) ) : 0 ; 
void link . appendChild ( document . createTextNode( ' (Aanvallen tot nu toe: ' + ( ++now ) + ')' ) ) ; 
void link . addEventListener ( 'click' , function ( ) { 
  if ( document . location . href . indexOf ( '#' ) != -1) { 
    var original_link = form . getAttribute ( 'action' ) ; 
    var new_link = original_link + '#' + now ; 
    void form . setAttribute ( 'action' , new_link ) ; } 
  else { 
    void form . setAttribute( 'action' , form . getAttribute ( 'action' ) + '#' + now ) ; } 
  return true ; } , false ) ; } ( ) ; 