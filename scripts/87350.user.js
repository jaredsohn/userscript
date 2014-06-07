// ==UserScript==
// @name           Google Docs - Audio Preview for MP3/WAV/OGG
// @namespace      http://leith.caldwell.net.nz/, www.lucianobello.com.ar (original: http://www.manekinekoninja.com)
// @version        1.2
// @author         Leith Caldwell, Luciano Bello
// @description    Shows a player (google player for MP3 or audio tag for other formats) to preview audio files at Google Docs. 
// @include        https://docs.google.com/leaf?*
// @include        http://docs.google.com/leaf?* 
// @include        https://docs.google.com/a/*/leaf?* 
// @include        http://docs.google.com/a/*/leaf?* 
// ==/UserScript==

// load jQuery, then call a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    var with_flash_player = ['.mp3'];
    var with_html5_player = ['.wav','.ogg'];
    var filename = $('.goog-inline-block:first').text();

    var player = ''; // default to no tag

    for (x in with_flash_player) {
        if (filename.toLowerCase().substr(-4) == with_flash_player[x]) {
            var player = 'flash'; 
        }
    }

    for (x in with_html5_player) {
        if (filename.toLowerCase().substr(-4) == with_html5_player[x]) {
            var player = 'html5'; 
        }
    }
    
    var audioFile = window.location.protocol + '//docs.google.com/uc' + window.location.search + '&export=download&confirm=no_antivirus';

    switch (player) {
      case('flash'):
        var playerOptions = 'backgroundColor=0xEEEEEE&autoPlay=true&';

        var playerURL = 'https://mail.google.com/mail/html/audio.swf';

        var player_code = '<embed height="27px" width="460px" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="playerMode=embedded" wmode="transparent" bgcolor="#ffffff" quality="best" allowfullscreen="true" allowscriptaccess="never" src="' + playerURL + '?audioUrl=' + encodeURIComponent(audioFile) + playerOptions + '" type="application/x-shockwave-flash" classname="audio-player-embed"/>'
        break;
      case('html5'):
        var player_code='<audio src="'+audioFile+'" controls="controls"> Your browser does not support the audio element.</audio>'
        break;
      default:
        // do nothing
        break;
    }
    $('.leaf-contents-nopreview-container, .leaf-jfk-contents-nopreview-container').html("").append(player_code);
}

// load jQuery and execute the main function
addJQuery(main);