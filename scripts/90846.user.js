// ==UserScript== 
// @name          DS Offs im Simulator zählen 
// @description 
// @author        Samuel Essig (http://c1b1.de)
// @namespace     c1b1.de 
// @version       1.1
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @copyright     2008-2010, Samuel Essig (http://c1b1.de)
// @include       http://ae*.tribalwars.ae/game.php*screen=place*mode=sim* 
// @exclude       http://forum.die-staemme.de/* 
// ==/UserScript== 
// ds.simulatorCountOffs.user.js
void function ( ) { 
	var form = document . getElementsByTagName( 'form' )[0] ; 
	var link = form . getElementsByTagName('td')[0] ; 
	var now = ( document . location . href . indexOf ( '#' ) != -1 ) ? ( parseInt ( document . location . href . split ( '#' ) . pop ( ) ) ) : -1 ; 
	void link . appendChild ( document . createTextNode( ' عدد مرات المحاكاة /	' + ( ++now ) ) ) ; 
	var original_link = form . getAttribute ( 'action' ) ; 
	var new_link = original_link + '#' + now; 
	void form . setAttribute ( 'action' , new_link ) ; 
} ( ) ; 