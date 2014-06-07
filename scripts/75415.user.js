// ==UserScript==
// @name          ZenTube
// @namespace     http://www.battybovine.com/
// @description   Remove YouTube comments and extraneous bits
// @include       http://*.youtube.com/*

// Based on GPL code from: http://franciscodesign.com/junk/

(function() {

var removeHeader = document.getElementById('masthead-container');
if (removeHeader) {
    removeHeader.parentNode.removeChild(removeHeader);
}

var removeComments = document.getElementById('watch-main-container');
if (removeComments) {
    removeComments.parentNode.removeChild(removeComments);
}

var removeChannelComments = document.getElementById('playnav-panel-tab-comments');
if (removeChannelComments) {
    removeChannelComments.parentNode.removeChild(removeChannelComments);
}

var removeChannelComments = document.getElementById('playnav-panel-comments');
if (removeChannelComments) {
    removeChannelComments.parentNode.removeChild(removeChannelComments);
}

//var removeExtraneousJS = document.getElementById('watch-player').getElementsByTagName('script')[0];
//if(removeExtraneousJS) {
//    removeExtraneousJS.parentNode.removeChild(removeExtraneousJS);
//}

//var resizePlayer = document.getElementById('movie_player');
//resizePlayer.setAttribute('width', '960');
//resizePlayer.setAttribute('height', '565');
//resizePlayer.setAttribute('style', 'margin\: 0 auto\;');

})();
// ==/UserScript==
