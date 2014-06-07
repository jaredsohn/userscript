// ==UserScript==
// @name           phpBB forum signature purger
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Drops big chunks of signatures/poster stats in phpBB forums
// @include        http://*/viewtopic.php?t=*
// @include        http://*/viewtopic.php?p=*
// ==/UserScript==

(function() {
  purge( 'postbody', /<br>_{16,}</mi );
  purge( 'postdetails', /<br><br>/mi );

  function get( path )
  {
    var type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
    var nodes = document.evaluate( path, document.body, null, type, null );
    var result = new Array( nodes.snapshotLength );
    for( var i=0; i<result.length; i++ )
      result[i] = nodes.snapshotItem( i );
    return result;
  };

  function purge( c, re )
  {
    var divs = get( '//span[@class="'+c+'"]' ), div, i, m;
    for( i=0; i<divs.length; i++ )
      with( div=divs[i] )
	if( m = re.exec( innerHTML ) )
	{
	  innerHTML = innerHTML.substr( 0, m.index );
	  while( nextSibling )
	    parentNode.removeChild( nextSibling );
	}
  };
})();
