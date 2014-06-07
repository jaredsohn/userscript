// ==UserScript==
// @name           Always show all releases on Musicbrainz v1.0
// @namespace      naja.nitewinds.org
// @include        *musicbrainz.org/*
// @contact        najamelan -> gmail
// ==/UserScript==


// Unfortunately it looks like we'll be waiting for firefox 3 to get regex support in xpath, so for now this will be it:

var oResult = document.evaluate( 

  '//a \
  [                                                                                         \
    (                                                                                       \
          starts-with( @href, "/artist/" )                                                  \
      or  starts-with( @href, "/show/artist/?artistid=" )                                   \
      or  starts-with( @href, "http://musicbrainz.org/artist/")                             \
      or  starts-with( @href, "http://musicbrainz.org/show/artist/?artistid=" )             \
      or  starts-with( @href, "http://www.uk.musicbrainz.org/artist/")                      \
      or  starts-with( @href, "http://www.uk.musicbrainz.org/show/artist/?artistid=" )      \
    )                                                                                       \
    and                                                                                     \
    not                                                                                     \
    (                                                                                       \
      contains( @href, "short=" )                                                           \
    )                                                                                       \
  ]'
    
  , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );


if ( oResult != null )
{
  var oLink,
      arry = []; 

  //Put all of them in an array, because otherwise it invalidates the oResult if we make changes to any of the nodes
  while( oLink = oResult.iterateNext() ) arry.push(oLink); 
  
  for( var i = arry.length-1; i >= 0; --i  )
  {
    if( arry[i].href.match( /\?/ ) ) arry[i].setAttribute( "href", arry[i].href + "&short=0" );
    else arry[i].setAttribute( "href", arry[i].href + "?short=0" );
  }
}
