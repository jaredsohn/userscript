// ==UserScript==
// @name           Show backlink counts in Blogger editor
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    v1.0 (2005-11-20, Johan SundstrÃÂ¶m, http://ecmanaut.blogspot.com/, ohayou+ecmanaut@gmail.com)
// @include        http://www.blogger.com/posts.g?blogID=*
// @include        http://blogger.com/posts.g?blogID=*
// ==/UserScript==

var injectme = {};

if( document.body.id == 'posting' )
{
  var url = 'http://www.blogger.com/dyn-js/backlink_count.js', a, backlinks;
  var trs = document.getElementById( 'posts' ).getElementsByTagName( 'tr' );
  var tds, add, links, i, post, back, script;
  for( i=0; i<trs.length; i++ )
  {
    tds = trs[i].getElementsByTagName( 'td' );
    if( tds.length < 4 ) continue;
    add = tds[tds.length-1].cloneNode( true );
    if( i )
    {
      links = trs[i].getElementsByTagName( 'a' );
      a = links[links.length-1];
      post = /&postID=(\d+)/.exec( a.search );
      url += (i == 1) ? a.search : post[0];
      injectme[post[1]] = {};
      a.href = links[links.length-2] + '#links';
      a.innerHTML = '<span id="bl'+ post[1] +'"></span>Backlinks';
    }
    trs[i].appendChild( add );
  }

  // Okay, this is kind of stupid, when we have GM_xmlhttpRequest:
  injectme[post[1]].watch( 'innerHTML', updatePage );
  unsafeWindow.BL_BacklinkCount = injectme;
  script = document.createElement( 'script' );
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild( script );
}

function updatePage( id, html, got )
{
  for( id in injectme )
  {
    html = injectme[id].innerHTML;
    if( typeof html == 'undefined' )
      html = got;
    var node = document.getElementById( 'bl'+id );
    node.innerHTML = html + '\240';
    if( html == '1' )
      node.parentNode.lastChild.nodeValue = 'Backlink';
  }
}
