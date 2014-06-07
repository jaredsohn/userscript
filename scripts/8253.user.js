// ==UserScript==
// @name          Trac changeset improvements
// @namespace     http://code.google.com/p/ecmanaut/
// @description   Folds/unfolds diffs in Trac changeset views, with (per-installation) options for pre-folded dir/filename patterns.
// @include       http*://*/changeset/*
// ==/UserScript==

var config = eval( GM_getValue('config', '({})') );
var regexp = config[location.host] || ''; // presets keyed on host:port
var matches = make_matcher( regexp );
init();

function make_matcher( regexp ) {
  return function( a ) {
    return regexp && regexp.exec( a.href );
  };
}

function init() {
  GM_addStyle( '#main a.diffinfo { color:#000000; background:none; }\n'+
               '#main a span.add { color:#006400; background:none; }\n'+
               '#main a span.rem { color:#8B0000; background:none; }\n' );
  all_diffs().map( instrument_diff ).filter( matches ).map( toggle_folding );
  event_handlers( "register", 1 );
}

function all_diffs() {
  return $x( '//li[@class="entry"]/h2/a[@href]' );
}

function toggle_folding( e ) {
  var a = e.target;
  if( !(a.nodeName||'').match( /^a$/i ) || a.title != 'fold/unfold' )
    return;
  e.preventDefault();
  e.stopPropagation();
  var table = $X( '../../table', a );
  var isoff = table.style.display == 'none';
  table.style.display = isoff ? 'block' : 'none';
  isoff = !isoff;
  table.parentNode.style.marginBottom = isoff ? '0.5em' : '2em';
}

// register (onoff=1) or unregister (otherwise) a document.body click handler
function event_handlers( junk, onoff ) {
  onoff = onoff || 0;
  var f = ['remove', 'add'];
  var dofn = f[onoff] + 'EventListener';
  var undofn = f[1-onoff] + 'EventListener';
  document.body[ dofn ]( 'click', toggle_folding, true );
  window[ undofn ]( 'unload', event_handlers, true );
}

function instrument_diff( a ) {
  var h2 = a.parentNode, li = h2.parentNode;
  var chunks = 'table/tbody[@class="add" or @class="mod" or @class="rem"]';
  var mod = 'count('+ chunks +'/tr/td[@class=';
  var add = $X( mod + '"r"])', li );
  var rem = $X( mod + '"l"])', li );
  chunks = $X( 'count('+ chunks +')', li );
  var delta = '+<span class="add">'+ add +'</span>/'+
              '-<span class="rem">'+ rem +'</span> in '+
              chunks +' chunk'+ (chunks==1?'':'s');

  var fa = document.createElement( 'a' );
  fa.id = 'fold-' + h2.parentNode.id;
  fa.href = 'javascript:/* fold/unfold */';
  fa.title = 'fold/unfold';
  fa.className = 'diffinfo';
  fa.innerHTML = delta;
  h2.appendChild( document.createTextNode( ' (' ) );
  h2.appendChild( fa );
  h2.appendChild( document.createTextNode( ') ' ) );

  var overview = $X( 'id("overview")/dd[@class="files"]/ul/li/a[@href="#'+ li.id +'"]' );
  if( overview ) {
    overview.innerHTML = delta;
    overview.className = 'diffinfo';
    overview.id = 'overview-'+ li.id;
    a = h2.appendChild( document.createElement( 'a' ) );
    a.href = '#' + overview.id;
    a.innerHTML = '\u2191'; // 2B06 21E7  
  }
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  switch( got.resultType )
  {
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
