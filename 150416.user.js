// ==UserScript==
// @name           edX.org Youtube video urls extracter
// @description    edX.org Youtube video urls extracter
// @include        https://www.edx.org/courses/*/*/*/courseware/*
// @copyright      Omer Akhter
// @version        0.1
// @license        LGPL http://www.gnu.org/licenses/lgpl.html
// @grant          GM_deleteValue
// @grant          GM_listValues
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_log
// @grant          GM_registerMenuCommand
// @grant          GM_openInTab
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

var VID_LOAD_MILLIS = 100;

$ ( document ).ready ( function () {

  cleanUp ();
  if ( confirm ( 'Parse Video Links?' ) ) {
    loadNextSeq ();
  }
  // GM_registerMenuCommand( "Get Youtube Urls", loadNextSeq );
} );

function _log ( val ) {

  if ( unsafeWindow && unsafeWindow.console ) {
    unsafeWindow.console.log ( val );
  }
  else {
    GM_log ( val );
  }
}

/*
function addXMLRequestCallback ( callback ) {
  var oldSend, i;
  if ( XMLHttpRequest.callbacks ) {
    // we've already overridden send() so just add the callback
    XMLHttpRequest.callbacks.push ( callback );
  }
  else {
    // create a callback queue
    XMLHttpRequest.callbacks = [ callback ];
    // store the native send()
    oldSend = XMLHttpRequest.prototype.send;
    // override the native send()
    XMLHttpRequest.prototype.send = function () {

      // process the callback queue
      // the xhr instance is passed into each callback but seems pretty useless
      // you can't tell what its destination is or call abort() without an error
      // so only really good for logging that a request has happened
      // I could be wrong, I hope so...
      // EDIT: I suppose you could override the onreadystatechange handler though
      for ( i = 0; i < XMLHttpRequest.callbacks.length; i++ ) {
        XMLHttpRequest.callbacks [i] ( this );
      }
      // call the native send()
      oldSend.apply ( this, arguments );
    }
  }
}

addXMLRequestCallback ( function ( xhr ) {

  console.log ( 'testing' );
  console.log ( xhr );
} );
*/

function pageUrl () {

  return $ ( '.chapter li.active a' ).attr ( 'href' );
}

function cleanUp () {

  var keys = GM_listValues ();
  for ( var i = 0, key = null; key = keys [i]; i++ ) {
    GM_deleteValue ( key );
  }
}

function pageVidIdList () {

  var idList = GM_getValue ( pageUrl (), '' );
  return idList.split ( '/' );
}

function currentSeq () {

  return GM_getValue ( pageUrl () + '_curr', 0 );
}

function videoUrl () {

  var temp = $ ( '.video-player iframe' );
  if ( temp.length < 1 ) {
    return false;
  }

  for ( i = 0; i < temp.length; i++ ) {
    var url = temp [i].src.split ( '?' ) [0];
    _log ( url );

    return url;
  }
  return false;
}

function sequence () {

  return $ ( '#sequence-list li a' );
}

function addVid ( vid, title ) {

  if ( !vid ) {
    return;
  }
  vid = vid.substring ( vid.lastIndexOf ( '/' ) );

  var _pageUrl = pageUrl ();
  var idList = GM_getValue ( _pageUrl, '' );
  if ( idList.indexOf ( vid ) == -1 ) {
    idList += vid + '|' + title;
    GM_setValue ( _pageUrl, idList );
  }
}

function proceed () {

  var currName = pageUrl () + '_curr';
  GM_setValue ( currName, GM_getValue ( currName, 0 ) + 1 );
}

var RETRY_COUNT = 0;
function loadNextSeq () {

  RETRY_COUNT = 0;
  var seq = sequence ();
  var seqLen = seq.length;
  var currSeq = currentSeq ();
  if ( currSeq < seqLen ) {
    _log ( 'Loading ' + ( currSeq + 1 ) + '/' + seqLen );
    seq [currSeq].click ();
    setTimeout ( saveVidUrl, VID_LOAD_MILLIS );
  }
  else {
    //showResults( showInTab );
    showInTabAsTable ();
  }
}

function saveVidUrl ( stop ) {

  var vidUrl = videoUrl ();
  if ( RETRY_COUNT < 3 && !vidUrl ) {
    RETRY_COUNT++ ;
    setTimeout ( saveVidUrl, VID_LOAD_MILLIS );
    return;
  }

  window.stop ();

  vidTitle = jQuery.trim ( $ ( '.xmodule_VideoModule h2' ).text () );
  addVid ( vidUrl, vidTitle );
  proceed ();

  if ( !stop ) {
    loadNextSeq ();
  }
}

function showInTab ( msg ) {

  var _tab = GM_openInTab ( 'data:text/plain,' + msg );
}

function newTabWithHtml ( html ) {

  var _tab = GM_openInTab ( 'data:text/html,' + html );
}

function showInTabAsTable () {

  var vidIdList = pageVidIdList ();

  var table = $ ( '<table />', {
    'style' : 'border-collapse: collapse;', // border: thin solid
    'border' : '1'
  } );

  var cellStyle = 'padding: 3px; ';
  var headerStyle = cellStyle + 'font-weight: bold; background: black;color: white;';
  var tr = $ ( '<tr />' ).appendTo ( table );
  tr.append ( $ ( '<td />', {
    'text' : 'Link',
    'style' : headerStyle
  } ) ).append ( $ ( '<td />', {
    'text' : 'Title',
    'style' : headerStyle
  } ) ).append ( $ ( '<td />', {
    'text' : 'Video Id',
    'style' : headerStyle
  } ) );

  var textVersion = '';
  for ( i = 0; i < vidIdList.length; i++ ) {
    vidIdList [i] = jQuery.trim ( vidIdList [i] );
    if ( vidIdList [i].length === 0 ) {
      continue;
    }

    tr = $ ( '<tr />' ).appendTo ( table );

    var entry = vidIdList [i].split ( '|' );
    var link = 'https://www.youtube.com/' + entry [0];
    tr.append ( $ ( '<td style="' + cellStyle + '"/>' ).append ( $ ( '<a />', {
      //https://www.youtube.com/embed/
      'href' : link,
      'text' : link
    } ) ) );
    textVersion += link + ',';
    textVersion += entry [0] + ',';

    tr.append ( $ ( '<td />', {
      'text' : entry [1],
      'style' : cellStyle
    } ) );
    textVersion += entry [1];

    tr.append ( $ ( '<td />', {
      'text' : entry [0],
      'style' : cellStyle
    } ) );

    tr.append ( $ ( '<td />', {
      'text' : entry [0],
      'style' : cellStyle
    } ) );

    textVersion += '<br />';
  }

  if ( table.find ( 'tr' ).length > 0 ) {
    var html = $ ( '<dummy />' ).append ( $ ( '<html />' ).append ( $ ( '<body />', {
      'style' : 'font-family: monospace;'
    } ).append ( table ).append ( $ ( '<div />', {
      'html' : textVersion,
      'style' : cellStyle + 'margin-top: 10px; '
    } ) ) ) ).html ();
    _log ( html );
    newTabWithHtml ( html );
  }
}
