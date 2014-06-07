// ==UserScript==
// @name          Bloglines Subscribe
// @namespace     http://www.lysator.liu.se/~jhs/userscript
// @description   Adds links to subscribe to site feeds via Bloglines
// ==/UserScript==

var feeds = [], links = document.getElementsByTagName( 'link' );
var types = [ 'rdf', 'atom', 'rss' ], i, j, div, g, c, node, feed, id;
var named = 'Bloglines', urlprefix = 'http://www.bloglines.com/sub/';
var color = '#1A8DBA';

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
