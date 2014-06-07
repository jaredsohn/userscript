// ==UserScript==
// @id             www.twitch.tv-fff899c1-533e-4a93-99a9-fdc17480dfeb@scriptish
// @name           Twitch TPP local utc time shower
// @version        0.1
// @namespace      http://www.twitch.tv/twitchplayspokemon/noway
// @author         noway
// @description    Shows your local utc time on TPP stream page
// @include        http://www.twitch.tv/twitchplayspokemon
// @run-at         document-end
// ==/UserScript==
document.addEventListener('DOMContentLoaded', function () {
    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
        || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    
    var child = document.createElement('p');
    child.style = 'margin:17px 0;font-weight:bold;font-family:monospace;text-align:center'
    
    var e = 
        document.getElementById('broadcast-meta').
        getElementsByClassName("info")[0].
        appendChild(child);
    
    function step() {
        var date = new Date();
        e.innerHTML =
            ('0' + date.getMinutes()).slice(-2) + ':' +
            ('0' + date.getSeconds()).slice(-2) + '.' +
            ('0' + Math.floor(date.getMilliseconds() / 10)).slice(-2);
        window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
    
});
