// ==UserScript==
// @name       Bump
// @namespace  http://jedmeade.com/
// @version    1.1
// @description  Speeds up playback on HTML5 audio and video when you hit the caret key (^).
// @match      *://*/*
// @copyright  2014+, You
// ==/UserScript==

var fast_rate = 1.75,
    default_rate = 1;

function toggle_rate (tag) {
    var media = document.getElementsByTagName(tag);
    if (media.length) {
        for (var i=0; i < media.length; i++) { 
            if (media[i].playbackRate === default_rate) {
                media[i].playbackRate = fast_rate;
            } else {
                media[i].playbackRate = default_rate;
            }
        }
    }
}
        
window.onkeyup = function (e) {
    if (e.keyIdentifier === 'U+005E') {
        toggle_rate('video');
        toggle_rate('audio');
    }
}
