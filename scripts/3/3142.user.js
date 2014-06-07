// ==UserScript==
// @name           Lunarstorm prylbilder
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Gör om Lunarstorms pryllänkar till riktiga länkar, och länkar till bilder så de visas på sidan i stället för att ge en spara-dialog.
// @include        http://www.lunarstorm.se/usr/itm_items.aspx?UserID=*
// ==/UserScript==

const image_relxp = '../preceding-sibling::td/img[@src="/_gfx/fileicon/picture.gif"]';
const image_links = '//a[starts-with(@href,"javascript:view_file")]['+image_relxp+']';
process_links();

function get( xpath, root )
{
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, result = [];
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
  while( next = got.iterateNext() )
    result.push( next );
  return result;
}

function load_image_to( url, node )
{
  return function( e )
  {
    var par = node.parentNode;
    var img = <img/>;
    img.@src = url;
    e.preventDefault();
    e.stopPropagation();
    par.removeChild( node );
    par.innerHTML += img.toXMLString();
  };
}

function process_links()
{
  var links = get( image_links ), image, a, tr, iid, img, href, click, i;
  var uid = unescape( location.search ).replace(/[{}]/g, '').toLowerCase();
  for( i=0; i<links.length; i++ )
  {
    a = links[i];
    tr = a.parentNode.parentNode;
    iid = /'(.*)'/.exec( a.href )[1];
    href = 'http://www.lunarstorm.se/usr/itm_send.aspx'+ uid +'&itemid='+ iid;
    click = load_image_to( href, get( image_relxp, a )[0] );
    a.href = href;
    a.addEventListener( 'click', click, true );
    tr.addEventListener( 'click', click, false );
    tr.removeAttribute( 'onclick' );
    a.removeAttribute( 'onclick' );
  }
}
