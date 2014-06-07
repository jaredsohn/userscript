// ==UserScript==
// @version	1.0: Initial version
// @name	Gmail Show Unread only button
// @namespace	http://code.google.com/p/ecmanaut/
// @description	Adds a "Show Unread" button next to the search field, to only show unread mails / threads in the current view (using the search keyword "is:unread"). The button toggles to a "Show All" button when in unread-only mode.
// @include	http://mail.google.com/mail/?*
// ==/UserScript==

var button = { q:'is:unread', add:'Show Unread', undo:'Show All' };

button.id = 'GM-' + button.q.replace(/\W/g, '-');
button.re = new RegExp( '(.*?\\S*)\\s*'+ button.q +'(\\s.*?\\S*)?\\s*$' );

var f = document.forms.namedItem('s');		// has search form
var q = f && f.elements.namedItem('q');		// the search query
var b = document.getElementById( button.id );	// our button

if( q ) {
  !b && add_button();
  update_button_title();
}

function add_button()
{
  var p = q.parentNode, next = q.nextSibling;
  b = document.createElement( 'input' );
  b.id = button.id;
  b.type = 'button';
  p.insertBefore( document.createTextNode(' '), p.insertBefore( b, next ) );
  b.addEventListener( 'click', toggle_show_unread, false );
}

function find_query_surroundings()
{
  return q.value.match( button.re );
}

function update_button_title()
{
  var unreadp = find_query_surroundings();
  b.value = unreadp ? button.undo : button.add;
  return unreadp;
}

function toggle_show_unread( e )
{
  var query = find_query_surroundings();
  if( query ) // is button.q present in current query?
    q.value = query[1] + (query[2]||'');
  else
    q.value = (q.value ? q.value+' ' : '') + 'is:unread';
  click( './/input[@value="Search\xA0Mail"]', f );
  update_button_title();
}

function click( node, ctx )
{
  node = typeof node == 'string' ? $x( node, ctx )[0] : node;
  node.click();
}

function $x( xpath, root )
{
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  while( next = got.iterateNext() )
    result.push( next );
  return result;
}
