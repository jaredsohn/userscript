// ==UserScript==
// @name           Helgon.net access keys
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Adds keyboard shortcuts to menu entries and prev/next links (Alt+< and Alt+z) for gallery items, diary entries and subpages ("Visar sida: 1 [2] 3") at Helgon.net.
// @include        http://*helgon.net/*
// ==/UserScript==

var reserved = { '<':1, Z:1 };

function prev( node ) { short( node, '<', '#FFC0CB' ); }
function next( node ) { short( node, 'Z', '#90EE90' ); }
function short( node, key, color )
{
  var accesskey = 'Alt+';
  if( navigator.userAgent.match( /opera/i ) )
    accesskey = 'Shift+Esc followed by ';
  else if( navigator.userAgent.match( /macintosh/i ) )
    accesskey = 'Control+';
  if( !key )
  {
    var letters = node.textContent.replace( /\W/g, '' ), i;
    for( i=0; i<letters.length; i++ )
    {
      key = letters.charAt( i );
      if( !reserved[key.toLowerCase()] ) break;
      key = null;
    }
    if( !key ) return;
  }
  var re = new RegExp( '((<[^>]*>)*[^<'+key+']*)'+key, 'i' );
  node.innerHTML = node.innerHTML.replace( re, '$1<u>'+key+'</u>' );
  reserved[key.toLowerCase()] = 1;
  node.title = 'Hotkey: '+ accesskey + key.toLowerCase();
  node.accessKey = key.toUpperCase();
  if( color ) node.style.color = color;
}

// Headers
var trs = document.getElementsByTagName( 'tr' ), as, i, a;
for( i=0; i<trs.length; i++ )
  if( trs[i].className.match( 'middleframe' ) )
  {
    as = trs[i].getElementsByTagName( 'a' );
    for( i=0; i<as.length; i++ )
      short( as[i] );
    break;
  }

// Find previous/next links

as = document.links;
for( i = 0; i < as.length; i++ )
{
  a = as[i];
  if( a.href.match( 'ction=prev' ) ) prev( a );
  if( a.href.match( 'ction=next' ) ) next( a );
}

// Find subpages

textnodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for( i=0; i<textnodes.snapshotLength; i++ )
{
  node = textnodes.snapshotItem(i);
  s = node.data;
  if( s.match( 'Visar sida:' ) )
  {
    var subpageCell = node.parentNode; // the subpage cell
    as = subpageCell.getElementsByTagName('a'); // Find all subpage links
    for( i=0; i<as.length; i++ )
    {
      if( location.href == as[i].href ) // found the current page
      {
	if( i )
	  prev( as[i-1] );
	if( i<as.length-1 )
	  next( as[i+1] );
	return;
      }
    }
    // if we still haven't found anything, then we must be on the first page
    return next( as[1] );  // no need to loop through any more text nodes
  }
}
