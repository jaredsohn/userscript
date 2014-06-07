// Normalize Citysearch
// Version 0.1
// 2005-10-02
// Copyright (c) 2005, DeWitt Clinton
// http://www.unto.net/
// Released under the Creative Commons Attribution-ShareAlike License
// http://creativecommons.org/licenses/by-sa/2.5/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Normalize Citysearch", and click Uninstall.
//
// Also recommended is the AdBlock Firefox extension, as Citysearch
// loads sponsored links with Javascript, and those scores can not
// easily be adjusted.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Normalize Citysearch
// @namespace     http://www.unto.net/unto/work/normalize-citysearch
// @description   Normalize citysearch rankings to be more meaningful
// @include       http://*.citysearch.com/*
// ==/UserScript==


// The following declares the partitions for scaling.  Each partition
// in the array follows the form:
//
//  [ [ ORIGINAL_MIN, ORIGINAL_MAX ], [ ADJUSTED_MIN, ADJUSTED_MAX ] ]
//
// Note that the boundaries should be contiguous, otherwise the
// behavior is undefined


var PARTITIONS = [ [ [  0,  5 ], [  0,  1 ] ],
                   [ [  5,  8 ], [  1,  5 ] ],
                   [ [  8, 10 ], [  5, 10 ] ] ];


var BEST_OF_THRESHOLD = 8.9;

fixAllRatings( );

function fixAllRatings( ) {
  var allRatingLinks = getRatingLinks( );
  for ( var i = 0; i < allRatingLinks.snapshotLength; i++ ) {
    fixRating( allRatingLinks.snapshotItem( i ) );
  }
}


function xpath( query, node ) {
    return document.evaluate( query, node, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
}

function getRatingLinks( ) {
  return xpath( "//a[@class='rating']", document );
}


function getAdjustedRating( currentRating ) {
  var partition = getPartition( currentRating );
  if ( ! partition ) {
    return currentRating;
  } else {
    return linearStretch( currentRating, 
                          partition[0][0],
                          partition[0][1],
                          partition[1][0],
                          partition[1][1] );
  }
}


function linearStretch( x, original_min, original_max, adjusted_min, adjusted_max  ) {
   return ( ( ( ( adjusted_max - adjusted_min ) / 
                ( original_max - original_min ) ) * 
                  ( x - original_min ) ) + adjusted_min );

}


function getPartition( x ) {
  for ( var i = 0; i < PARTITIONS.length; i++ ) {
    if ( ( x > PARTITIONS[i][0][0] ) && ( x <= PARTITIONS[i][0][1] ) ) {
      return PARTITIONS[i];
    }
  }
  GM_log( "Couldn't find partition for " + x );
  return;
}


function fixRating( link ) {
  var currentRating = getCurrentRating( link );
  var adjustedRating = getAdjustedRating( currentRating );
  if ( adjustedRating < BEST_OF_THRESHOLD ) {
    removeImage( link );
  }
  setRating( link, adjustedRating );
}

function setRating( link, rating ) {
  link.innerHTML = formatRating( rating );
}


function getCurrentRating( link ) {
  var currentRating = parseFloat( link.text );
  if ( isNaN( currentRating ) || ( currentRating < 0 ) ) {
    return 0;
  } else if ( currentRating > 10 ) {
    return 10;
  } else {
    return currentRating;
  }
}


function formatRating( rating ) {
  var x = parseFloat( rating );
  if ( isNaN( x ) ) {
    x = 0;
  }
  return x.toFixed( 1 );
}

function removeImage( link ) {
  var imagesSnapshot = xpath( "..//img", link );
  for( var i = 0; i < imagesSnapshot.snapshotLength; i++ ) {
        var image = imagesSnapshot.snapshotItem( i );
        image.parentNode.removeChild( image );
  }
}
