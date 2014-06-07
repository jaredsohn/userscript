// ==UserScript==
// @name           Lunarstorm folksortering
// @version        1.3: Added ability not to visit specific users (alt-click the name to toggle ban flag). Banned names are strike-through.
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Sorterar om listor med folk i (nyliga/bevakade dagböcker, vänner, et c) med flickor/pojkar i åldrarna X-Y överst, samt indikerar hemvist och civilstatus direkt i listan. Folk av både rätt kön och ålder hamnar överst i fetstil, följt av rätt kön och övriga. Civilstatus visas med stjärnor och parenteser, och skrivs ut i klartext när man vilar muspekaren över ett namn. Konfigurera om scriptet (kön, åldrar, et c) via menyn Tools->User Script Commands->Lunarstorm: folksortering.
// @include        http://www.lunarstorm.se/*
// ==/UserScript==

var detail_cities, detail_region, preferred_sex, max_age, min_age, nosort, ban;

const default_age = '25-35', default_sex = 'F';
const default_region = 'Östergötland';
const default_cities = 'Linköping|Göteborg|Stockholm';
const default_nosort = '/fri/fri_friends.aspx|/gst/gst_guestbook.aspx|' +
		       '/blg/blg_(log|list|scene|view).aspx';
GM_registerMenuCommand( 'Lunarstorm: folksortering', setup );
init();

function setup()
{
  var sex = GM_getValue( 'sex', default_sex );
  var age = GM_getValue( 'age', default_age );
  var cities = GM_getValue( 'city', default_cities );
  var region = GM_getValue( 'region', default_region );
  sex = confirm( 'Flickor överst? (Nu: '+ (sex=='F'?'Ja)':'Nej)') );
  age = prompt( 'Sortera dessa åldrar överst:', age ) || '-';
  nosort = prompt( 'Sortera aldrig om dessa sidor:',
		   GM_getValue( 'nosort', default_nosort ) );
  cities = prompt( 'Visa stadsdel för vilka städer? (tomt för alla)', cities ) || '';
  region = prompt( 'Visa region för vilka områden? (tomt för alla)', region ) || '';
  GM_setValue( 'sex', sex ? 'F' : 'P' );
  GM_setValue( 'age', age );
  GM_setValue( 'nosort', nosort );
  GM_setValue( 'city', cities );
  GM_setValue( 'region', region );
}

function update_preferences()
{
  var preferred_age;
  ban = eval( GM_getValue( 'ban', '({})' ) );
  preferred_age = GM_getValue( 'age', default_age ).split('-');
  preferred_sex = GM_getValue( 'sex', default_sex );
  detail_cities = new RegExp( GM_getValue( 'city', default_cities ), 'i' );
  detail_region = new RegExp( GM_getValue( 'region', default_region ), 'i' );
  max_age = preferred_age[1]||Infinity;
  min_age = preferred_age[0]||-Infinity;
  nosort = new RegExp( GM_getValue( 'nosort', default_nosort ), 'i' );
}

// on alt-click, toggle bannedness of the clicked user
function onclick( e ) {
  var a = e.target;
  if( !e.altKey || !(a.nodeName||'').match( /^a$/i ) )
    return;
  try {
    var id = uid_from_url( a.href );
  }
  finally {
    if( !id ) return;
    if( ban[id] ) {
      delete ban[id];
      a.style.textDecoration = 'none';
    } else {
      ban[id] = 1;
      a.style.textDecoration = 'line-through';
    }
    GM_setValue( 'ban', ban.toSource() );
  }
}

function register( e, onoff ) {
  onoff = onoff || 0;
  var f = ['remove', 'add'];
  var dofn = f[onoff] + 'EventListener';
  var undofn = f[1-onoff] + 'EventListener';
  document.body[ dofn ]( 'click', onclick, true );
  window[ undofn ]( 'unload', register, true );
}

function init() {
  update_preferences();
  register( 'listen to click events', 1 );
}

const star = '<img src="/_gfx/icon/sys_bookmark.gif" style="border:0;height:13px;width:14px;"/>';
// //tr/td/a...
const xpath = '//a[contains(@href,"/usr/usr_presentation")][text()!="Pres"]';
const uid_re = /userid={?([-0-9A-F]*)}?/i;

function uid_from_url( url ) {
  return uid_re.exec( unescape( url ) )[1].toUpperCase();
}

var top = unsafeWindow.top;
if( !top.cache )
  top.cache = {};
//if( location.pathname == '/top/top_right_inside.asp' )
//  location.pathname = '/top/top_dummy.asp';
//else
process_people();

if( location.pathname == '/top/top_inside_noflash.aspx' ||
    location.pathname == '/top/top_inside.aspx' )
{
  unsafeWindow.HasFlash = function(){ return false };
  //prompt( location.pathname, unsafeWindow.HasFlash.toSource().replace(/[\r\n]/g,' ') );
}

function process_people()
{
  var people = $x( xpath ), tr, td, a, p, sex, age, i;
  var first = [], middle = [], last = [], html = [], e = [], uids = [];
  for( i = 0; a = people[i]; i++ )
    if( (p = get_info( a )).sex )
    {
      tr = a.parentNode;
      if( tr.nodeName.match( /td/i ) )
	tr = tr.parentNode;
      //unsafeWindow.console.log( tr );
      if( p.sex != preferred_sex )
        last.push( i );
      else if( p.age < min_age || p.age > max_age )
      {
        middle.push( i );
        //a.style.fontStyle = 'italic';
      }
      else
      {
        first.push( i );
        a.style.fontWeight = 'bold';
      }

      if( ban[p.uid] )
	a.style.textDecoration = 'line-through';
      e[i] = tr.getAttribute( 'onclick' );
      html[i] = tr.innerHTML;
      uids[i] = p.uid;
    }
  var ordered = first.concat( middle ).concat( last ), I, href;
  var processed = {};
  for( i=0; i<ordered.length; i++ )
  {
    href = people[i].href;
    tr = people[i].parentNode;
    if( tr.nodeName.match( /td/i ) )
      tr = tr.parentNode;
    if( (i != (I = ordered[i])) && !location.pathname.match( nosort ) )
    {
      tr.innerHTML = html[I];
      tr.setAttribute( 'onclick', e[I] );
    }
    if( !ban[uids[i]] && (-1 == last.indexOf( i )) && !processed[href] )
      processed[href] = load_profile( href );
  }
}

function $x( xpath, root )
{
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, result = [];
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
  while( next = got.iterateNext() )
    result.push( next );
  return result;
}

function format_location( from )
{
  if( !from ) return '';
  if( from[1].match( detail_cities ) )
    from = from[1] + (from[2]||'');
  else if( (from[3]||'').match( detail_region ) )
    from = from[1] + ', ' + from[3];
  else
    from = from[1];
  return from.replace( /&#(\d+);/g, function( x,c ){return String.fromCharCode( c );} );
}

function mark_person( uid )
{
  var p = top.cache[uid] || {};
  //unsafeWindow.console.log( uid, p );
  var from = p.from, status = p.status || '';
  var last = '', pre = '', post = '', hit = 0;
  if( from )
    last = ', ' + format_location( from );
  switch( status.toLowerCase() )
  {
    case 'öppen för förslag':
    case 'spanar':
      hit++;
      pre += star; // fall-through
    case 'singel':
    case 'öken':
    case 'va?':
      hit++;
      pre += star + ' ';
    case '':
      break;
    default:
      pre = '('; post = ')'+ post;
  }
  var people = $x( xpath ), i, a, from, at, region;
  //unsafeWindow.console.log( people.length, people.toSource() );
  for( i=0; a = people[i]; i++ )
  {
    if( a.search.toUpperCase().match( uid ) )
    {
      a.setAttribute( 'title', status||'?' );
      a.innerHTML = pre + a.innerHTML + post;
      if( !a.parentNode.nodeName.match( /td/i ) )
	continue; // location already visible in the search view
      a.nextSibling.nodeValue=a.nextSibling.nodeValue.replace(/\s+$/,'')+last;
      from = a.nextSibling.nextSibling;
      if( at = /från (.*) i (.*)/.exec( from ? from.innerHTML : '' ) )
      {
	region = at[2];
	if( last.match( region ) )
	  from.innerHTML = '';
	else
	  from.innerHTML = ' i '+ region;
      }
      //hover( a, uid )
    }
  }
}

function get_info( person )
{
  var info = {};
  var match = /([PF])(\d+)/i.exec( person.nextSibling.nodeValue );
  if( match )
  {
    info.sex = match[1];
    info.age = parseInt( match[2] );
  }
  info.name = person.textContent;
  info.uid = uid_from_url( person.href );
  return update_cache( info.uid, info );
}

function update_cache( uid, info )
{
  var entry = top.cache[uid] || {}, i;
  for( i in info )
    entry[i] = info[i];
  return top.cache[uid] = entry;
}

function load_profile( href )
{
  var url = 'http://www.lunarstorm.se/usr/usr_presentation.aspx?userid=';
  var uid = uid_from_url( href ), status;
  var was = top.cache[uid] || {};
  if( ban[uid] || was.fetched )
    return mark_person( uid ) || 1;
  if( was.fetching ) return 1;
  update_cache( uid, { fetching:true } );
  GM_xmlhttpRequest( {method:'GET', url: url+uid, onload: function( http )
  {
    if( http.status != 200 ) return;
    var html = http.responseText.replace( /[\r\n\s]+/g, ' ' );
    var status = /<span id="lbPa5"[^>]*>([^<]+)/i.exec( html ), xxx = '';
    var from = /<td colspan="2" class="mtext"[^>]*>\s*Från ([^<(]*)( [(][^<]*[)])? i ([^<]*[^<\s])/i.exec( html );
    var info = { fetched:true, fetching:false };
    if( from ) info.from = from;
    if( status ) info.status = status[1];
    update_cache( uid, info );
    mark_person( uid );
  } } );
  return 1;
}


// non-functional:
function hover( a, uid )
{
  var tr = a.parentNode.parentNode;
  var ev = 'onmouseover';
  var on = tr.getAttribute( ev );
  tr.setAttribute( ev, "top[0][2].document.documentElement.innerHTML='"+ render_sidebar( uid )+ "';"+ on );
}

function render_sidebar( uid )
{
  var url = 'http://photo.lunarstorm.se/large/'+ uid.slice(0,3) +'/{'+ uid.toLowerCase() +'}.jpg';
  return '<body style="background:#296B84 url('+url+') no-repeat 50% 0;"></body>';
}

function show_face( uid )
{
  top[0][2].document.documentElement.innerHTML = render_sidebar( uid );
}
