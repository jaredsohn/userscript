// ==UserScript==
// @name           vkontakte music download
// @namespace      http://seb.riot.org/gmscripts
// @description    Displays a DL-link in any audio-file view on vkontakte.ru (and possibly a SqueezeCenter link)
// @include        http://vkontakte.ru/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// set the url of your SqueezeCenter here (or leave empty)
//var squeezeUrl = "http://gruft:9000";
var squeezeUrl = ""; 

function composeUrl() {
  // taken from player.js operate()
  if( arguments.length == 3 ) {
    var id = arguments[0];
    var url = arguments[1];
    var duration = arguments[2];
    return url;
  }
  else {
    var id = arguments[0];
    var host = arguments[1];
    var user = arguments[2];
    var file = arguments[3];
    var duration = arguments[4];
    return "http://cs" + host + ".vkontakte.ru/u" + user + "/audio/" + file + ".mp3";
  }
}

function adaptAudioRows() {
  $(".audioRow:not(:has(.gmmod)) img.playimg").each( function() {
    var onclick = this.getAttribute("onclick");
    onclick = onclick.replace( "return operate", "composeUrl" );
    var mp3Url = eval( onclick );
    
    var tag =
      '<span class="gmmod">[' +
      '<a href="' + mp3Url + '">DL</a>';
    
    if( squeezeUrl ) {
      tag = tag +
        '|' +
        '<a target="_squeezestatus" href="' + squeezeUrl + '/status.html?p0=playlist&p1=play&p2=' + mp3Url + '">SQ</a>';
    }
    
    tag = tag + ']&nbsp;</span>';

    $(this).closest( "tr" ).find( ".audioTitle" ).prepend( tag );
  });
  
  addResultChangeListener();
};

function addResultChangeListener() {
  var eventName = "DOMSubtreeModified";
  $("#results").bind( eventName, function() {
    $(this).unbind( eventName );
    setTimeout( adaptAudioRows(), 100 );
  });
}

$( function() {
  adaptAudioRows();
});
