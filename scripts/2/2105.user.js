// ==UserScript==
// @name          Newsburst Subscribe
// @namespace     http://www.lysator.liu.se/~jhs/userscript
// @description   Adds links to subscribe to site feeds via Newsburst
// ==/UserScript==

var feeds = [], links = document.getElementsByTagName( 'link' );
var types = [ 'rdf', 'atom', 'rss' ], i, j, div, g, c, node, feed, id;
var named = 'Newsburst', urlprefix = 'http://www.newsburst.com/Source/?add=';
var color = '#FF6600';

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
  node.style.marginBottom = '-4px';
  node.src = 'data:image/png;base64,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';
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
