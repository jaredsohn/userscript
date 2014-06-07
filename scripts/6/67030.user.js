// ==UserScript==
// @name           Google Docs - Mp3 Preview
// @namespace      http://www.manekinekoninja.com
// @include        https://docs.google.com/leaf?*
// @require       http://code.jquery.com/jquery-1.3.1.js
// ==/UserScript==

(function() {
    var icon = $('.leaf-header-icon');

    if (icon.attr("src").indexOf("audio") > -1) {

          
      var downloadLink = $('.leaf-contents-link');
      var audioFile = downloadLink.attr("href");

      var player = '<embed height="27px" width="460px" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="playerMode=embedded" wmode="transparent" bgcolor="#ffffff" quality="best" allowfullscreen="true" allowscriptaccess="never" src="http://www.google.com/reader/ui/3247397568-audio-player.swf?audioUrl=' + audioFile + '" type="application/x-shockwave-flash" classname="audio-player-embed"/>'
            
      $('.leaf-contents-nopreview-container').html("").append(player).append('<br/>').append(downloadLink);

    }


}());