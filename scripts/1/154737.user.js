// ==UserScript==
// @name        Spotify Radiofy
// @namespace   http://griffeltavla.wordpress.com
// @description Adds Spotify track links directly to the listing page
// @include     http://radiofy.se/*
// @require     http://code.jquery.com/jquery-1.7.1.min.js
// @version     1.1.1
// @author      Jojje
// ==/UserScript==

var slogo = 'http://static.radiofy.se/images/services/spotify.png';

function log(o){
  if(typeof(console) != "undefined") console.info(o);
}

///
// Trigger a callback if the mouse cursor has hovered over the matched elements
// for a while. "a while" is denoted in milliseconds and specified in the delay
// parameter. Default delay is 500ms.
$.fn.delayedHover = function(callback, delay) {
  var timeout;
  delay = delay || 500;
  return this.hover(
    function(e){
      var self = this;
      timeout = setTimeout(function(){
        callback.call(self,e); 
      }, delay);
    },function(e){
      clearTimeout(timeout);
    }
  );
};

// Need to use GM's ajax function as radiofy will return a 302 to the spotify 
// site, which is in violation of the same origin policy enforced by browsers 
// and consequently renders jQuery's ajax useless for this purpose.
function gm_head(url, callback){
  GM_xmlhttpRequest({
    method: 'HEAD',                      // Get minimal amount of data from spotify and radiofy, so as to be a good "netizen".
    url: url,
    onload: function(response) {
      if(response.status == "200") {
        try {
          callback( response );
        } catch (e) {
          log("Failed to process URL: "+ url +", error:");
          log(e);
        }
      }
    }
  });
}

function resolveSpotLink(url, callback) {
  gm_head(url, function(response){
    callback(response.finalUrl);
  });
}

function createSpotLink(a, title_link){
  resolveSpotLink(a.href,function(surl){
    var track_id  = surl.split("/").pop().split("?")[0],
        track_url = "spotify:track:" + track_id,
        left      = Math.round( $(title_link).position().left) - 20;
    $('<a href="'+ track_url +'" style="float:left;left:'+ left +'px;position:absolute;"><img style="width:1em;" src="'+ slogo +'" title="Click to play in the Spotify app"></a>')
    .insertBefore(title_link);
  });
}

// Incur a short delay (like a tooltip wait period) so as to no trigger queries and unecessarily put load 
// on the radiofy and spotify servers.
//
// A normal mouseover would force a cascade of queries to the backends just by having the user try to each 
// the track of interest, thus querying a lot of redundant tracks. 
//
// With the delay the rationale is that mostly relevant tracks will get queried, signified by the user 
// having settled the mouse cursor over a track for a while.
$('.gigs tr[itemprop=track] a[itemprop=url]').delayedHover(function(){
  $row = $(this).closest('tr[itemprop=track]');

  if($row[0] && !$row.attr('processed')) {                               // If the user mouses over an an unprocessed track row, go ahead and augment it.
    $row.attr('processed','true');                                       // Avoid processing this row again.
    var spotify_metalink = $row.find('a[href $= "/open/spotify"]')[0],   // Link to the radiofy back-and-forth redirection scheme to finally get at the Spotify track link.
        title_link       = $row.find('a[itemprop=url]');                 // Link which we'll add the "splotify play direct" feature in front of.
    
    if(spotify_metalink) createSpotLink(spotify_metalink, title_link);   // If Radiofy hasn't added a spotify link somehwere on their site, then skip augmenting this track.
  }
});
