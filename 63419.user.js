// ==UserScript==
// @name           Flowplayer for YouTube
// @namespace      userscripts.org
// @description    Replaces the default YouTube player with Flowplayer (flowplayer.org). Forked from version 1.2 of Youtube Alternate Video Player by Yansky.
// @include        *
// @copyright      Yansky, Delvin
// @licence        Creative Commons Attribution-Share Alike 3.0 Unported License; http://creativecommons.org/licenses/by-sa/3.0/
// @version        0.6.3
// @attribution    Yansky
// @attribution    Delvin
// ==/UserScript==

var getSourceUrl = (<![CDATA[
 (function( raw, fmt ) {
  var formaturlmapraw = decodeURIComponent(raw).split( "," );
  // Put fmt_url_map into an array.
  var formaturlmap = new Array;
  for ( i in formaturlmapraw ) {
   formaturlmap[formaturlmapraw[i].split( "|" )[0]] = formaturlmapraw[i].split( "|" )[1];
  }
  // If no fmt or selected quality is not available, use the highest quality available.
  if ( fmt && formaturlmap[fmt] ) {
   var videosrc = formaturlmap[fmt];
  } else {
   // Each format code from high to low quality.
   var allfmts = new Array( "37", "22", "18", "35", "34", "5" );
   // Find the first that is available which is the highest quality available.
   for ( i in allfmts ){
    if ( formaturlmap[allfmts[i]] ) { var fmt = allfmts[i]; break; }
   }
   var videosrc = decodeURIComponent( formaturlmap[fmt] );
  }
  return videosrc;
 })
]]>).toString();

var loadPlayer = (<![CDATA[
 (function( player, thumb, source ) {
   // This is where the player code goes, remember that it runs on Window (non-privileged). The best way to extend is to use flowplayer() and anonymous functions but if needed define your functions here as well.
   flowplayer( player, { src: "http://hockersmith.net/FirefoxHacking/FlowPlayer/flowplayer-3.2.6.swf", w3c: true, cachebusting: false, wmode: "opaque" }, {
    clip: {
     seekableOnBegin: true,
     urlEncoding: true
    },
    playlist: [
     { url: thumb },
     { url: encodeURIComponent( source ),
       scaling: "fit",
       autoPlay: false,
       autoBuffering: true
     }
    ],
    play: {
     label: "Play",
     replayLabel: "Replay",
    },
    plugins: {
     controls: {
      url: "http://hockersmith.net/FirefoxHacking/FlowPlayer/flowplayer.controls-3.2.4.swf",
      opacity: 0.80,
      tooltips: {
       buttons: true
      }
     }
    },
    onLoad: function() {
     // Runtime code
    }
   });
 })
]]>).toString();

var newPlayer = (<![CDATA[
 (function( original_player ) {
  var container = original_player.parentNode;
  var reference = original_player.nextSibling;
  container.removeChild( original_player );
  var player = document.createElement( "div" );
  player.id = original_player.getAttribute( "id" );
  player.setAttribute("style", "display: inline");
  if ( reference ) {
   container.insertBefore( player, reference );
  } else { container.appendChild( player ); }
  return player;
 })
]]>).toString();

var getFmt = (<![CDATA[
 (function() {
  var url = document.location.href;
  // Find first (and should be only) fmt query string in url.
  var urlfmt = url.match( /[^?&]*fmt=([^&]*)/ )
  // Test for fmt query string.
  if ( urlfmt && urlfmt[1] ) {
   var fmt = urlfmt[1];
  } else { var fmt = ""; }
  return fmt;
 })
]]>).toString();

var insertApi = function() {
 var head = document.getElementsByTagName( "head" )[0];
 var fp_js = document.createElement( "script" );
 fp_js.src = "http://hockersmith.net/FirefoxHacking/FlowPlayer323/flowplayer-3.2.4.min.js";
 head.appendChild( fp_js );
}

var insertPly = function( script, element ) {
 var fp_ps = document.createElement( "script" );
 fp_ps.textContent = script;
 element.appendChild( fp_ps );
}

// We load old style embeds by converting them to new style embeds. This avoids cross-site scripting problems with the old style embeds.
var loadEmbed = function( original_player ) {
 var embed_url = new RegExp( "(http[s]?://www.youtube.com/)v(/.*)" );
 
 var embedsrc = original_player.getAttribute( "src" );
 var embed_url = embedsrc.match( embed_url );
 if ( !embed_url ) return;
 
 var container = original_player.parentNode;
 var reference = original_player.nextSibling;
 container.removeChild( original_player );
 
 var iframe_embed = document.createElement( "iframe" );
 iframe_embed.setAttribute( "title", "YouTube video player" );
 iframe_embed.setAttribute( "width", original_player.getAttribute( "width" ) );
 iframe_embed.setAttribute( "height", original_player.getAttribute( "height" ) );
 iframe_embed.setAttribute( "src", embed_url[1] + "embed" + embed_url[2] );
 if ( reference ){
  container.insertBefore( iframe_embed, reference );
 } else { container.appendChild( iframe_embed ); }
}

// Detect if we are on YouTube
if ( RegExp( "http[s]?://www.youtube.com/watch[/?]+" ).test( document.location.href ) ) {
 insertApi();
 var loadYT = (<![CDATA[
  var config = yt.getConfig( "SWF_CONFIG" );

  var original_player = document.getElementById( config.attrs["id"] );
  var player = ]]>+ newPlayer +<![CDATA[( original_player );

  var fmt = ]]>+ getFmt +<![CDATA[();

  var source = ]]>+ getSourceUrl +<![CDATA[( encodeURIComponent(config.args["fmt_url_map"]), fmt );
  window.addEventListener("load", function(e) { // Wait for flowplayer API
   // Hope VIDEO_HQ_THUMB returns. decodeURIComponent( yt.getConfig( "VIDEO_HQ_THUMB" ) )
   ]]>+ loadPlayer +<![CDATA[( config.attrs["id"], document.location.protocol + "//i.ytimg.com/vi/" + yt.getConfig( "VIDEO_ID" ) + "/hqdefault.jpg", source );
  }, true);
  ]]>).toString();
 insertPly(loadYT, document.getElementById("watch-player"));
} else
// Detect if we are in an iFrame embed
if ( RegExp( "http[s]?://www.youtube.com/embed/" ).test( document.location.href ) || RegExp( "http[s]?://www.youtube.com/watch_popup[/?]+" ).test( document.location.href ) ) {
 insertApi();
 var loadiFrameEmbed = (<![CDATA[
  var original_player = document.getElementById( "video-player" );
  var player = ]]>+ newPlayer +<![CDATA[( original_player );

  var raw_config = original_player.getAttribute( "flashvars" );
  var to_array = function( raw ) {
   var raw = raw.split( "&" );
   var parameters = new Array;
   for( var i = 0; i < raw.length; i++ ) {
    parameters[raw[i].split( "=" )[0]] = raw[i].split( "=" )[1];
   }
   return parameters;
  }
  var config = to_array( raw_config );
  // Get video info
  var request = new XMLHttpRequest();
  request.onreadystatechange = function( event ) {
   if ( request.readyState == 4 ) {
   if ( request.status == 200 ) {
    var parameters = to_array( request.responseText );
    if ( parameters["status"] == "fail" ) { return; }
    callback(parameters);
   }
   }
  }
  request.open( "GET",
                document.location.protocol + "//www.youtube.com/get_video_info?video_id=" + config["video_id"] + "&el=embedded&eurl=" + encodeURIComponent( document.location.href ) + "&asv=3&hl=en_US",
                true );
  request.send( null );
  
  var fmt = ]]>+ getFmt +<![CDATA[();
  
  var callback = function(parameters) {
   var source = ]]>+ getSourceUrl +<![CDATA[( parameters["fmt_url_map"], fmt );
   ]]>+ loadPlayer +<![CDATA[( player, decodeURIComponent( config["iurl"] ), source );
  }
 ]]>).toString();
 insertPly(loadiFrameEmbed, document.getElementById("watch-player-div"));
} else {
 // Detect embedded videos
 // Monitor for inserted players
 document.addEventListener( "DOMNodeInserted", 
                            function( event ) { 
                              if ( event.target.tagName == "EMBED" ) {
                                loadEmbed( event.target );
                              }
                            }, true );
 // Get players loaded before we started monitoring
 var embeds = document.getElementsByTagName( "embed" );
 // Get around automatically updating DOM Nodelist
 var static_embeds = new Array;
 for ( var i = 0; i < embeds.length; i++ ) {
  static_embeds[i] = embeds[i];
 }
 for ( var i = 0; i < static_embeds.length; i++ ) {
   loadEmbed( static_embeds[i] );
 }
}