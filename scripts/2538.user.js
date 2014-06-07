// ==UserScript==
// @name          Blogger Commentospere Helper
// @description   When you post a comment at a blogger blog, this also adds the comment to Commentosphere (comment.ning.com)
// @include       http://www.blogger.com/publish-comment*
// @include       http://blogger.com/publish-comment*
// ==/UserScript==

// This script is based off of one by Johan SundstrÃÂ¶m - http://userscripts.org/scripts/show/2150

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

if( location.search.match( /&r=ok$/i ) )
  linkComment();

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
  var re = new RegExp( '^'+ what +'(.*?)'+ what +'$', 'i' );
  return re.exec( string||'' )[2];
}

function linkComment()
{
  var n = document.anchors.length; if( !n ) return;
  var id = document.anchors[--n].name;
  var tags = GM_getValue( 'tags', '' );
  if(!tags && tags != '') {tags = prompt('Default tags?', '');}
  var path = '//dd[preceding-sibling::dt[@id = "'+ id +'"]]/';
  var link = xget( '//h4[@class = "post-title"]/a[1]' );
  var text = xget( path + 'p[1]' );
  var here = xget( path + 'div[@class = "r"]' );
  if( text && link && here )
  {
    var url = 'http://comment.ning.com/addItem.php?';
    var tag = document.createElement( 'a' );
    tag.href = url + 
      '&url='+ encodeURIComponent( link.href +'#'+ id ) +
      '&content=' + encodeURIComponent( wstrim( text.innerHTML ) ) +
      '&pagetitle=' + encodeURIComponent( trim(wstrim( link.innerHTML ), '"') ) +
      '&pageurl=' + encodeURIComponent(link.href) +
      '&tags=' + encodeURIComponent( tags );
    tag.title = 'Tag this comment at Commentosphere';
    tag.appendChild( document.createTextNode( 'Save at Commentosphere' ) );
    here.parentNode.insertBefore( tag, here );
    GM_setValue( 'tags', wstrim( tags ).replace( /[ \t,]+/g, ' ' ) );
  }
}
