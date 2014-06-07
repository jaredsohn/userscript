// ==UserScript==
// @name           Mark my links
// @version        1.10
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Finds and marks links to you visually with a tiny favicon of yours. Install and customize what sites should get which icons, and browse the web, getting visual cues for what links go back to you wherever you roam. As a bonus, the first ten links to you on any page (except your own) can be focused by way of access key 1..9 (and 0) -- i e Alt+1 will scroll the first link into view. Visit the script homepage to set it up or reconfigure it. You can also use this hack to change favicons for any page or URL to any other icon you might prefer. An easy way to minimize typing to add a new site to the tool is to run this bookmark on a site you would like to add: javascript:location='http://ecmanaut.blogspot.com/2006/02/mark-my-links-configuration-updates.html'
// @include        http://*
// ==/UserScript==

var revision = '1.10.20060501';

var homepage = 'http://ecmanaut.blogspot.com/2006/02/mark-my-links-configuration-updates.html';

var test_url = document.referrer || '';
var gave_fav = is_abs_url( location.hash ) ? location.hash.substring( 1 ) : '';
var base_url = 'http://hem.bredband.net/ecmanaut/2006/02/25/';
var del_link = base_url + 'link_delete.png';
var add_link = base_url + 'link_add.png';
var help_url = 'http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:RegExp#Special_characters_in_regular_expressions';
var debug_it = function( msg ){ /*alert( msg );*/ };

var my_links = [];
var max_wait = 100; // max time in ms between screen updates
var busy_now = false; // mutex:ish

// Link love for the masses
var def_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMxSURBVHjabJFfaBxVFMa/e+fO7Mzszuxmk7bbVEhCaGKsabJtVErBYkAbWyoipSKCPuijoFBfVETQB19966OgDwUpNKI1NFSwJlas1Cc1UI2LtrYhMcnuJrOz8+fe65kpFf9dOMNw7/l+5zvnsF8XF3Ht6tc7/1hceKWYyGnH9/tlq7kpff/ciddefXfpyrfp1Yvzp6tx/Kzll/tUN1xpxdGXQ48fe2//yOhNwS2rJ7gwd36qXj8wcOy4aRQKPGk29zQ+/WTv8sI3UAzb+6rVt8eeeLJg9fZxGUX9ty7NjzdmZ6f5G28eN05U/Ne96z89s3v/hNW88hVfm5tj4Y0brHdy0izvG5/yav1HyqbpbVz+gq99NseCX5Z5accukfy4VGu3Nmx2bmpqaXcQ3MsrFQSNBnQUgbsO/MlJeOMTAAeC739A67trkME2eMGBMzAIub2FjmUts7O1WrumlCe1hgpDwCAF45RowSh5YABSEqpuBEY5WqZgjgvBOQLO2sJ23dQkIZMSsG0Sk8QwAK2gNzehCCCEAWY70HRHH+JTAUJbrpOKysje39ybv/ekZB30oLvkQiOHMKkIQIIMqOgvF4vMIITrwuyvrYu+memP2PkLE35PFamSYORGJylBGLTB8xbyo2V+z0wTnNyoboDqo4/MCnt44P10dPhFjxeGZEwugvCOfaoITi7IARWmzvQdgOPAKBbR5eq2OzR4hheL/u3KzNG3FNORZwg4JLRpHg4J3DSBkwURbLp3hYkSWaeOZHnmsXfMcqUh+u4ZBAbFh+urqw+wnxsvlRyXZStCNm2VDYM8cJZvh6pB2RbU2PAHpfqBM0hTCEkVQOE99ODp1lZ7z85O/FTBLgDtFrWRAXS+VngeVKmIZFd53j768MuqHeaj4XdnpLrdJBodeWHTL15KXVvCK+fryiIT66KrOr69oA8dfF53wq27ur8A2WFJ0lT1+tOrlnExKbkxqr3Q1SqUV0rbjrgsD9ZPIYpX/q75ByA/SbLRuW/s5C1LfZy4hRiOk2zt8D4PDx86SW8r/07/LyBzImWoJu5/bq0ozq67xmx85PAplqYb/5f7pwADAP7iXrLWFIO2AAAAAElFTkSuQmCC';

// And our favourite monkey
var g_monkey = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIDSURBVHjahFM9aBRBFP42rDgHB86Cwi6kyEqaCaTYdAlYmJDmhICcHLiKjcHmSiWFiJ1XWVrGK0KIjWkstrtLERIL4VYwuOVaBHYhwqwkcCMExpm5uJe7cPpgd+bNe++b+d6PVZwKjMv2EyZxkg6UawChPh5sJda4343qdVjjAB/XiKzYQ51c7MU5wGmAx+3P1kSAg5ehZPNLEGcC6bddiDwGdQN483WQKkGaHCI+J1hvta0rAJ2NUC7fb4LecoyeJwm+77/H3J2ncBkzZ8UJR/ThDXDTxb3XbUsDTB20QtlpEEmpVwZr0UGOXyuDtWi76yr9aAebjRmpz2xSpCAEuMz7r7DFpStnlYoC0r4iN7pd2I7iDPiCl05WsGBWGfdG9iapfY5Cse4T1+hTK63I4n0C/iNC8qWHf4m2i+NokA9VWvMC/fM9ojL9CE61MnLb+F7bxXQdDLvIhLgEsPgK7O4y/ic6ofpL9hk8VWZDQf+8WYY0ywzf7gQasSqrtuvVm2HgeT58Qfq1i2C1jubDECvP1ie+QNsD30e8p26nbAjQS7oQpymer9bwbuPFRIBU5SP+9Ba9oxiFO6BcduJmyGRQ5XBma6DeApzpYQPx4wQiUxVQlTr8SdCMsnIeRmZBt+ZO47aEai5KLoZJl0z1v7CpGqY5NLc6JvjX2W/j/0eAAQBq9sR9siLAwwAAAABJRU5ErkJggg==';

// Array of { i:'favicon URL', h:'host regexp', u:'URL regexp', o:1 } objects.
var matchers = eval( GM_getValue( 'matchers', '[{u:"\\\\.user\\\\.js(\\\\?.*)?$",i:"'+g_monkey+'"},{h:"ecmanaut.blogspot.com",i:"http://hem.bredband.net/ecmanaut/gfx/sites/ecmanaut.png"}]' ) );

function reprocess()
{
  if( !busy_now ) // don't react to our own DOMSubtreeModified events
    stall( 'process_links', process_links  );
}

function process_links()
{
  var i, re = build_regexp( matchers );
  var match = function( l ){ return case_normalize_link( l ).match( re ); };
  var older = my_links, link_count = document.links.length - older.length;
  var links = Array.prototype.slice.call( document.links, 0, link_count );
  var found = links.filter( match );
  var local = case_normalize_link( location ), h = location.host.toLowerCase();
  my_links = [];
  found.map( get_coords_of );
  found.sort( function( a,b ) { return a.y < b.y ? -1 : a.y > b.y ? 1 : 0; } );
  //debug_it( found.map( function(x){return x.y+':'+x.href;} ).join('\n') );
  //debug_it( 'Found '+ found.length +' link'+ (found.length==1?'':'s') );
  busy_now = true;
  setTimeout( inject, 0, 'padding', found, local, h ); // 2-pass injection for
  setTimeout( inject, 10, 'images', found, local, h ); // an in-between reflow
  setTimeout( function(){ remove_nodes( older ); }, 20 );
}

function build_regexp( matchers )
{
  var i, m, host = [], full = [];
  for( i=0; i<matchers.length; i++ )
  {
    m = matchers[i];
    if( m.h ) host.push( m.h );
    if( m.u ) full.push( m.u );
  }
  if( full.length )
    full = full.join('|');
  else
    full = '';
  if( host.length )
  {
    var prefix = '^[^:]+://(', suffix = ')(/|$)';
    host = host.join('|');
    if( !full )
      return new RegExp( host_to_regexp( host ), 'i' );
    return new RegExp( host_to_regexp( host ) +'|'+ full );
  }
  return new RegExp( full );
}

function host_to_regexp( host )
{
  var prefix = '^[^:]+://(', suffix = ')(/|$)';
  return prefix + host + suffix;
}

function inject( pass, links, at_url, at_hostname )
{
  var i, n = 0, match, a;
  for( i=0; i<links.length; i++ )
  {
    if( !links[i].y ) continue; // hidden? (in some invisible div, perhaps)
    match = i ? links[i-1].y != links[i].y && ++n : ++n;
    a = mark_link( links[i], match, matchers, at_url, at_hostname, pass );
    if( a ) my_links.push( a );
  }
  if( pass == "images" )
    busy_now = false;
}

function mark_link( link, nth, matchers, local, host, pass )
{
  var icon = test_link( link, matchers, local, host );
  if( icon ) return inject_icon( link, icon, nth, pass );
}

function test_link( link, matchers, local, host )
{
  var i, m, a, url = case_normalize_link( link );
  if( url )
    for( i in matchers )
    {
      m = matchers[i];
      if( local && (m.u ? local.match( m.u ) : host.match( m.h )) )
      {
	if( m.o )
	  override_favicon( m.i );
	continue;
      }
      if( m.u && url.match( m.u ) ||
	  m.h && url.match( m.h ) )
	return m.i || def_icon;
    }
}

function inject_icon( link, favicon, nth, pass )
{
  if( pass == "padding" )
  {
    var left = parseInt( get_style( link, 'paddingLeft' ) );
    link.style.paddingLeft = Math.max( 19, left ) + 'px';
    return;
  }
  var pos = get_coords_of( link );
  var css = 'position:absolute; left:'+ pos.x +'px; top:'+ pos.y +'px;';
  var img = <a href={link.href} style={css}>
    <img src={favicon} width="16" height="16" border="0"/>
  </a>;
  if( nth <= 10 )
  {
    img.@y = link.y;
    img.@accesskey = nth % 10;
  }
  var a = append_to( img, document.body );
  if( nth <= 10 )
  {
    var scroll_to = function(e)
    {
      e.preventDefault(); // don't go there
      var y = e.target.getAttribute( 'y' );
      scrollTo( 0, Math.max( 0, Math.floor( y - window.innerHeight / 2) ) );
    };
    var goTo = function(e) { location.href = e.target.parentNode.href; };
    EventMgr.add( a, 'click', scroll_to, false );
    EventMgr.add( a, 'mouseup', goTo, false );
  }
  return a;
}

var have_overridden = false;
function override_favicon( url )
{
  if( have_overridden ) return;
  have_overridden = true;
  remove_nodes( all( '//link[@rel="shortcut icon"]' ) );
  append_to( <link rel="shortcut icon" href={url}/>, node( '//head[1]' ) );
}

// config code:

unsafeWindow.help = function()
{
  alert( 'Checking this checkbox makes pages you visit that match a rule show'+
	 ' that icon, right in the URL field. This is often useful for sites '+
	 'or pages that do not have a favicon of their own (or whose favicon '+
	 'you would rather exchange for your own) so you can easily scan the '+
	 'tab list by icon rather than by title.' );
}

function configure()
{
  try{
  var form = $( 'config' ), table, i, m, a, icon;
  if( form )
  {
    if( gave_fav )
      icon = gave_fav;
    else if( !(icon = test_link( test_url, matchers )) )
      icon = def_icon;
    table = <table>
    <thead><tr>
      <td colspan="2">
	<input type="checkbox" id="over" title="Override original favicon."
	       style="position:absolute; margin:5px 5px; padding:0;"/>
	<img id="fav" src={icon} class="plain" title="Change marker icon URL."
	     style="position:absolute; padding:3px 4px 3px 3px;
		    cursor:pointer; margin:0 0 0 19px;"/>
        <input id="url" type="text" name="url" title="The current test URL."
	     style="padding:2px 0 2px 41px; border:1px solid #888;" size="65"
	     value={test_url}/>
      </td><td>
	<img id="add" src={add_link} title="Mark links to this site."
	     style="padding:1px 0 0; cursor:pointer;" class="plain"/>
      </td>
    </tr><tr>
      <th style="width:31px; text-align:center;">By</th>
      <th>
	<div style="float:left; width:20px; text-align:center;">
	  <a href="javascript:help()" title="About favicon overriding">?</a>
	</div>
	<div style="float:left; margin-left:20px;">Matcher
	  <a href={help_url} title="RegExp Reference">RegExp</a>
	</div>
	<div style="float:right; font-weight:normal;">
          <button id="save" accesskey="S">Save changes</button>
	</div>
      </th><th></th>
    </tr></thead><tbody id="config-table"></tbody></table>;
    append_to( table, form );
    for( i in matchers )
      add_row( matchers[i], i );
    EventMgr.add( document, 'click', document_click, false );
    EventMgr.add( document, 'keyup', grace( document_keyup ), false );
  }
  if( !gave_fav )
    fetch_favicon( test_url );
  var revs = all( '//*[@class="revision"]' ), rev;
  for( i=0; i<revs.length; i++ )
  {
    rev = revs[i];
    if( rev.id == 'latest' )
      rev = rev.hash.substring( 2 );
    else
      rev = rev.id.substring( 1 );
    if( rev == revision )
      revs[i].className += ' installed';
    if( rev > revision )
      revs[i].className += ' new';
  }
}catch(e){debug_it('configure:'+e)}
}

function add_row( m, i )
{
  try{
  var target = $('config-table'), node = append_to( <tr id={'s'+i}>
    <td id={'t'+i} style="cursor:pointer;">{m.u?'URL':'Site'}</td>
    <td>
      <input type="checkbox" id={'o'+i}
	     title="Override the original favicon with this icon."
	     style="position:absolute; margin:5px 4px; padding:0;"
	     {(m.o?'':'un')+'checked'}="yes"/>
      <img id={'i'+i} src={m.i||def_icon} title="Change marker icon URL."
	   style="position:absolute; padding:3px 4px 3px 3px;
		    cursor:pointer; margin:0 0 0 17px;" class="plain"/>
      <input id={'u'+i} name={'u'+i} type="text" size="60" value={ m.u || m.h }
           style="padding:2px 0 2px 40px; border:1px solid #F0F0F0;"/>
    </td>
    <td>
      <img id={'d'+i} src={del_link} title="Stop marking links matching this."
           style="padding:1px 0 0; cursor:pointer;" class="plain"/>
    </td>
  </tr>, target );
  try_regexp( i );
}catch(e){debug_it('add_row:'+e)}
  return node;
}

function add_site()
{
  try {
  var url = $( 'url' ), fav = $( 'fav' ), table = $( 'config-table' ), m, i;
  url = url.value.replace(/^[^:]*[:\/]*([^\/]*).*/, '$1');
  //debug_it( 'Adding site '+ url +' to matcher list.' );
  var m = { h:url/*.replace(/\./g,'\\.')*/, i:fav.src };
  if( $( 'over' ).checked ) m.o = 1;
  add_row( m, i = matchers.length );
  matchers.push( m );
}catch(e){debug_it('add: '+e)}
}

function try_all_matchers()
{
  var abs, url = $( 'url' ), table = $( 'config-table' ), tr, i, n;
  if( abs = is_abs_url( url.value ) )
    fetch_favicon( url.value );
  else
    set_favicon( def_icon );
  tr = table.getElementsByTagName( 'tr' );
  for( i=0; i<tr.length; i++ )
  {
    n = tr[i].id.substring( 1 );
    if( !abs && matcher_is_site( n ) )
      $('u'+n).style.borderColor = '';
    else if( matchers[n] )
      try_regexp( n, 'force' );
  }
}

function document_keyup( e )
{
  var mine = /^u(rl|\d+)$/, node = e.target, at = node.id || '', i, n, x;
  if( mine = at.match( mine ) )
  {
    if( at == 'url' )
      return try_all_matchers();
    n = mine[1]; // changed regexp
    //colour( 255, 0, 0 );
    return try_regexp( n );
  }
}

function document_click( e )
{
  var node = e.target, at = node.id || '', i, n, m, icon;
  var mine = /^(([dit])(\d+)|fav|add|save)$/;
  //colour( 1,200,2 );
  if( mine = at.match( mine ) )
  {
    switch( at )
    {
      case 'fav': return ask_favicon( node.src );
      case 'add': return add_site();
      case 'save':
	var table = $('config-table'), tr = table.getElementsByTagName('tr');
	try{
	if( all( '//*[contains(@title,"Invalid")]', table ).length )
	  return alert( 'First fix all broken matcher regexps.' );
	matchers = [];
	for( i=tr.length-1; i>=0; i-- )
	{
	  m = {};
	  n = tr[i].id.substring( 1 );
	  m[$('t'+n).textContent == 'Site' ? 'h' : 'u'] = $('u'+n).value;
	  icon = $('i'+n).src || def_icon;
	  if( icon != def_icon ) // no need wasting storage on the default icon
	    m.i = icon;
	  if( $('o'+n).checked )
	    m.o = 1;
	  matchers[i] = m;
	  table.removeChild( tr[i] );
	}
	for( i=0; i<matchers.length; i++ )
	  add_row( matchers[i], i );
	}catch(e){debug_it(e)}
	//prompt('save',matchers.toSource());
	return GM_setValue( 'matchers', matchers.toSource() );
    }
    i = mine[3];
    switch( mine[2] )
    {
      case 't': // change type
	node.innerHTML = node.textContent == 'Site' ? 'URL' : 'Site';
	return try_regexp( i );
      case 'i': return ask_favicon( node.src, i );
      case 'd': // delete site
	var tr = node.parentNode.parentNode;
	tr.parentNode.removeChild( tr );
	delete matchers[i];
	//colour( 12, 12, 12 );
	break;
    }
  }
}

function matcher_is_site( i )
{
  var type = $( 't'+i );
  return type.textContent == 'Site';
}

function try_regexp( i )
{
  var sitep = matcher_is_site( i ), url = $( 'url' ).value, r = $( 'u'+i ), re;
  try {
    if( sitep )
      re = new RegExp( host_to_regexp( r.value ), 'i' );
    else
      re = new RegExp( r.value );
  } catch( e ){ re = undefined; }
  return test_regexp( re, r, sitep ? url : case_normalize_link( url ),
		      'This regexp matches the test URL.',
		      'This regexp does not match the test URL.' );
}

function test_regexp( re, node, match_against, sitep, ok, legal, error )
{
  node.title = error || 'Invalid regexp.';
  try {
    if( typeof re == 'string' )
      re = new RegExp( re );
    if( typeof re == 'undefined' )
      re = new RegExp( '([' ); // anything illegal will do fine
  } catch(e) { node.style.borderColor = '#F00'; return false; }
  node.title = ok;
  if( match_against.match( re ) )
    return !(node.style.borderColor = '#0C0');
  node.title = legal;
  return !!(node.style.borderColor = '');
}


// favicon handling:

function ask_favicon( old, n )
{
  var got = prompt( 'Icon URL?', old||'' );
  if( got ) get_favicon( got, old, n );
}

function get_favicon( url, old, n )
{
  //debug_it( 'get_favicon( "'+url+'", "'+old+'" )' );
  if( url != old )
    imagep( url, set_favicon( url, n ), set_favicon( old, n ) );
  else // no need testing for validity; it's there, all right
    set_favicon( old, n )();
}

function imagep( url, yes, no )
{
  if( url.match( /^data:/i ) ) return yes();
  //debug_it( 'imagep( "'+url+'" )?' );
  var maybe = function( http )
  {
    var got = http.status, status_ok = got >= 200 && got <= 300;
    return status_ok && http.responseText.length ? yes() : no();
  };
  GM_xmlhttpRequest( { method:'HEAD', url:url, onerror:no, onload:maybe } );
}

function set_favicon( url, n )
{
  var node = $( typeof n == 'undefined' ? 'fav' : 'i'+n );
  var text = 'Change marker icon URL.';
  return function(){ if( url ) node.src = url; node.title = text; };
}

function fetch_favicon( url )
{
  url = url || $( 'url' ).value;
  var old = $( 'fav' ).src;
  var was = test_url;
  if( was == url && gave_fav )
    return get_favicon( gave_fav, old );
  url = url.replace( /#.*/, '' );
  get_favicon_url( get_favicon, url, old );
}

function get_favicon_url( cb, url, old )
{
  try{
  var fcache = get_favicon_url.fcache || {};
  var ohwell = set_url_path( url, '/favicon.ico' );
  var failed = function()
  {
    set_favicon( old );
    fcache[url] = false;
    get_favicon_url.fcache = fcache;
    cb( ohwell, def_icon );
  };
  if( !url.match( /^https?:/i ) ) return failed();
  var scrape = function( http )
  {
    if( http.status < 200 || http.status >= 300 ) return failed();
    var html = http.responseText.replace( /[\r\n]+/g, '' );
    try{
    var link = /<link[^>]*\srel=['"]shortcut icon["'][^>]*>/i;
    var href = / href\s*=\s*['"]?([^\s"']+)/;
    if( !(link = link.exec( html )) ||
	!(link = href.exec( link[0] )) ||
	!is_abs_url(link = resolve( link[1], url )) )
      return failed();
    fcache[url] = link;
    get_favicon_url.fcache = fcache;
    cb( link, old );
    }catch(e){debug_it( e )}
  };
  var fetched = fcache[url];
  if( fetched ) return cb( fetched, old );
  if( fetched == false ) return failed();
  var animate = 'http://hem.bredband.net/ecmanaut/2006/02/25/progress.gif';
  set_favicon( animate )();
  $( 'fav' ).title = 'Loading favicon...';
  GM_xmlhttpRequest( {method:'GET', url:url, onerror:failed, onload:scrape} );
}catch(f){debug_it('load error:'+f);}
}

function resolve( rel_url, base_url )
{
  if( rel_url.charAt( 0 ) == '/' )
    return set_url_path( base_url, rel_url );
  if( is_abs_url( rel_url ) )
    return rel_url;
  base_url = base_url.match( /^(.*?)[^\/]*$/ );
  return base_url[1] + rel_url;
}

function set_url_path( url, path )
{
  return url.replace( /^([^:]+:\/+[^\/]+).*/, '$1'+path );
}


// support methods:

function $( id )
{
  return document.getElementById( id );
}

function is_abs_url( url )
{
  return (url||'').match( /^[^:]+:.+/ );
}

function case_normalize_link( link )
{
  if( !(link = linkify( link )) ) return link;
  var suffix = link.pathname + link.search;// + link.hash
  var prefix = link.href.substring( 0, link.href.lastIndexOf( suffix ) );
  return prefix.toLowerCase() + suffix;
}

function linkify( url )
{
  if( typeof url != 'string' || !url ) return url || '';
  var a = document.createElement( 'a' );
  a.href = url;
  return a;
}

function remove_nodes( nodes )
{
  for( var node; node = nodes.pop(); )
    node.parentNode.removeChild( node );
}

function colour( r, g, b, z )
{
  var rgb = [r||0, g||0, b||0], i;
  for( i in rgb )
    rgb[i] = parseInt( rgb[i] * Math.random() ) + (z||0);
  document.body.style.background = 'rgb('+ rgb.join(',') +')';
}

function get_style( node, attr )
{
  var style = getComputedStyle( node, '' )[attr];
  return parseInt( style );
}

function get_coords_of( node )
{
  var x = 0, y = 0, top = node;
  do {
    x += node.offsetLeft;
    y += node.offsetTop;
  } while( node = node.offsetParent );
  return { x:top.x = x, y:top.y = y };
}

function value( xpath )
{
  var me = node( xpath );
  return me && me.nodeValue;
}

function node( xpath )
{
  if( typeof xpath != 'string' ) return xpath;
  var type = XPathResult.FIRST_ORDERED_NODE_TYPE, n = null;
  return document.evaluate( xpath, document, n, type, n ).singleNodeValue;
}

function all( xpath, root )
{
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  while( next = got.iterateNext() )
    result.push( next );
  return result;
}

function foreach( xpath, cb )
{
  var nodes = all( xpath ), i;
  for( i=0; i<nodes.length; i++ )
    cb( nodes[i], i );
}

function grace( callback )
{
  return function( e ){ return stall( 'keyup', callback, [e] ); };
}

var stalling = { id:{}, at:{} };
function stall( id, cb, args )
{
  var cid = stalling.id[id];
  if( cid )
  {
    clearTimeout( cid );
    delete stalling.id[id];
  }
  var now = (new Date).getTime();
  var dt = now - (stalling.at[id]||0);
  if( dt < max_wait )
    args = [stall, max_wait-dt, id, cb, args];
  else
  {
    stalling.at[id] = now;
    args = [cb, 0].concat( args );
  }
  stalling.id[id] = setTimeout.apply( this, args );
}

EventMgr = // avoid leaking event handlers
{
  _registry:null,
  initialize:function() {
    if(this._registry == null) {
      this._registry = [];
      EventMgr.add(window, "_unload", this.cleanup);
    }
  },
  add:function(obj, type, fn, useCapture) {
    this.initialize();
    if(typeof obj == "string")
      obj = document.getElementById(obj);
    if(obj == null || fn == null)
      return false;
    if(type=="unload") {
      // call later when cleanup is called. don't hook up
      this._registry.push({obj:obj, type:type, fn:fn, useCapture:useCapture});
      return true;
    }
    var realType = type=="_unload"?"unload":type;
    obj.addEventListener(realType, fn, useCapture);
    this._registry.push({obj:obj, type:type, fn:fn, useCapture:useCapture});
    return true;
  },
  cleanup:function() {
    for(var i = 0; i < EventMgr._registry.length; i++) {
      with(EventMgr._registry[i]) {
        if(type=="unload")
	  fn();
        else {
	  if(type=="_unload") type = "unload";
	  obj.removeEventListener(type,fn,useCapture);
        }
      }
    }
    EventMgr._registry = null;
  }
};

function append_to( e4x, node, doc )
{
  doc = doc || (node ? node.ownerDocument : document);
  return node.appendChild( import_node( e4x, doc ) );
}

// Great thanks go to Mor Roses for the basis for this method.
function import_node( e4x, doc )
{
  var me = import_node, xhtml, dom_tree, import_me;
  me.Const = me.Const || { mimetype: 'text/xml' };
  me.Static = me.Static || {};
  me.Static.parser = me.Static.parser || new DOMParser;
  xhtml = <testing xmlns="http://www.w3.org/1999/xhtml" />;
  xhtml.test = e4x;
  dom_tree = me.Static.parser.parseFromString( xhtml.toXMLString(),
					       me.Const.mimetype );
  import_me = dom_tree.documentElement.firstChild;
  while( import_me && import_me.nodeType != 1 )
    import_me = import_me.nextSibling;
  if( !doc ) doc = document;
  return import_me ? doc.importNode( import_me, true ) : null;
}

if( homepage == location.href.replace(/[?#].*/, '') )
  configure( matchers );
// This ought to be what we REALLY want to do, but which Firefox can't do yet:
// EventMgr.add( document.body, 'DOMSubtreeModified', reprocess, false );
EventMgr.add( document.body, 'click', reprocess, false );
reprocess();
