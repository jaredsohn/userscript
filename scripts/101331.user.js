// ==UserScript==
// @name           Play in Spotify
// @namespace      http://griffeltavla.wordpress.com
// @description    Creates direct links on certain sites for playing directly in Spotify
// @version        1.0.4
// @copyright      2011, Jonas Tingeborn
// @source         http://userscripts.org/scripts/show/101331
// @license        BSD (http://www.opensource.org/licenses/bsd-license.php)
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        http://sverigesradio.se/sida/latlista.aspx?programid=*
// ==/UserScript==

/**
 * About:
 *  Locates the tracks if present in Spotify and adds a link for each 
 *  discovered track. Currently supports the following sites:
 *   - sverigesradio.se
 *
 *  For each new page supported, add a normal greasemonkey include pattern 
 *  *as well* as an entry in the patternMap in the main function.
 *  <i>
 *   The former is needed to get greasemonkey to trigger on the page, while the
 *   latter is used to find the appropriate page processor function to execute.
 *  </i>
 */

// ============================================================================
// == Helper functions ========================================================
// ============================================================================

// Logs to firebug console if that addon is installed.
function log(o){
  if(unsafeWindow.console) unsafeWindow.console.info(o);
}

/**
 * Queries Spotify for a certain track and provides the result as a JS Object
 * to the supplied callback function.
 *
 * Usage:
 *  Submit a bunch of keywords as the query string and the supplied callback
 *  will get an object (parsed from JSON) containing the track search result
 *  from Spotify.
 *
 * Error handling:
 *  In case of an error, an optional error callback is called with the GM xhr 
 *  response and if one isn't provided, the error will be logged to the firebug
 *  console. Also if an error bubbles up from either callback function, the 
 *  exception will be caught and logged to the console as well.
 */
function findSpotifyTrack(query, callback, errorCallback){
  log('querying spotify: '+ query);
  
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://ws.spotify.com/search/1/track.json?q=' + encodeURI(query),
    onload: function(response) {
      if(response.status == "200") {
        try {
          callback( JSON.parse(response.responseText) );
        } catch (e) {
          log("Failed to process response for query: "+ query +", error:");
          log(e);
        }
      } else {
        if(errorCallback) {
          errorCallback(response);
        } else {
          log('No valid response received from Spotify: '+ response.statusText 
            +' ('+ response.status +'), query: '+ query);
        }
      }
    }
  });
}

// ============================================================================
// == Sveriges Radio (sverigesradio.se) =======================================
// ============================================================================
function sverigesRadioLinksCreator(){
  function sanitize(str){
    return $.trim(                      // Remove leading and trailing white spaces;
      str.replace(/\(.*?\)/g,'').       // Remove all within brackets (..)
      replace(/[\"]/g,'').              // Remove delimiting characters
      replace(/\s+/g,' ')               // Compact multiple whitespaces.
    );
  }
  function createLink(spotifyData, linkifyEl){
    var track     = spotifyData.tracks[0],
        trackName = track.name,
        album     = track.album.name +' ('+ track.album.released +')',
        artist    = track.artists[0].name,
        url       = track.href,
        meta      = '"'+ trackName +'" from album "'+ album +'" by "'+ artist +'"';
        meta      = artist +' - '+ album +' - '+ trackName;
    
    $(linkifyEl).wrapAll('<a href="'+ url +'" class="spotify-link" title=\''+ meta +'\'></a>');
  }
  
  $('<style type="text/css">'+
      '.querying-spotify { font-style: italic; }'  +
      '.spotify-link { font-size: 100% !important; }' +
      '.spotify-not-found { color: red; }' +
      '.spotify-link-clicked { color: gray; }' +
    '</style>').appendTo('body');
  
  $('#listbody > tr.mainrow .artist').parent().bind('mouseover',function(){
    var artists  = $(".artist", this).text(),
        artist   = sanitize( artists.split(/[,|&]/)[0] ),
        track    = sanitize( $(".title", this).text() ).replace(/\s*([A-Z]{2,}|Facebook)$/,''),
        query    = (artist + ' ' + track),
        self     = $(this);
        
    self.unbind('mouseover');
    self.addClass('querying-spotify');
    
    findSpotifyTrack(query, function(spotifyInfo){
      self.removeClass('querying-spotify');
      createLink(spotifyInfo, self[0].childNodes);
    }, function(){
      self.removeClass('querying-spotify').addClass('spotify-not-found');
    });
  });
  
  // Indicate tracks the user has clicked since the normal a:visited style
  // mechanism of the browser doesn't work for spotify URIs.
  $('body').click(function(evt){
    var el = $(evt.originalTarget).closest('.spotify-link');
    if( el.length > 0 && !el.hasClass('spotify-link-clicked') ) {
      el.addClass('spotify-link-clicked');
    }
  });
}


// ============================================================================
// == Main function (entry point), starts the page augmentation ===============
// ============================================================================
(function (){
  // To support multiple pages in the same script, simply add a pattern which 
  // signifies a URL substring for each supported page along with the processor
  // function designed to add spotify links to the page.
  var patternMap = {
    'http://sverigesradio.se/sida/latlista.aspx': sverigesRadioLinksCreator
  }
  
  for(pattern in patternMap){
    if(window.location.href.match(pattern)) {
      var pageProcessor = patternMap[pattern];
      log('Creating spotify links using function: '+ pageProcessor.name);
      pageProcessor();
      break;
    }
  }
})();
