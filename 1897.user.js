// ==UserScript==
// @name          Drop link indirection level
// @namespace     http://www.lysator.liu.se/~jhs/userscript
// @description	  Offers to rewrite links with URL arguments pointing elsewhere, to elsewhere, without the link bounce indirection. (I e http://redirect.to/?url=http://www.google.com/ becomes a direct link to http://www.google.com/)
// ==/UserScript==

var last = 'javascript:;';

function unzip( event )
{
  var me = document.getElementById( 'jhsu' );
  forIndirectLinks( function( n, url ){ n.href = unescape( url ); }, me );
  addPrompt();
  event.preventDefault();
}

function forIndirectLinks( callback, ignore )
{
  var i, link, n = 0, real;
  for( i=0; i<document.links.length; i++ )
  {
    if( (link = document.links[i]) == ignore ) continue;
    //var im = link.getElementsByTagName('img').item(0);
    //if( im ) im.style.borderColor = 'red';
    var src = link.search;
    var indirect = new RegExp('([^&?]+)=(https?(:|%3a)[^&]+)','gi');
    var referrer = new RegExp('^ref[er]*$', 'i');
    while( (real = indirect.exec( src )) )
      if( !referrer.test( real[1] ) )
      {
	// var im = link.getElementsByTagName('img').item(0);
	// if( im ) im.style.borderColor = 'pink';
	last = link.href;
	if( callback )
	  callback( link, real[2] );
	n++;
	break;
      }
  }
  return n;
}

function addStyles( node, styles )
{
  for( var i in styles )
    node.style[i] = styles[i];
}

function borderize( node )
{
  var container = document.createElement( 'div' );
  var div = document.createElement( 'div' );
  var styles = { zIndex:'99999', position:'fixed', top:'0px', right:'0px',
		 width:'auto', padding:'0px', border:'0px', left:'auto' };
  var common = { border:'0px solid black', overflow:'hidden', display:'block',
		 backgroundColor:'white', fontSize:'1px', padding:'0px',
		 width:'auto' },
      round = [
    { height:'2px', marginLeft:'1px', borderLeftWidth:'1px' },
    { height:'1px', marginLeft:'2px', borderLeftWidth:'1px' },
    { height:'1px', marginLeft:'3px', borderLeftWidth:'2px' },
    { height:'0px', marginLeft:'5px', borderBottomWidth:'1px' } ];
  addStyles( container, styles );
  div.appendChild( node );
  container.appendChild( div );
  addStyles( div, { border:'0px solid black', background:'white', width:'auto',
		   'borderLeftWidth':'1px', 'padding':'2px 5px 0 5px' });
  for( var i=0; i<round.length; i++ )
  {
    node = document.createElement( 'div' );
    addStyles( node, common );
    addStyles( node, round[i] );
    container.appendChild( node );
  }
  return container;
}

function addPrompt( add )
{
  var a = document.getElementById( 'jhsu' ), links = forIndirectLinks(0, a), i;
  var style = { 'textDecoration':'none', background:'white', color:'black' };
  if( add && a ) return; // done that
  var bg = 'http://www.lysator.liu.se/~jhs/gfx/bottom-left.png';
  if( !links )
  {
    if( !a ) return;
    var topdiv = a.parentNode.parentNode;
    return topdiv.parentNode.removeChild( topdiv );
  }
  if( !a )
  {
    a = document.createElement( 'a' );
    addStyles( a, style );
    a.id = 'jhsu';
    a.addEventListener( 'click', unzip, false );
    a.appendChild( document.createTextNode( '' ) );
    var div = borderize( a );
    document.body.appendChild( div );
  }
  a.href = last;
  a.firstChild.nodeValue = 'unzip ' + links;
}

addPrompt( 1 );
