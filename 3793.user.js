// ==UserScript==
// @name          Netvibes Subscribe
// @namespace     http://www.spikydog.com/userscripts
// @description   Adds links to subscribe to site feeds via Netvibes
// ==/UserScript==

var feeds = [], links = document.getElementsByTagName( 'link' );
var types = [ 'rdf', 'atom', 'rss' ], i, j, div, g, c, node, feed, id;
var named = 'Netvibes';
var color = '#9999FF';
var urlprefix = 'http://www.netvibes.com/subscribe.php?url=';

for( i=0; i<links.length; i++ )
  if( links[i].rel.match( /alternate/i ) )
    for( j=0; j<types.length; j++ )
      if( links[i].type.toLowerCase().match( types[j] ) ||
	  links[i].href.toLowerCase().match( types[j] ) )
      {
	feeds.push({type:types[j], href:links[i].href, title:links[i].title});
	break;
      }

if( feeds.length )
{
  div = document.createElement( 'div' );
  node = document.createElement( 'img' );
  node.style.margin = '1px 1px -3px 0';
  node.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAAAMCAMAAAAtQaEtAAAAA3NCSVQICAjb4U/gAAAAvVBMVEX////7/P/8/fv4+vf4+Pj0+P/1+PPw9e3q8v/p8f7f6//U5P/V5P/K3f+/1/+10P+qyf+/v/+9vf+gw/+5uf+4uP+0tP+VvP+urv+Ktf+rq/+qqv+oqP+np/+Arv+jo/2iovx+rf59q/x1qP+cnPabm/WZmf9rof+WlvKVlfFgmv+NjeeMjOZWlP+Fhd6Fhd2AgNV/f9N5ecl4eMh2dsR1dcN0dMJ0dMFxcbxwcLtsbLRra7NkZKZgYKBfX5+SVoWeAAAACXBIWXMAAAsSAAALEgHS3X78AAAAJXRFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyBNWCAyMDA0h3aszwAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8wOC8wNsZFTqkAAAE+SURBVHicpdMLT8MgEAfwi4oiXllddV1nPB+oKHq+Nb6//8fyCt0yspps8Z8UyLX3C6QtDId7o/Gky9HZJcTwXGDF7F5kuf6/uJ8kgDTf9ooaFUB7ZUGtFmqSUS7ed+LOLK1Yci01TPeKumsli9PafMa5+DgVZw9EMbBuRYUatp0zMhkjexRRlrJbI4OJS4BJ5FJk+dwvEtUimuBCZUOofAVOCiWydwGV897JOVza8ZIismasPRSsiWBAwCaKFnxjWSu25I2JDQf5qV//EIFqRgpEZETUXHiIIgJRyVK2pmFv24bDXHzrF08AmbEKylhFpIB8mcRShapgVANdFOCpbTjOxY8ecQPKU3mz0tcwVzDgBuSgSSQWvwoy2sA+Hvs8/8K/e/e4Uq5u7h6eXlLeP3++OmaZf2Zrc31tsfoLg1A6VEAHmDQAAAAASUVORK5CYII%3D';
  node.alt = named + ' logo';
  div.appendChild( node );
  div.style.font = 'xx-small bolder Helvetica,Arial,sans-serif';
  div.title = "Subscribe to this site's feeds via "+named+"!";
  for( i=0; i<feeds.length; i++ )
  {
    feed = feeds[i];
    node = document.createElement( 'a' );
    node.title = 'Subscribe to ' + feed.title;
    node.href = urlprefix + feed.href;
    node.innerHTML = feed.type.toUpperCase();
    node.setAttribute( 'style', 'margin:0 2px; background-color:'+color+'; '+
		       'padding:2px; color:white; text-decoration:none;' );
    div.appendChild( node );
  }
  node = document.createElement( 'a' );
  node.innerHTML = 'X';
  node.title = 'Close';
  node.href = 'javascript:void document.body.removeChild(document.getElementById("tab-'+named+'-subscribe"))';
  node.setAttribute( 'style', 'padding:1px 2px; background-color:white; ' +
		     'margin:1px 2px; color:'+color+'; text-decoration:none;' +
		     'border:1px solid '+color+';' );
  div.appendChild( node );
  tab( div, 'tab-'+named+'-subscribe', 2 );
}

function tab( node, id, corner, action, fg, bg, border )
{
  border = border || 'black';
  fg = fg || border;
  bg = bg || 'white';

  function addStyles( node, styles )
  {
    for( var i in styles )
      node.style[i] = styles[i];
  };

  function borderize( node )
  {
    var container = document.createElement( 'div' );
    var div = document.createElement( 'div' ), i;
    var hor = corner&1 ? 'Right' : 'Left', ch = corner&1 ? 'Left' : 'Right';
    var ver = corner&2 ? 'Bottom' : 'Top', cv = corner&2 ? 'Top' : 'Bottom';
    var styles = { zIndex:'99999', position:'fixed', width:'auto',
		   padding:'0px', border:'0px' };
    styles[hor.toLowerCase()] = styles[ver.toLowerCase()] = '0px';
    styles[ch.toLowerCase()] = 'auto';
    var common = { border:'0px solid '+border, overflow:'hidden',
  		 display:'block', backgroundColor:bg, fontSize:'1px',
  		 padding:'0px', width:'auto' },
        divstyle = { border:'0px solid '+border, background:bg,
		     width:'auto', paddingLeft:'5px', paddingRight:'5px',
		     cursor:'pointer' },
        round = [{height:'2px'},{height:'1px'},{height:'1px'},{height:'0px'}];
    for( i=0; i<round.length; i++ )
    {
      round[i]['margin'+ch] = [1,2,3,5][i] + 'px';
      round[i]['border'+ch+'Width'] = [1,1,2,0][i] + 'px';
    }
    round[3]['border'+ver+'Width'] = '1px';
    divstyle['padding'+cv+'Width'] = '1px';
    divstyle['padding'+ver+'Width'] = '2px';
    divstyle['border'+ch+'Width'] = '1px';

    div.appendChild( node );
    addStyles( div, divstyle );
    addStyles( container, styles );
    if( ver == 'Top' )
      container.appendChild( div );
    for( var i=0; i<round.length; i++ )
    {
      node = document.createElement( 'div' );
      addStyles( node, common );
      addStyles( node, round[ver=='Top' ? i : 3-i] );
      container.appendChild( node );
    }
    if( ver != 'Top' )
      container.appendChild( div );
    return container;
  };

  function addTab( node, id )
  {
    var a = document.getElementById( id );
    var style = { textDecoration:'none', background:bg, color:fg,
		  paddingBottom:(corner&2?'5px':'1px'),
		  paddingTop:(corner&2?'1px':'5px') };
    if( a )
      return; // done that
    else
    {
      a = document.createElement( 'div' );
      addStyles( a, style );
      a.id = id + '-link';
      if( action )
	a.addEventListener( 'click', action, false );
      var div = borderize( a );
      div.id = id;
      document.body.appendChild( div );
    }
    a.appendChild( node );
  };

  addTab( node, id );
}