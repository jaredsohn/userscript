// ==UserScript==
// @name           Lunarstorm guestbook buttons
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Adds extra comment and navigation links to guestbooks
// @include        http://www.lunarstorm.se/gst/gst_guestbook.aspx*
// ==/UserScript==

const myurl = 'http://www.lysator.liu.se/~jhs/userscript/www.lunarstorm.se/';
const entry_text_path = '//table[@class="Mlist"]/tbody/tr/td/*' +
  '[contains(@style,"width: 430px") and (self::div or self::span)]';

function link( href, img, w )
{
  return ' <a href="' + href + '"><img src="' + img + '" width="' + (w||33) +
    '" height="11" border="0" /></a>';
}

function make_nav_buttons( id, name, sexage, first_present )
{
  var reply = link( "javascript:WriteMessage(0,'" + id + "','" + name +
      	      "','" + sexage + "');", "_gfx/reply.gif", 29 );
  var visit = link( "gst_guestbook.aspx?userid=" + id, "_gfx/goto.gif" );
  var diary = link( "/blg/blg_viewList.aspx?userid=" + id,
      	      myurl + 'gfx/dagbok.gif', 32 );
  var history = link( "javascript:ShowHistory('" + id + "');",
      		myurl + 'gfx/historik.gif', 36 );
  return (first_present ? '' : reply + visit) + /*history +*/ diary;
}

function xslice( node, path, element )
{
  var document, evaluator, ANY, resolver, iterator, result = [], tmp;
  try
  {
    ANY = XPathResult.ANY_TYPE;
    document = node.ownerDocument || node;
    evaluator = new XPathEvaluator();
    resolver = evaluator.createNSResolver( document.documentElement );
    iterator = evaluator.evaluate( path, node, resolver, ANY, null );
    while( tmp = iterator.iterateNext() )
      result.push( element ? tmp[element] : tmp );
  }
  catch(e)
  {
    alert( 'xslice('+node+', '+path+') failed:\n' + e );
  }
  return result;
}

try
{
  var entries, i, e, a, id, name, sexage, db_only;
  entries = xslice( document.body, entry_text_path, 'parentNode' );
  for( i=0; i<entries.length; i++ )
  {
    e = entries[i];
    a = e.getElementsByTagName( 'a' );
    if( !a.length ) continue;
    db_only = !a[a.length-1].href.indexOf( 'javascript:ConfirmFavorite' );
    id = /userid=([^&]+)/.exec( a[0].href );
    if( !id.length ) continue;
    id = id[1];
    name = a[0].textContent;
    sexage = a[0].nextSibling.nodeValue;
    entries[i].innerHTML += make_nav_buttons( id, name, sexage, db_only );
  }
}
catch(x) {
  prompt( 'Lunar guestbook plugin error', x );
}
