// ==UserScript==
// @name           Lunarstorm Diary Calendar
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Adds a calendar widget to show the diary entry page in time.
// @include        http://www.lunarstorm.se/dry/dry_list.asp*
// @include        http://www.lunarstorm.se/dry/dry_view.aspx*
// ==/UserScript==

(function() {

function regexpQuote( string )
{
  return string.replace( /[.()?\\]/g, '\\$&' );
}

function getCookie( name )
{
  var re = new RegExp( '(^|; )' + regexpQuote(escape(name)) + '=(.*?)(; |$)' );
  if( re = re.exec( document.cookie ) )
    return unescape( re[2] );
}

function setCookie( name, value, path, expires )
{
  var old = getCookie( name );
  if( parseInt( value ) <= parseInt( old || '0' ) ) return;
  var expiry = expires || new Date( (new Date()).getTime() + 864e5*365.25*10 );
  document.cookie = escape( name ) + '=' + escape( value ) +
    '; expires=' + expiry.toGMTString() + (path ? '; path=' + path : '');
}

function removeCookie( name, path )
{
  var expire = new Date((new Date).getTime() - 1000);
  setCookie( name, '', path || '/', expire );
  //alert( 'zapped cookie '+name+'@'+(path||'/') );
}

function setLastRead( uid, to )
{
  //alert( 'Marking '+ to +' as last read note for '+uid );
  var path = '/dry/dry_list.aspx?userid=' + uid.toUpperCase();
  if( to )
  {
    setCookie( 'lastread', to.getTime(), path );
    return top.lastRead[uid] = top.lastRead = to;
  }
  removeCookie( 'lastread', path );
  top.lastRead[uid] = lastRead = to;
  delete top.lastRead[uid];
}
window.setLastRead = setLastRead;

function parseLunarDate( date )
{
  //alert( 'parseLunarDate ' + date );
  var months = 'jan,feb,mar,apr,maj,jun,jul,aug,sep,okt,nov,dec'.split( ',' );
  var month = {}, y, m, d, H, M, i;
  for( i=0; i<months.length; i++ )
    month[months[i]] = i;
  if( i = /^\s*\S+\s+(\d+)\s+(\S\S\S)\s+(\d*)\s*(\d\d):(\d\d)/.exec( date ) )
  {
    if( i[3] )
      y = i[3] < 100 ? 2000 + Math.round( i[3] ) : i[3];
    else
      y = (new Date).getFullYear();
    m = month[i[2].toLowerCase()];
    d = i[1];
    H = i[4];
    M = i[5];
    //alert( '> ' + y + '-' +(m+1)+ '-' +d+ ' ' +H+':'+M );
    return new Date( y, m, d, H, M );
  }
  if( i = /^i(dag|gÃÂ¥r|g&aring;r)\s+(\d\d):(\d\d)/i.exec( date ) )
  {
    var date = new Date();
    if( i[1] != 'dag' )
      date = new Date( date.getTime() - 864e5 );
    date.setHours( i[2] );
    date.setMinutes( i[3] );
    date.setSeconds( 0 );
    date.setMilliseconds( 0 );
    return date;
  }
}

function setBold( n, onp )
{
  var node, when;
  if( node = document.getElementById( 'rptDiaries__ctl'+n+'_hrfTitle' ) )
  {
    when = document.getElementById( 'rptDiaries__ctl'+n+'_d' );
    when.style.fontWeight = onp ? 'bold' : 'normal';
    node.style.fontWeight = onp ? 'bold' : 'normal';
  }
}

function harvestDates( lastRead )
{
  var i = 0, j = 0, node, note, when, notes = [];
  while( !document.getElementById( 'rptDiaries__ctl'+i+'_hrfTitle' ) ) i += 25;
  while( node = document.getElementById('rptDiaries__ctl'+(i+j)+'_hrfTitle') )
  {
    note = { title:node.innerHTML, href: node.href };
    when = document.getElementById( 'rptDiaries__ctl'+(i+j)+'_d' );
    if( note.date = parseLunarDate( when.innerHTML ) )
      notes.push( note );
    if( lastRead && note.date > lastRead )
      setBold( i+j, true );
    if( ++j > 24 )
      break;
  }
  return notes;
}

function maketag( name, attributes )
{
  var node = typeof name == 'string' ? document.createElement( name ) : name;
  for( var i in attributes )
    node.setAttribute( i, attributes[i] );
  return node;
}

function loadCalendar( params )
{
  var head = document.getElementsByTagName( 'head' )[0];
  var base = 'http://www.lysator.liu.se/~jhs/jscalendar/';
  var code = ['calendar.js', 'lang/calendar-sv.js', 'calendar-setup.js'];
  var skin = base + 'skins/aqua/theme.css';
  var link = maketag( 'link', {rel:'stylesheet', type:'text/css', href:skin} );
  var done = function() {
    window.count = window.count ? window.count + 1 : 1;
    if( window.count == code.length )
      window.cal = Calendar.setup( params );
  };
  head.appendChild( link );
  for( var i = 0; i<code.length; i++ )
  {
    link = maketag( 'script', { type:'text/javascript', src:base+code[i] } );
    link.onload = done;
    head.appendChild( link );
  }
}

function ymd( date )
{
  return date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate();
}

function noteFromDate( date )
{
  var i, note, given = ymd( date );
  for( i=0; i<top.notes.length; i++ )
    if( ymd( (note = top.notes[i]).date ) == given )
      return note;
}

function loadNote( calendar )
{
  var note = noteFromDate( calendar.date );
  if( note ) location = note.href;
}

function pickPrevNext( pick, prevp )
{
  // alert( (prevp ? '<= ' : '>= ' ) + pick );
  var ok = top.notes;
  if( prevp ) // find last x <= pick
  {
    for( var i=0; i<ok.length; i++ )
      if( ok[i] >= pick )
        return new Date( ok[i] );
  }
  else // find first x >= pick
    for( var i=ok.length-1; i>=0; i-- )
      if( ok[i] <= pick )
        return new Date( ok[i] );
  return null;
}

// Returns true for all dates lacking a note, false or a css style for those having one.
// Exception: today does not return true, even if it lacks a note. (improves navigation)
function disableDateP( date, y, m, d )
{
  var note = noteFromDate( date );
  if( note )
    if( window.lastRead )
      return note.date > window.lastRead ? 'unread' : false;
    else
      return false;
  if( ymd( date ) == ymd( new Date ) )
    return false;
  return true;
}

// joins two lists, both sorted in descending order
function joinLists( a, b )
{
  var seen = {}, note, i, j, t, result = [];
  for( i=0; i<a.length; i++ )
  {
    while( b.length && b[0].date > a[0].date )
    {
      j = b.shift();
      if( seen[t = j.date.getTime()] )
	continue;
      seen[t] = 1;
      result.push( j );
    }
    if( seen[t = a[i].date.getTime()] )
      continue;
    result.push( a[i] );
    seen[t] = 1;
  }
  return result;
}

var uid, notes = top.notes, current, lastRead;
uid = unescape( /userid=([^&#?]+)/i.exec( location.href )[1] ).toUpperCase();
var name = 'TdryTest', html = '<div style="width:185px;" id="'+name+'"></div>';
document.getElementById( name ).parentNode.innerHTML = html;
var buts = document.getElementById( '_ctl5:Buttons1' );
if( buts )
{
  var td = buts.getElementsByTagName( 'td' ), reset = td[1], update = td[2];
  html = update.innerHTML.replace( /Upp.*ken/, 'NollstÃÂ¤ll' );
  html = html.replace( /dry_.*aspx/,"javascript:void setLastRead('"+uid+"')" );
  reset.innerHTML = html;
}
if( !top.lastRead ) top.lastRead = {};
if( !top.allNotes ) top.allNotes = {};
lastRead = top.lastRead[ uid ];
if( location.pathname == '/dry/dry_view.aspx' )
{
  if( !notes ) return;
  for( var i=0; i<notes.length; i++ )
    if( notes[i].href == location.href )
      current = notes[i];
  if( current )
  {
    //alert( 'current note: ' + current.toSource() );
    if( !lastRead || lastRead < current.date )
    {
      setLastRead( uid, current.date );
      lastRead = top.lastRead[ uid ];
    }
  }
  else
    alert( 'Could not find current note?!' );
}
else
{
  if( lastRead = getCookie( 'lastread' ) )
    top.lastRead[ uid ] = lastRead = new Date( parseInt( lastRead ) );
  else
    lastRead = top.lastRead[ uid ];
  //alert( 'last read: '+lastRead );
  var former = top.allNotes[ uid ] || [];
  //alert( 'former notes: '+former.length );
  notes = harvestDates( lastRead );
  //alert( 'found notes: ' + notes.length + ' ' + notes.toSource() );
  notes = joinLists( notes, former );
  top.allNotes[ uid ] = top.notes = notes;
  //alert( 'notes now: ' + notes.length );
  current = notes[0];
}

window.lastRead = lastRead; // used by disableDateP (>bold)
loadCalendar(
{
  step          : 1, // show *every* year in the year menus
  date          : current.date, // this selected by default
  align         : 'br', // below/right from top/left corner
  button        : 'navigate', // click this element to open
  singleClick   : true, // don't need double-click to focus
  pickPrevNext  : pickPrevNext, // can only focus our dates
  //onUpdate    : dateChanged, // navigates to chosen entry
  range         : [notes[notes.length-1].date, notes[0].date],
  flatCallback  : loadNote, // what to do on date selection
  flat          : name,
  //showOthers    : true, // show whole first/last week of month
  dateStatusFunc: disableDateP // which dates to show/hide how
});

})();
