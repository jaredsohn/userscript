// ==UserScript==
// @name	KoL UI Improvements
// @namespace	http://www.lysator.liu.se/~jhs/userscript/
// @description	Ohayou UI improvements bookmarklet, in Greasemonkey form
// @include	http://*.kingdomofloathing.com/main.html
// @include	http://*.kingdomofloathing.com/main_c.html
// ==/UserScript==

(function(){

  function loadUI()
  {
    var tag = top.document.createElement( 'script' ), old;
    with( top.frames[1].charpane.document.getElementsByTagName('b')[0].lastChild )
    {
      tag.src='http://www.lysator.liu.se/~jhs/KoL/forsale/log.rxml?n='+escape(nodeValue||lastChild.nodeValue);
      with( top.document.body )
	if( (old = getElementsByTagName( 'script' )).length )
	  replaceChild( tag, old[0] );
	else
	  appendChild( tag );
    }
  };

  window.addEventListener( "load", loadUI, false );

})();
