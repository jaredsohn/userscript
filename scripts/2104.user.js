// ==UserScript==
// @name          NewsGator Subscribe
// @namespace     http://www.lysator.liu.se/~jhs/userscript
// @description   Adds links to subscribe to site feeds via NewsGator
// ==/UserScript==

var feeds = [], links = document.getElementsByTagName( 'link' );
var types = [ 'rdf', 'atom', 'rss' ], i, j, div, g, c, node, feed, id;
var named = 'NewsGator';
var color = '#298B36';
var urlprefix = 'http://www.newsgator.com/ngs/subscriber/subext.aspx?url=';

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
  node.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAAMCAMAAAAptHEQAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMAUExURf///5mZmWZmZimLNjiKWYmJiWSWQf+ZAOHh4YuwcTt7jUJ9j7HKoPX486enp9jlz8XXt9PT0/Dw8OLr2+Lo6Pj4+Ozy55CQkDaLQp6+ienp6bvRrJiYmOno6pK6rnejWYGqZbW1tajElMTExFaWaW6dTZ+fn/+xPfDu6f+dC/+jGvr6+tra2v/nw/39/f/15svLy//68f+nIv/rzv+iF66urv/dqv/v1v+nJP+gEf+fD//htf/QiTuJUv7+/kCFUJW3ff/frv+qKdLS0v/Fb/++W7Ozs/v7+//bpZKzrP/Zn1qacL29vb6+vv/jue3t7cDAwK2trf+pJv+kG/T17P+cB//oxv/Jd+7w7v/Uk+7u7v+fEM7ew/+4Tv/26Li4uP/Tkf/z4Kmpqf+/Xv/Gcf/t0gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMftOacAAAHTSURBVHjanJIHb9swEIUPsHkkE02KkixLsmzHqxlN2jSjeyTdM+ne+///hR5lyXUKIyjyRDxKBPThHe+gcVJLUOnGix8HcEY1HnY6ncHgcYt0s9WcMT/cW9s5f1Zmx8Rrksp9uT6/f/T16f9TXG8BU7+aMmc5Ye35LGa7bVyof0mBW3oAYEl6sV2bPApKJoXUeZm0zrn56HAPrr69fcF89BgbQTtmrAdM0BJM0YdjS8QisrvGLUTLQ0TPRZTQGBApn+hJPvnL/HaO8w24xvnqM0rJhIr9rKcc1q6YKzElT4cETJKuTU45bbTAQw9TmDK1znOtm7PaX/P98TY8GK/yMdXMAJwVtsOcdVUxQ4dl/q2+qVlaxonpIv2IlvFGq6w91/O1X+IXv9P25iP/XDNjR4TxFlsPDRNAPWH9woa+TCihNMwIXQgwrZnEeqfn+/6T8+NN2LjC+fua6bNRPAp7ccayzPEdJ8uiYdFFGQyLAqWLXS9BiYk7x6xnaVr7Ht3nnd3LnO9Tk0JBd6pAbfkhgO+HtJQQIgTbSylllHrU6sCNILA+Ue8N83pzXlXfdwlKerl92lCmVn/oLZz5peUTT3X8+y7d6a8vpw56KuVC5B8BBgBB8ixoqKGYaAAAAABJRU5ErkJggg==';
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
