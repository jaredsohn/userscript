// ==UserScript==
// @name           Helgon.net faces
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Shows faces next to user names on Helgon.net user listings, and your 13 latest visitors in the top right portion of the window. (Worth noting: the script has to visit these people's profiles to find the image, so their visitor logs will show your presence.) If you want to segregate this on sex, use the config option in the Firefox Tools -> User script commands menu once the script is installed and you have logged on to helgon.net. The panel refreshes itself every five minutes or when you click the reload icon.
// @include        http://www.helgon.net/*.asp*
// ==/UserScript==

function log() {
  if (0) {
    var args = Array.prototype.slice.call( arguments );
    return console.log.apply( this, args );
  }
}

var minutes = 5;//1/3.0; // minutes between polls

var image_server = 'http://g.helgon.net/';
if( location.pathname.match(/^\/start\/start.asp/i) )
  image_server = rootUrl( $X('//img[@class="largeimageborder"]').src );

// every sex listed in here with as 1 gets avatars shown in lists:
var show = { T:GM_getValue('T',1),O:GM_getValue('O',1),K:GM_getValue('K',1) };

var poll = 30 * 24 * 60 * 60 * 1000; // refetch user data older than a month
var purl = '/userinfo/userinfo.aspx?'; // profile URL link
var host = 'http://' + location.host;

// XPath expression to match all profile links we want to link images to
var profile_links = './/a[contains(@href,"'+ purl +'")]' + sexpath( show ) +
 '[.!="Presentation"]';

var reload_icon = '\u21AC'; // RIGHTWARDS ARROW WITH LOOP
// '\u21BB'; // CLOCKWISE OPEN CIRCLE ARROW

// regexps for detecting profile URLs and for parsing profile content data
var id_re = new RegExp( '<img[^>]* src=.?'+ image_server.replace('.', '\\.') +
			'u/.{6,10}([0-9A-Fa-f-]{36}).{1,3}\\.jpg', 'i' );
var head, links, faces, controls, tags = '(?:<[^>]*>)*';
var headline_re = new RegExp( '<font class="largeheadline"> ?'+ tags +
			      '([^\\s<]*)'+ tags +' (.)(\\d+)'+ tags +
			      '([^<]*) i ([^<]*)', 'i' );
// (name, sex, age, city, region)

var no_image = /00000000-0000-0000-0000-00000000../;
var mesh40 = "url(data:image/gif;base64,R0lGODlhKAAoAIAAAP///wAAACwAAAAAKAAoAAACdAR8l6oa8SCUc87WcD7Wdg9tmwiAoBmM43ae4Lo2rmvFMUfT6R3rOt/zuYAr4ZDIMr6QGeWS6XDWoFFpiIqz7rDaK7eLzVrDJXC4u6Wi0WT22fzVtuFqOtQdH7/le31eOsf35xToVyd4aHhnx4SXCNgHiVUAADs=)";
var mesh16 = "url(data:image/gif;base64,R0lGODlhEAAQAIAAAP///wAAACwAAAAAEAAQAAACIwR8F7HMmZRzIUZKbcJOS+4B3OONVWmOobmqKPhiLayxceYVADs=)";

// extend the profile-link xpath to become gender specific (based on `show')
function sexpath( show ) {
  var on = 0, sex, y, n;
  for( sex in show )
    if( !show[sex] )
      n = sex;
    else
    {
      on++;
      y = sex;
    }
  switch( on )
  {
    case 0: return '[0=1]';
    case 1: return     '[starts-with(following-sibling::text()," '+ y +'")]';
    case 2: return '[not(starts-with(following-sibling::text()," '+ n +'"))]';
    case 3: return '';
  }
}

function rootUrl( url ) {
  return /^([^:]+:\/+[^\/]+.)/.exec( url )[1];
}

function configure() {
  var all = { T:'tjej', K:'kill', O:'\366vriga ' }, i, choice;
  for( i in all )
  {
    choice = GM_getValue( i, 1 );
    choice = confirm( 'Vill du se '+ all[i] +
		      'nunor? (syns i deras bes\366kslogg)\nNuvarande '+
		      'inst\344llning: '+ (choice ? 'Ja' : 'Nej') );
    GM_setValue( i, choice ? 1 : 0 );
    show[i] = choice;
  }
  update_visitors();
}


// generic support functions:

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

// Great thanks go to Mor Roses for the basis for this method.
function import_node( e4x, doc ) {
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

function document_of_node( node ) {
  while( node && !node.ownerDocument )
    node = node.parentNode;
  return node && node.ownerDocument;
}

function append_to( e4x, node, doc ) {
  if( !doc )
    doc = document_of_node( node ) || document;
  return node.appendChild( import_node( e4x, doc ) );
}

// Returns a function that calls `f' in the context of `self'. `f' gets called
// with `args' concatenated to its arguments array, when the returned function
// is called. Fuzzy? A really spaced-out "hello world" example:
// make_caller( function( h, w ){ alert( h+this.s+w ); }, ['World!'], {s:' '} )
// ( 'Hello' );
function make_caller( f, args, self ) {
  return function()
  {
    args = Array.prototype.slice.call( arguments ).concat( args||[] );
    f.apply( self||f, args );
  };
}

// Fetch a web page and call cb( http_response, args[0], ..., args[N] )
function get( url, cb, args ) {
  if( args ) cb = make_caller( cb, args );
  var rq = new XMLHttpRequest();
  rq.onload = function(){ try{ cb(rq.responseText); }catch( e ){alert( e );} };
  rq.overrideMimeType( 'text/html; charset=ISO-8859-1');
  if( url.match( /^\// ) )
    url = host + url;
  rq.open( 'GET', url );
  rq.send( null );
}

function $( id, win ) {
  return (win||window).document.getElementById( id );
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

// list nodes matching this expression, optionally relative to the node `root'
function $x( xpath, root, type ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, type, null ), result = [];
  switch( got.resultType ) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while( next = got.iterateNext() )
	result.push( next );
      return result;
  }
}

// run the passed cb( node, index ) on all nodes matching the expression
function foreach( xpath, cb, root ) {
  var nodes = $x( xpath, root ), i, e = 0;
  for( i=0; i<nodes.length; i++ )
    e += cb( nodes[i], i ) || 0;
  return e;
}

var today = new Date; today.setHours( 0 );
var yesterday = new Date( today.getTime()-72e5 );

// " <T|K|O><N> frýn <...> i <...>, <Idag|Igýr|D/M> kl <hh:mm>"
function parse_helgon_date( info, laterdate ) {
  //var raw = info;
  info = /, ([^ ]+) kl *(\d+):(\d+)/.exec( info );
  //if( !info ) return prompt( 'Failed to parse date:', arguments[0] );
  var date = info[1].toLowerCase(), h = info[2], m = info[3];
  switch( date )
  {
    case 'idag': date = today; break;
    default:
      if( (info = date.split('/')) && (info.length == 2) )
      {
	date = new Date( today.getTime() );
	date.setDate( parseInt( info[0], 10 ) );
	date.setMonth(parseInt( info[1], 10 ) );
	break;
      } // fall-through:
    case 'ig?r':
    case 'ig\345r': date = yesterday; break;
  }
  date.setHours( h );
  date.setMinutes( m );
  date.setSeconds( 0 );
  date.setMilliseconds( 0 );
  if( laterdate && (date > laterdate) )
    date.setFullYear( date.getFullYear()-1 );
  //log( raw +'=>'+ date.toSource() );
  return date;
}


// user profile data handling support code

function Users(){}

var store_as = { name:'n', sex:'s', age:'a', /*city:'c', region:'r',*/ uid:'u',
		 timestamp:'t' };

// user data storage, in JSON encoded form
eval( 'var cache = '+ GM_getValue( 'users', '{}' ) );

Users.save_all = function() {
  GM_setValue( 'users', cache.toSource() );
};

Users.save = function( user ) {
  cache[ user.id ] = user.encode();
  if( Users.defer_save ) clearTimeout( Users.defer_save );
  Users.defer_save = setTimeout( Users.save_all, 2e3 ); // save in two seconds
};

Users.get = function( id ) {
  var u = cache[ id ];
  if( u )
    return u && new User( id, u );
}

Users.id_from_url = function( url ) {
  var id = /\d+$/.exec( url );
  return id && parseInt( id[0], 10 );
};

// Future improvement: maybe parse out some optional bits like this, too?
// &nbsp;Civilstatus</font></td> <td width="30%"><font class="text1">Singel<

function User( id, data ) {
  if( typeof data == 'object' )
    this.init( id, data.u, data.s, data.a, data.n, data.c, data.r, data.t );
}

User.prototype.init = function( id, uid, sex, age, name, city, region, t ) {
  this.id = id;
  this.uid = uid;
  this.sex = sex;
  this.age = age;
  this.name = name;
  this.city = city;
  this.region = region;
  this.timestamp = t;
};

User.prototype.get_image_url = function() {
  var uid = this.uid || "00000000-0000-0000-0000-000000000026"; // [X] fallback
  var prefix = uid.substring( 0, 3 );
  return image_server + 'u/%7B'+ prefix +'/%7B'+ uid +'%7D.jpg';
};

User.prototype.encode = function() {
  var u = {}, property;
  if (no_image.test( this.uid||"" ))
    this.uid = 0;
  for( property in this )
    if( store_as[property] )
      u[store_as[property]] = this[property];
  return u;
};

// run cb( args[0], ... args[N] ) with the this object set to a given user (id,
// url or User object), fetching it as needed from the server or our user cache
User.apply = function( user, cb, args ) {
  var id;
  if( typeof user == 'object' ) // we got a User object
    return cb.apply( user, args );
  if( typeof user == 'string' ) // we got a url (or id)
    id = Users.id_from_url( user );
  if( typeof user == 'number' ) // we got a user id
    id = user;
  if( user = Users.get(id) ) {  // we had a cached copy
    user.cached = "cached";
    cb = cb.apply( user, args ); args = [];
    var ms_since = (new Date).getTime() - (user.timestamp * 1e6);
    user.daysago = ms_since / 864e5;
    if( ms_since < poll )
      return 1; // ...and there was no need to refresh it
    user.cached = "refreshing";
    //cb = 0; // refresh, but don't add the avatar again.
  }
  // okay, we need to pull the user data from the server

  var url = host + purl +'ID='+ id;
  var cached = user ? user.cached : "new";
  // this generates a call User.parse( xhrdata, url, cb, args ) call:
  get( url, make_caller( User.parse, [url, cb, args, cached] ) );
  return 1;
};

// Parse profile data, update the user cache, and optionally call the provided
// callback with the this object set to the appropriate User, passing on args.
User.parse = function( data, url, cb, args, cached ) {
  var u = new User, html = typeof data=='string' ? data : data.responseText;
  html = html.replace( /\s+/gm, ' ' );
  u.id = Users.id_from_url( url );
  //console.log( "Parsing %x", u.id );
  if( !u.id ) return log('Failed to find id for %s', url); // probably our own profile -- just ignore it, for now
  u.uid = id_re.exec( html );
  if( u.uid )
    u.uid = u.uid[1].toUpperCase();
  else
    return log('Failed to parse uid for %s', url);
  if( data = headline_re.exec( html ) ) // name, sex, age, city, region
  {
    u.name   = data[1];
    u.sex    = data[2];
    u.age    = parseInt( data[3], 10 );
    u.city   = data[4];
    u.region = data[5];
  }
  //log( 'Found %s/%s/%s/%s/%s : %s', u.name, u.sex, u.age, u.city, u.region, u.uid );
  u.timestamp = Math.round( (new Date).getTime() / 1e6 );
  Users.save( u );
  u.cached = cached;
  if( typeof cb == "function" )
    cb.apply( u, args||[] );
};


// guestbook handling support code

state = {};

function get_gb( id, page, min, max ) {
  var url = host +'/GuestBook/guestbook.asp?id='+ id +'&Page='+ (page||0);
  log( 'GET %s [page %d min %s max %s]', url, page, min, max );
  get( url, got_gb, [id, min, max] );
}

// "to" - the id of the (other) person's guestbook we are looking at.
// "min/max" - the date region, during which we look for relevant texts.
// [state.id - the person whose comments we are looking for]
function got_gb( html, to, min, max ) {
  log( 'Fetched gb %d [%d bytes of HTML] min:%o / max:%o',
       to, html.length, min, max );
  var comments = parse_gb_page( html, min, max ), bylocal = [];
  for( var i=0; i<comments.length; i++ )
    if( comments[i].by == state.id ) { // something written by this user!
      bylocal.push( comments[i] );
      try_inject( comments[i] );
      //state.here[0].node.innerHTML += '.';
      //log( comments[i].node.textContent );
    }
  //log( 'Got comments: %1.o' , comments );
  log( 'Local comments: %1.o' , bylocal );
  log( 'state: %1.o', state );
  //if( comments.length == 10 ) // might still be more comments to find
  //  get_gb( to, state.todo[to]++, min, max );
}

function try_inject( comment ) {
  var i, here = state.here, t = comment.time, node;
  for( i=0; i<here.length; i++ )
  {
    if( t <= here.time )
      continue;
    node = $( 'comment-'+i );
    if( !node )
    {
      var a = document.createElement( 'a' );
      a.innerHTML = '0';
      a.id = 'comment-'+ i;
      node = $x( './tr[1]/td[2]', here[i].node );
      log( 'node to inject to: %o / from: %o', node, here[i].node );
      if( node.appendChild )
	node.appendChild( a );
      node = a;
    }
    var count = parseInt( node.innerHTML, 10 );
    node.title = comment.node.childNodes[2].textContent;
    node.innerHTML = ++count;
    break;
  }
}

function fetch_comments() {
  var id = location.search.match( /id=(\d+)/i )[1]; // this person's id
  var to = parse_gb_page( document ); // this person's inbound comments
  log( 'Local gb: %1.o', to );
  if( !to.length ) return;
  var mindate = to[to.length-1].time;
  var maxdate = to[0].time;
  var others = {}, by, i;
  for( i=0; i<to.length; i++ )
    if( (by = to[i].by) != id )
      others[by] = 0; // next page number, not 1 + (others[by]||0);
  state = { min:mindate, max:maxdate, id:id, here:to, todo:others, done:{} };
  log( state.here[0].node.parentNode.parentNode.parentNode );
  for( var other in state.todo )
  {
    get_gb( other, state.todo[other]++, mindate, maxdate );
    break; // XXX
  }
}

// parse out the messages from a helgon guestbook page
function parse_gb_page( html, mindate, maxdate ) {
  var full = typeof html == 'string' ? html2dom( html ) : html;
  var comm = $x( './/td[2]/table/tbody[tr[1]/td[2]]', full );
  var msgs = [];
  var a, by, node, date = mindate;
  for( var i=0; i<comm.length; i++ )
  {
    a = $x( '(.//a)[1]', node = comm[i] )[0];
    by = a.href.match( /id=(\d+)$/i )[1];
    date = parse_helgon_date( a.nextSibling.nodeValue, date );
    if( date > maxdate ) continue;
    msgs.push( { by:by, time:new Date(date.getTime()), node:node } );
  }
  return msgs;
}

function html2dom( html ) {
  var div = document.createElement( 'div' );
  div.innerHTML = html;
  return div;
}

// n=$0;n.innerHTML+='<div style="float:left;"></div><div style="float:right;font-size:10px;line-height:0.8;">[<a>'+(++i)+' comment</a>]</div>';
function inject_message( before_tr, message ) {
  //n=$0;n.innerHTML+=' [<a>'+(++i)+' comment</a>]';
}


// avatar script

function inject_avatar_before( node ) { // assumes a User this object
  // exit early to cop out of showing the ugly (drawn) default avatars
  if( !this.uid || no_image.test( this.uid ) )
    return;

  node.parentNode.style.minHeight = '60px';

  var img = document.createElement( 'img' );
  var user = this;
  with( img ) {
    src = user.get_image_url();
    className = 'largeimageborder';
    style.width = '40px';
    style.height = '56px';
    align = 'middle';
    title = user.name +' '+ user.sex + user.age;
    var cb = function onerror() {
      user = Users.get( user.id ); // to refresh its uid property from the cache
      img.title += " - ny bild";
      //img.style.borderColor = "#FFF";
      img.removeEventListener( "error", cb, false ); // no refiring on next line
//    img.src = user.get_image_url(); // in case we've already resolved the url
      var url = host + purl +'ID='+ user.id;
      get( url, make_caller( User.parse, [url, function() {
        img.src = Users.get( user.id ).get_image_url();
        img.style.borderColor = "transparent";
      } ] ) );
    };
    addEventListener( "error", cb, false );
  }

  var a = document.createElement( 'a' );
  a.href = host + purl +'id='+ user.id;
  a.target = 'helgonmain';
  a.appendChild( img );
  EventMgr.add( a, 'mouseover', hover_face, false );

  if( node.nodeType == node.TEXT_NODE )
    return node.parentNode.insertBefore( a, node );
  var space = document.createTextNode( ' ' );
  node.parentNode.insertBefore( space, node );
  return node.parentNode.insertBefore( a, space );
}

function hover_face( e ) {
  var a = e.target.parentNode;
  User.apply( a.href, blow_up_avatar );
}

var blown = [];

function blow_up_avatar() { // gets a User "this" object
  if( self != top || !frames.length ) return;
  var id = 'blow-'+ this.id, next = blown.n || 0, h = 172;
  for( var i=0; i<blown.length; i++ )
    if( blown[i].id == id )
      return; // already in view
  blown[next] && remove_node( blown[next] );

  var x = Math.floor( (innerWidth - 800 - 100 - 100) / 4 ) - 2;
  var y = Math.min( 4, x );
  var Y = Math.floor( (innerHeight - 2*y) / h );
  var n = Y * 2; // number of avatars that fit along the side borders

  if( next >= n/2 )
    x = innerWidth - 100 - x - 4; // right side
  y += Math.floor( (next % Y) * (innerHeight - 2*y - h) / (Y-1) );
  var pos = 'position:absolute; top:'+ y +'px; left:'+ x +'px;';

  var blow = <div id="blow" style={pos+' text-align:center; width:102px;'}>
  <a href={purl +'id='+ this.id} target="helgonmain" style="font-size:10px;">
    <img src={this.get_image_url()} style="border:1px solid #000;"
	 width="100" height="146"/><br/>
    {this.sex}{this.age} {this.name}
  </a></div>;
  blown[next] = append_to( blow, top.document.body );
  blown[next].id = id;
  blown.n = ++next % n;
}

function remove_node( node ) {
  node.parentNode.removeChild( node );
}

function fetch_and_inject_avatar( node, n ) {
  return User.apply( node.href, inject_avatar_before, [node] );
}

function wipe( node ) {
  var c;
  while( c = node.lastChild )
    node.removeChild( c );
}

function keys( obj ) {
  var i, k = [];
  for( i in obj )
    k.push( i );
  return k;
}

function seen_lately() {
  try{
  var ages = {}, i, j, u, a, l;
  for( i in cache )
  {
    u = cache[i];
    if( !u.u || u.u.match( /00000000-0000-0000-0000-0000000000/ ) )
      continue;
    if( show[u.s] && (a = parseInt( u.a )) > 19 )
      ages[a] = (ages[a] || []).concat( i );
  }
  with(document.body.style) { margin = padding = 0; }
  var x, W = 100/2, w = Math.floor( (innerWidth-16) / W );
  var y, H = 140/2, h = Math.floor( 10*(innerHeight-16)/ H );
  a = keys( ages ).sort();
  var imgs = [], links = [], img, link;
  for( y=0,i=0,j=0; y<h; y++ )
  {
    for( x=0; x<w && i<a.length; x++, j++ )
    {
      l = ages[a[i]].length;
      i += j == l;
      j %= l;
      if( i == a.length ) break;
      //prompt( i+'/'+j+':'+a[i], ages[a[i]][j] );
      u = Users.get( ages[a[i]][j] );
      img = document.createElement( 'img' );
      link = document.createElement( 'a' );
      link.href = '/userinfo/userinfo.asp?id=' + u.id;
      img.setAttribute( 'onerror', 'this.parentNode.style.display = "none";' );
      img.src = u.get_image_url();
      img.width = W;
      img.height = H;
      img.title = u.sex + u.age +' '+ u.name;
      //link.style.position = 'absolute';
      //img.style.display = link.style.display = 'block';
      link.style.float = img.style.float = 'left';
      img.style.border = '0';
      //link.style.left = W*x + 'px';
      //link.style.top = H*y + 'px';
      link.appendChild( img );
      img.style.float = 'left';
      imgs.push( img );
      links.push( link );
      document.body.appendChild( link );
    }
  }
  }catch(e){alert(e)}
}

var recent_users;

function update_recent( html ) {
  var links_path = './/a[contains(@href,"'+ purl +'")]' + sexpath( show );
  // unsafeWindow.path = links_path;
  // unsafeWindow.html = html;
  var page = html2dom( html );
  // unsafeWindow.page = page;
  var urls = $x( links_path, page );
  // unsafeWindow.urls = urls;
  recent_users = [];
  recent_users.loaded = 0;
  for( var i=0; i<urls.length; i++ )
    User.apply( urls[i].href, collect_avatars_then_inject, [i, urls.length] );
}

function collect_avatars_then_inject( n, total_count ) {
  recent_users[n] = this;
  if( ++recent_users.loaded != total_count )
    return;
  var all = [], i, user;
  for( i=0; i<total_count; i++ ) {
    user = recent_users[i];
    if( !user.uid || no_image.test(user.uid) )
      continue;
    all.push( user );
  }
  all = all.slice( 0, 13 ).reverse();
  // unsafeWindow.recent = recent_users;
  // unsafeWindow.filtered = all;
  if (!faces) return;
  faces.innerHTML = ' ';
  for( i=0; i<all.length; i++ ) {
    var a = inject_avatar_before.call( all[i], faces.firstChild );
    var img = a.firstChild;
    if (!i) {
      img.style.borderWidth = "2px 2px 2px 1px";
    } else if (i+1==all.length) {
      img.style.borderWidth = "2px 1px 2px 2px";
    } else {
      img.style.borderWidth = "2px 1px 2px 1px";
      //img.style.margin = "0 1px";
    }
    var cached = all[i].cached || "?", days = all[i].daysago;
    if (!"debug")
    switch (cached) {
      case "cached": break;
      case "refreshing":
      case "new":
        a.style.background = cached == "new" ? mesh40 : mesh16;
        img.style.opacity = "0.9";
        a.style.fontSize = 106;
        break;
      case "?":
        img.style.borderBottom = "2px solid #F00";
    }
    if (days) {
      days = Math.round(days*10) / 10;
      days = days ? " ("+ days +" dag"+ (days==1?"":"ar") +" sedan)" : "";
      img.title += days;
    }
  }
  controls.style.display = 'block'; // avoid flickering position of reload icon
}

var next_update;

function get_my_recent_visitors() {
  // timing issues; fortunately not needed: '?id='+GM_getValue( 'me' )
  // log( 'get_my_recent_visitors()' );
  var url = GM_getValue( 'track', '/UserInfo/UserInfo_Visitors.asp' );
  var now = $( 'face-tracking-for', top ), title = '', t;
  if (!now) return console.log( "found no face-tracking-for in %x", top );
  now.href = url; // FIXME: crashes when now == null (wrong window?)
  if( t = url.match( '^/UserInfo/UserInfo_Visitors.asp.*Name=([^&]+)' ) )
  {
    title = unescape( t[1] );
    title += /s$/i.test( title ) ? "'" : "s";
    title += ' bes\366kare';
  }
  now.title = title;
  get( url, update_recent );
  next_update = setTimeout( get_my_recent_visitors, 6e4*minutes );
}

function update_visitors( e ) {
  e && e.preventDefault && e.preventDefault() && e.stopPropagation();
  if( next_update )
    clearTimeout( next_update );
  get_my_recent_visitors();
}

function track_visitors( e ) {
  GM_setValue( 'track', location.pathname + location.search );
  update_visitors( e );
}

function hide_children_of( node ) {
  var c = node.childNodes;
  for( var i=0; i<c.length; i++ )
  {
    if( c[i].hasChildNodes() )
      ;//hide_children_of( c[i] );
    if( c[i].nodeType != document.ELEMENT_NODE )
      continue;
    c[i].style.display = 'none';
  }
}

function add_link( title, url, key ) {
  links = $X( '//tr[@class="middleframe"]/td[@class="subline"]' );
  if (!links) return;
  var a = document.createElement( 'a' );
  a.href = url;
  if (key) a.accessKey = key;
  a.innerHTML = title;
  links.appendChild( a );
  with( a.previousSibling )
    nodeValue += nodeValue;
  return a;
}

switch( location.pathname.toLowerCase() ) {
  case '/':
  case '/start/start.asp':
  case '/start/start.aspx':
    add_link( "?", "/seen.asp" );
    break;

  case '/frameset/new.asp':
  case '/frameset/new.aspx':          // /guestbook/guestbook.aspx?ID=691460
    var id = $x( '//a[contains(@href,"/guestbook/guestbook.asp")]' )[0];
    GM_setValue( 'me', id.search.match( /\d+/ )[0] );
    break;

  case '/main.asp':
  case '/main.aspx':
    document.body.style.overflow = 'hidden'; // don't show window scroll bars
    GM_registerMenuCommand( 'V\344lj vilka nunor som visas', configure );
    head = $x( '//td[@class="topframe" and @background]' );
    if( head )
    {
      head = head[0];
      hide_children_of( head );
      // head.innerHTML = ''; // can't toss banner this way; breaks history :-/
      controls = document.createElement( 'div' );
      controls.style.position = 'absolute';
      controls.style.display = 'none';

      var track = document.createElement( 'a' );
      track.innerHTML = 'Bevakar:';
      track.target = 'helgonmain';
      track.id = 'face-tracking-for';
      track.style.position = 'absolute';
      track.style.top = '46px';
      track.style.left = '155px';
      track.style.fontSize = '12px';
      controls.appendChild( track );

      var update = document.createElement( 'a' );
      update.style.position = 'absolute';
      update.style.fontSize = '28px';
      update.style.left = '215px';
      update.style.top = '35px';
      update.innerHTML = reload_icon;
      update.title = 'Uppdatera senaste bes\366kare';
      update.href = '#reloadvisitors';
      controls.appendChild( update );

      head.appendChild( controls );
      EventMgr.add( update, 'click', update_visitors, true );

      var css = 'float:right; text-align:left; width:548px; font-size:1px;'
      faces = document.createElement( 'div' );
      faces.setAttribute( 'style', css );
      head.appendChild( faces );

      head.style.textAlign = 'right';
      head.style.paddingRight = '5px';
      head.style.backgroundPosition = '-22px 0px';
      get_my_recent_visitors();
    }
    break;

  case '/guestbook/guestbook.asp':
  case '/guestbook/guestbook.aspx':
    try{
      // fetch_comments();
    }catch(e){alert(e);}
    break;

  case '/userinfo/userinfo.asp':
  case '/userinfo/userinfo.aspx': // just update the cache for this user
    User.parse( document.documentElement.innerHTML, location.href );
    break;

  case '/seen.asp':
    wipe( document.body );
    seen_lately();
    break;

  default:
    links = foreach( profile_links, fetch_and_inject_avatar, document.body );
}

if( links && window.name == 'helgonmain' ) {
  var a = add_link( "<u>B</u>evaka", "#", "b" );
  if (a)
    EventMgr.add( a, 'click', track_visitors, true );
}
