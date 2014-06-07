// ==UserScript==
// @name           Blogspot template edit shortcut
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Replaces the "GET YOUR OWN BLOG" button in the Blogger header with a nice blue "EDIT BLOG TEMPLATE" button, which takes you right into the template editor.
// @include        http://*.blogspot.com/*
// ==/UserScript==

// Scriptlet variant, to just invoke the editor from any blog page of yours:
// javascript:var l=document.getElementsByTagName('link'),i;for(i=0;i<l.length;i++)if(l[i].rel=='EditURI')location='http://www.blogger.com/template-edit.g?blogID='+/id=(\d+)/i.exec(l[i].href)[1];void 0

(function()
{
  var links = document.getElementsByTagName( 'link' ), i, id, dest, node, href;
  for( i=0; i<links.length; i++ )
    if( links[i].rel == 'EditURI' )
      if( id = /id=(\d+)/i.exec( links[i].href ) )
	break;
  if( id )
  {
    node = document.getElementById( 'b-getorpost' );
    node.href = 'http://www.blogger.com/template-edit.g?blogID=' + id[1];
    node = node.getElementsByTagName( 'img' ).item( 0 );
    if( node )
      node.src = 'http://www.lysator.liu.se/~jhs/blog/edit-blog-template.png';
  }
})();
