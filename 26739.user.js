// ==UserScript==
// @name           GGRD util for adding to del.icio.us 
// @namespace      http://cocoromi.s57.xrea.com/
// @include        http://www.google.com/reader*
// @include        https://www.google.com/reader*
// @include        http://reader.google.com/*
// @include        http://google.com/reader*
// Shift + Akey to add tag to del.icio.us
//   for customize modify object 'KEY_HASY'
//   ex) press Shift+A and tag google
//       'A' : 'google'
// ==/UserScript==
const KEY_HASH = {
  '0' : '###test',
  '1' : '#lib',
  '2' : '#sozai',
  '3' : '#neta',
  '4' : '#image',
  '5' : '#picture'
};

const XPATH_LIST_URL   = ".//*[@class='entry-original'][1]";
const XPATH_LIST_DESC  = ".//*[@class='entry-title'][1]";
const XPATH_LIST_EXT   = ".//*[@class='snippet'][1]";

const XPATH_XPAND_URL  = ".//*[@class='entry-title-link'][1]";
const XPATH_XPAND_EXT  = ".//*[@class='item-body'][1]";
//const ID_MESSAGE = 'gbar';
const ID_MESSAGE = 'viewer-top-links';
const ID_CURRENT = 'current-entry';
const ID_VIEW_CARD = 'view-cards';

const SELECTED = 'selected';

const MODE_XPAND = 'expand';
const MODE_LIST = 'list';

const API = 'https://api.del.icio.us/v1/posts/add?';
const METHOD = 'get';


function xpath(node , query) {
  return document.evaluate(query, node , null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function toQuery( param ) {
    var query = new Array();
    for(var i in param){
      query.push( i + '=' + encodeURIComponent( param[i] ) );
    }
    return query.join('&');
}

function getExpandParam( node ){
    var param = new Object();
    var a = xpath( node , XPATH_XPAND_URL).snapshotItem(0);
    param.url = a.href;
    param.description = a.firstChild.nodeValue;
    param.extended    = xpath( node , XPATH_XPAND_EXT).snapshotItem(0).firstChild.innerHTML;
    
    return param;
}

function getListParam( node ){
    var param = new Object();
    param.url         = xpath( node , XPATH_LIST_URL).snapshotItem(0).href;
    param.description = xpath( node , XPATH_LIST_DESC).snapshotItem(0).innerHTML;
    param.extended    = xpath( node , XPATH_LIST_EXT).snapshotItem(0).innerHTML;
    
    return param;
}

function printMessage( message ){
  var gbar = getGBar();
  var span = document.createElement('span');
  span.innerHTML = message ;
  span.className = 'gb1';

  gbar.appendChild( span );
  return span;
}

function removeMessage( node ){
  var gbar = getGBar();
  gbar.removeChild( node );
}

function getGBar(){
  return document.getElementById( ID_MESSAGE );
}

function getViewMode(){
  return document.getElementById( ID_VIEW_CARD ).className.indexOf( SELECTED ) < 0 ? MODE_LIST : MODE_XPAND;
}

var KeyListener = {
  keyPress : function ( event ){
    if( !event.shiftKey ) return ;
    
    var current = document.getElementById(ID_CURRENT);
    if( current == undefined) return ;

    var key = String.fromCharCode( event.which || event.keyCode );
    if( KEY_HASH[ key ] == undefined ) return;

    var mode = getViewMode();

    var param;
    if( mode == MODE_LIST ){
      param = getListParam( current );
    }else if( mode == MODE_XPAND ){
      param = getExpandParam( current );
    }
    param.extended = param.extended.substr( 0 , 100);
    param.tags = KEY_HASH[ key ];

    var query = toQuery( param );

    var mes = printMessage( param.tags );

    GM_xmlhttpRequest({
      method : METHOD ,
      url: API + query,
      onload : function (req) {
        removeMessage( mes );
      }
    });
  }
}

function init(){
  for( var i in KEY_HASH ){
    printMessage( i + ':' + KEY_HASH[ i ] );
  }
}

window.addEventListener('load', init , false);
document.addEventListener( 'keydown', KeyListener.keyPress, false );


