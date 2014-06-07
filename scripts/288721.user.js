// ==UserScript==
// @name       xebbot for dogedice
// @require    http://code.jquery.com/jquery-latest.min.js
// @require    http://dogerain.6te.net/ZeroClipboard.min.js
// @match      https://doge-dice.com/*
// @grant      GM_xmlhttpRequest
// @grant      GM_setClipboard
// @copyright  2014+, 1@wa.vg
// @version    2.3.3.3
// ==/UserScript==
// 17AKDJCyzrRMERYxpgsfCcALrvKh4XmSoT for btc donations
// DFTss9uiNj2K6YKRaW4dksBS3iTpJydv7j for doge donations
document.getElementsByClassName('chatinput')[0].setAttribute('id','chatline')
var div = document.createElement( 'div' );
$( div ).css({ 'float':'right' });
$( '.chatbutton' ).after( div ); 
$( '.fright' ).hide();
var button = document.createElement( 'button' );
$( button ).text('xebbot');
$( button ).click( function ( e ) { 
$.get('http://wa.vg/HUE.php?l='+$( '#chatline' ).val(), function(result) {
result = (eval('(' + result + ')'));
if (result[0] > 0) {
$( '#chatline' ).val(result[1]);}
else if(result[0] == -1) {
socket.emit("name", csrf, result[1]);
socket.emit("chat", csrf, result[2]);}});});
$( div ).append( button );