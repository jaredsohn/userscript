    // ==UserScript==
    // @name       Notification
    // @namespace  http://synchtube.6irc.net
    // @version    0.1
    // @description  Tracy is my waifu
    // @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
    // @match      http://*.synchtube.6irc.net/r/*
    // @copyright  2012+, You
    // ==/UserScript==
     
    $('body').append($( '<audio preload="auto" id="squee"><source src="http://www.freesound.org/people/fordps3/sounds/186669/download/186669__fordps3__computer-boop.wav" type="audio/wav"></audio>' ) );
    $( '#squee' )[ 0 ].volume= 1;
     
    function notification()
    {
     var squee= $( '.nick-highlight:not( .parsed )' );
     if( squee.length ) {
      $( '#squee' )[ 0 ].play( );
      squee.addClass( 'parsed' );
     }
    }
    setInterval( notification , 1000 );