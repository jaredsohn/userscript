// ==UserScript==
// @name          Blogger del.icio.us post commenting helper
// @namespace     http://www.lysator.liu.se/~jhs/userscript
// @description   When you post a comment at a blogger blog, this also adds the comment to Del.icio.us with the "mycomments" tag, for keeping track of your outbound comments to others' posts. As a bonus, it adds quick access keys to the Del.icio.us posting link (D) and Original article link (O).
// @include       http://www.blogger.com/publish-comment*
// @include       http://blogger.com/publish-comment*
// ==/UserScript==

// make post: http://www.blogger.com/comment.g?blogID=\d+&postID=\d+
// published: http://www.blogger.com/publish-comment.do?blogID=\d+&postID=\d+&r=ok
// Both may or may not have an "&isPopup=true" appendage. Both also fortunately
// have the post's original location in #cpost-body's last a[href], and the #cN
// as the last element of the document.anchors array. We assume the majority of
// blogger users follow the sound behaviour of listing the comments in the post
// page with the default anchor #cN as is the case in the default templates. In
// both layouts, we can also pick up our own blogger profile id through #cN's
// (which we picked up above) first <a href> tag, which is the second <a> tag
// (the first is an <a name> anchor to the same effect as the id:d <dt> tag),
// in case we would need it for something. This is not done presently.

if( location.search.match( /&r=ok(&|$)/i ) )
  linkDelicious();

function xget( xpathSelector )
{
  var it = document.evaluate( xpathSelector, document, null,
			      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
  if( it.snapshotLength )
    return it.snapshotItem( 0 );
}

function wstrim( string )
{
  return /\s*(.*?)\s*$/.exec( string||'' )[1];
}

function trim( string, what )
{
  what = '('+ what +')';
  var re = new RegExp( '^'+ what +'?(.*?)'+ what +'?$', 'i' );
  return re.exec( string||'' )[2];
}

function linkDelicious()
{
  var n = document.anchors.length; if( !n ) return;
  var id = document.anchors[--n].name;
  var del = GM_getValue( 'name', '' ) || prompt('Del.icio.us username?', '');
  var tags = GM_getValue( 'tags', '' )|| prompt('Default tags?', 'mycomments');
  var path = '//dd[preceding-sibling::dt[@id = "'+ id +'"]]/';
  var link = xget( '//h4[@class = "post-title"]/a[1]' );
  var text = xget( path + 'p[1]' );
  var here = xget( path + 'div[@class = "r"]' );
  if( text && here && del )
  {
    var title = '';
    if( link )
      title = trim( wstrim( link.innerHTML ), '"' );
    else
    {
      link = xget('//div[@id = "cpost-body"]//p[@class = "post-footer"]/em/a');
      GM_xmlhttpRequest( { url:link.href, method:'GET', onload:function( http )
			   {
			     var link = document.getElementById( 'delicious' );
			     var html = http.responseText.replace(/\s+/g, ' ');
			     var title = /<title>([^<]*)/.exec( html );
			     if( title )
			     {
			       title = wstrim( title[1] );
			       link.href = link.href.replace( /(&title=)/,
							      '$1' + title );
			     }
			   } } );
    }
    var url = 'http://del.icio.us/';
    var img = document.createElement( 'img' );
    img.src = url + 'static/img/delicious.small.gif';
    img.alt = 'Del.icio.us icon';
    var tag = document.createElement( 'a' );
    tag.href = url + del + '?v=3' +
      '&url='+ encodeURIComponent( link.href +'#'+ id ) +
      /*(title ?*/ '&title=' + encodeURIComponent( title ) +//: '') +
      '&extended=' + encodeURIComponent( wstrim( text.innerHTML ) ) +
      '&tags=' + encodeURIComponent( tags );
    tag.title = 'Tag this comment at Del.icio.us';
    tag.id = 'delicious';
    img.style.border = '0';
    img.style.marginRight = '4px';
    tag.appendChild( img );
    tag.appendChild( document.createTextNode( 'Link at Del.icio.us' ) );
    here.parentNode.insertBefore( tag, here );
    accesskey( tag, 'D' );
    accesskey( link, 'O' );
    GM_setValue( 'name', del );
    GM_setValue( 'tags', wstrim( tags ).replace( /[ \t,]+/g, ' ' ) );
  }
}

function accesskey( node, key, color )
{
  var reserved = { 'd':1 };
  var accesskey = 'Alt+'; // browsers have different ideas about accesskeys
  if( navigator.userAgent.match( /opera/i ) )
    accesskey = 'Shift+Esc followed by ';
  else if( navigator.userAgent.match( /macintosh/i ) )
    accesskey = 'Control+';

  if( !key )
  {
    var letters = node.textContent.replace( /\W/g, '' ), i; // first word char
    for( i=0; i<letters.length; i++ )
    {
      key = letters.charAt( i ); // will this letter do?
      if( !reserved[key.toLowerCase()] ) break; // found the first free letter
      key = null; // try, try again!
    }
    if( !key ) return; // too bad; don't do anything at all.
  }
  underline( node, key );
  reserved[key.toLowerCase()] = 1; // taken!
  node.title = 'Hotkey: '+ accesskey + key.toLowerCase(); // usability hint
  node.accessKey = key.toUpperCase();
  if( color ) node.style.color = color; // colorize the link as applicable
}

function underline( node, key )
{
  if( !node ) return;
  var character = new RegExp( '(<[^>]*>[^<'+ key +']*)*('+ key +')', 'i' );
  var hasOne = getStyle( node, 'textDecoration' ).match( 'underline' );
  var style = hasOne ? 'border-bottom:1px solid' : 'text-decoration:underline';
  var underlined = '$1<span style="'+ style +';">$2</span>';
  node.innerHTML = node.innerHTML.replace( character, underlined );
}

function getStyle( node, style )
{
  if( node.currentStyle )
    return node.currentStyle[ style ];
  if( window.getComputedStyle )
    return getComputedStyle( node, null )[ style ];
  return '';
}
