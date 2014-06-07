// ==UserScript==
// @name          My MSN Subscribe
// @namespace     http://www.lysator.liu.se/~jhs/userscript
// @description   Adds links to subscribe to site feeds via My MSN
// ==/UserScript==

var feeds = [], links = document.getElementsByTagName( 'link' );
var types = [ 'rdf', 'atom', 'rss' ], i, j, div, g, c, node, feed, id;
var named = 'MyMSN', urlprefix='http://my.msn.com/addtomymsn.armx?id=rss&ut=';
var color = '#3B8ABB';

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
  node.src = 'data:image/gif;base64,R0lGODlhRwAOANUAAEyYxTh7pDuKu/BLHkF1lYjmhkCErI+qrmbMZvKJMGeu1G213VmjzVqZu9mMVDpjgmKyW460xNCpkkiKsHi01OjATHO74WGhoGiYtyuPRk6IqcjOt3mpwlCPs6rDxGSnzESTwvnEHP///1+ewEJ+olaTtAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAABHAA4AQAb/QIRwSERAjsWkcslsOoWAKKDjyWQejlCi0gGQRCSAweAVgctn6Tc8RrNJD3M8TDCHJ49C4UEGCBUcEQYBARgSCQOJAxIMHWYiGiMaj3UiBJUNCgqOZpGTZpUEHR0Nn5CTHZoNepmaQgKwsbAGsxgTsri5uru8vblCCxQeERwfCh8eiIkHmiMjCgvRCs4fzs3P0tbRC9PP0yXgI9XYx9Db5wtCDAwAEYIP8AnKGAyTcY/3GpxmHev1IvfkgHpk50tASB30KCzQTwiIhw8NHDiyQUKFDQZABBARAKJGMx03cvS4sSNEkZUolXy4EoQAQgIgCrFwzoJNBREkDHDAwabPxp9AgwodSrSohT8ROgTQ4IGDBweKFn1o0Amagk9fRDSgqjUaVw1WP5Uw1akq1QbStppLh+ADA2IdBmGRt2zEBIIHNWS1w+DYXXx4QWko8Q+wBgYlCOghQPiDunUdIly48oCuA8IGwGQlkZVMKAD+MnMuSDrwaDMGJizUM4EBFCkgShQ4UiFEiAoTAJSUohtkb468d0tBOSjAvTgBAICok1yMnj5+EOSSeICERAIYZuWCCYu7LFq4CBUnwB28dl5P0qtfz15IEAA7';
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
