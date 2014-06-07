// ==UserScript==
// @name           Blogger comments page shows post permalinks
// @namespace      http://code.google.com/p/ecmanaut/
// @description    At Blogger's post comment pages, always show a link to the post permalink, and another one to del.icio.us, armed to bookmark your comment with a few pre-populated tags. (Edit the script source code to change user and tags.)
// @include        https://www.blogger.com/comment.g?*
// @xpath    hide: id("btnPost")
// @xpath    link: //div/p[@class="post-footer"]/em/a
// @xpath?   last: //dl[@id="comments-block"]/dt[last()]
// @xpath*  posts: //dl[@id="comments-block"]/dd/p[1]
// ==/UserScript==

if( typeof xpath == "undefined" )
  xpath = {
    hide: $X('id("btnPost")'),
    link: $X('//div/p[@class="post-footer"]/em/a'),
    last: $X('//dl[@id="comments-block"]/dt[last()]'),
   posts: $x('//dl[@id="comments-block"]/dd/p[1]')
  };

link( xpath );

function a( title, href ) {
  var a = document.createElement("a");
  a.innerHTML = title;
  a.href = href;
  a.style.fontSize = "90%";
  a.style.marginLeft = "3px";
  return a;
}

function trim( what, how ) {
  return what.replace( how||/^\s*|\s*$/g, "" );
}

function link( nodes ) {
  var last = a( "Last comment", nodes.link.href );
  if (nodes.last)
    last.href += "#comment-"+ nodes.last.id.slice(1);
  nodes.hide.parentNode.insertBefore( last, nodes.hide.nextSibling );
  if (nodes.posts) {
    var note = nodes.posts.pop().innerHTML;
    var tag = a( "Tag it", "http://del.icio.us/ohayou?url="+
                 encodeURIComponent(last.href) +"&description="+
                 trim( document.title, /^Blogger: | - Post a Comment$/g ) +
                 "&tags=mycomments+eng+pub&notes="+ trim( note ) );
    last.parentNode.insertBefore( tag, last.nextSibling );
  }
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  switch( got.resultType ) {
    case got.STRING_TYPE:  return got.stringValue;
    case got.NUMBER_TYPE:  return got.numberValue;
    case got.BOOLEAN_TYPE: return got.booleanValue;
    default:
      while( next = got.iterateNext() )
	result.push( next );
      return result;
  }
}
