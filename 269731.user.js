// ==UserScript==
// @name       doge balance for dogedice
// @require    http://code.jquery.com/jquery-latest.min.js
// @require    http://dogerain.6te.net/ZeroClipboard.min.js
// @match      https://doge-dice.com/*
// @grant      GM_xmlhttpRequest
// @grant      GM_setClipboard
// @copyright  2014+, 1@wa.vg
// @version    2.3.3.7
// ==/UserScript==
// 17AKDJCyzrRMERYxpgsfCcALrvKh4XmSoT for btc donations
// DDdDDdnka1qobRnqBXU1PzRvcw9k9PStxR for doge donations
function Addmonitor(addr) {
	var div = document.createElement( 'div' );
    $( div ).css({ 'float':'right' ,'border':'1px solid' });
	$( '.chatbutton' ).after( div ); 
    var button = document.createElement( 'button' );
    $( button ).attr({ 'id':'dogeValue'+ addr });
    $($( '.fright')[4]).hide();
    $( button ).text( addr.substr(0,8));
    $( button ).click( function ( e ) { 
        $('#dogeValue'+ addr ).load('http://dogerain.6te.net/?addr='+addr);
        GM_setClipboard(addr);
    });
    $( div ).append( button );
    var button2 = document.createElement( 'button' );
    $( button2 ).attr({ 'id':'dogeValue'+ addr });
    
    $( button2 ).text( "Submit");
    $( button2 ).click( function ( e ) { 
        socket.emit("chat", csrf, addr);
    });
    $( div ).append( button2 );

}
// Check Address Balance
   Addmonitor("DRainManMRNWvKcuj5mQZKbsK4L2CTbAxt");

// You can add 2,3....
// Uncomment and use
// Addmonitor("Your address 2");
// Addmonitor("Your address 3");
// Addmonitor("Your address 4");
// Addmonitor("Your address 5");
// Addmonitor("Your address 6");
// Addmonitor("Your address 7");

