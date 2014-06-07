// ==UserScript==
// @name           MuxtapeSamplerPad
// @namespace      http://polog.org/
// @description    sampler pad for muxtape
// @include        http://*.muxtape.com/
// ==/UserScript==

for(name in unsafeWindow){
    if(typeof(unsafeWindow[name].ladles) != 'undefined'){
        var k = unsafeWindow[name];
        break;
    }
}

k.playNext = function(){};

unsafeWindow.document.addEvent('keydown',function(event) {
    var i = 0;
    ['5','6','7','8','t','y','u','i','g','h','j','k'].slice(0, k.hexes.length).forEach(
        function(key){
            if(event.key == key){
                var hex = k.hexes[i];
                if(k.playing == hex) k.ladles['player' + hex].stop();
                k.ladles['player' + hex].play();
                k.nowPlaying(hex);
            }
            i ++;
        }
    );
});

