// ==UserScript==
// @name          Trac timeline improvements
// @namespace     http://code.google.com/p/ecmanaut/
// @description   Makes commit messages and file names more legible and linked, dates ISO style, listed files downloadable and gives change type boxes descriptive title attributes.
// @include       http*://*/timeline
// @include       http*://*/timeline?*
// ==/UserScript==

GM_addStyle( 'dd.changeset ul.changes li { font-size:small; color:#000; }\n'+
             'dd.changeset p { color:#000; font-size:small; margin:5px 0 20px -35px; }\n'+
             'dd.changeset .changes li { clear:left; }\n' +
             'dd.changeset .changes li div { margin:0.2em 0.4em 0.2em 0; }\n'+
             'a.download { margin-right:4px; border-bottom:0; }\n' );

var Y = (new Date).getFullYear(), y = Y % 100, CC = (Y - y) / 100;
$x( 'id("content")/h2' ).map( mmddyy_to_iso );

function mmddyy_to_iso( h2 ) {
  var x = h2.innerHTML.replace( ':', '' ).split( '/' );
  var M = x[0], D = x[1], Y = x[2];
  var date = (parseInt( Y, 10 ) <= y ? CC : (CC-1)) +''+ Y +'-'+ M +'-'+ D;
  h2.innerHTML = '<a href="#d'+ date +'">'+ date +'</a>:';
  h2.id = 'd'+ date;
}

var base_url = location.href.replace( /timeline.*/, '' );
fix_filelists( {
  add:{ title:"Added", link_to:browser_url },
  move:{ title:"Moved", link_to:browser_url },
  copy:{ title:"Copied", link_to:browser_url },
  edit:{ title:"Changed", link_to:changeset_diff },
  delete:{ title:"Deleted", link_to:browser_url, delta_rev:-1 }
} );

function browser_url( path, rev ) {
  return base_url +'browser/'+ path +'?rev='+ rev;
}
function browser_raw( path, rev ) {
  return browser_url( path, rev )+ '&format=raw';
}
function changeset_diff( path, rev, li ) {
  return base_url +'changeset/'+ rev +'#file'+ $x( 'count(preceding-sibling::li)', li );
}

function fix_filelists( specs ) {
  function fix_file( div ) {
    div.title = filemod.title;
    var text = div.nextSibling;
    var filename = text.nodeValue;
    if( filename.match( /\/$/ ) )
      return; // Don't attempt any magic for directories

    var li = div.parentNode;
    var dt = $X( 'preceding::dt[1]', li );
    var rev = parseInt( $X( 'a/em/text()', dt ).nodeValue.replace( /\D/g, '' ), 10 );
    dt.id = 'r'+ rev;
    li.removeChild( text );

    var a = document.createElement( 'a' ); // filename link
    a.href = filemod.link_to( filename, rev + (filemod.delta_rev||0), li );
    a.appendChild( text );
    li.appendChild( a );

    var dl = document.createElement( 'a' ); // dl link
    dl.href = browser_raw( filename, rev + (filemod.delta_rev||0), li );
    dl.innerHTML = '\u27A5'; // 2193 2B07 FFEC
    dl.className = 'download';
    dl.title = 'Download file';
    li.insertBefore( dl, a );
  }
  for( var className in specs ) {
    var filemod = specs[className];
    $x( 'id("content")/dl/dd/ul/li/div[@class="'+ className +'"]' ).map( fix_file );
  }
}

function set_titles( titles ) {
  for( var className in titles )
    $x( 'id("content")/dl/dd/ul/li/div[@class="'+ className +'"]' ).map(
      function( div ){ div.title = titles[className]; } );
}

function $X( xpath, root, match, nr ) {
  var got = $x( xpath, root, match, nr );
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
