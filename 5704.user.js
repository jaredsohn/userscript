// ==UserScript==
// @name	javascript: to normal links
// @namespace	http://www.lysator.liu.se/~jhs/userscript
// @description	Turn javascript: links into regular links, to enable opening them in new tabs, for instance. Crafted for helgon.net, but can probably often work just as well for other sites too, if you add pages or sites it should try to fix using Greasemonkey's manual Manage User Scripts view.
// @include	http://www.helgon.net/*
// @include	http://helgon.net/*
// ==/UserScript==

function short_circuit_link( a )
{
  var href = safe_short_circuit_function( a.href );
  if( href )
    a.href = href;
}

function foreach( xpath, cb )
{
  var nodes = $x( xpath ), i, e = 0;
  for( i=0; i<nodes.length; i++ )
    e += cb( nodes[i], i ) || 0;
  return e;
}

function $x( xpath, root )
{
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  while( next = got.iterateNext() )
    result.push( next );
  return result;
}

var regexps = {};

// In the string `code', return the first occurrence of a set of two or more
// string literals and variable names, separated by the `separator' token.
// When no data matched, return false.
function get_first_separated_token_list( code, separator )
{
  var re = regexps[separator];
  if( !re )
  {
    var string = '([\'"]).*?\\'; // plus first-paren number (integer)
    var token1 = '(('+string+'4)|\\w+)'; // string or variable
    var tokenN = '(('+string+'7)|\\w+)'; // string or variable
    re = new RegExp( '('+ token1 + '\\s*' + separator + '\\s*)+' + tokenN );
    regexps[separator] = re;
  }
  var match = re.exec( code );
  if( match )
    return match[0];
}

// Given a "javascript:funcall(params)" url, guess what URL the call will try
// to somehow invoke/reference, based on the first set of string-literal-and-
// variable additions performed in that function, and return that result.
function safe_short_circuit_function( href )
{
  var name, args, func, arg_names, body, join;
  var tmp = href.match( /^javascript:\s*([^()\s]*)\s*\((.*)\)/ );
  if( tmp )
  {
    name = tmp[1];
    func = unsafeWindow[name];
    args = get_first_separated_token_list( tmp[2], ',' );
    tmp = func.toSource().match( /^function .*?\((.*?)\)\s*{(.*)}/ );
    if( tmp && args )
    {
      arg_names = tmp[1];
      body = tmp[2];
      // parse out the first sequence of string/variable additions:
      join = get_first_separated_token_list( body, '\\+' );
      if( join )
      { // example join: '"guestbook.aspx?ID=" + iID + "&GuestBookID=" + iG'
	func = new Function( arg_names, 'return ' + join );
	return func.apply( unsafeWindow, eval( '['+args+']' ) );
      }
    }
  }
}

try {
foreach( '//a[starts-with(@href,"javascript:")]', short_circuit_link );
 }catch( e ){ unsafeWindow.console.log( e ); }
