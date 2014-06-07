    // ==UserScript==
    // @name        Pokemon Soulless Tool
    // @include     http://www.pokemonsoulless.org/map.php?map=*
    // ==/UserScript==
     
    var map = document.querySelector('#map');
    if (map) {
            setInterval( function () {
                    var enc = document.querySelector('#result p');
                   
                    if (enc) {
                            var caught = enc.querySelector('img[alt="X"]');
                           
                            if (caught || enc.textContent.indexOf('on the floor') > -1) {
                                    walkAround();
                            } else {
                                    var btn = document.querySelector('#result form input[type="submit"]');
                                    if (btn) {
                                            btn.click();
                                    }
                            }
                    } else {
                            walkAround();
                    }
            }, 500);
    }
     
    function walkAround() {
            var arrows = document.querySelectorAll('img[onclick*=moveSprite]');
            if (arrows) {
                    arrows[ rand(0, arrows.length-1) ].click();
            }
    }
     
    function rand(min, max) {
            return Math.round( Math.random()*(max-min) ) + min;
    }
     
     
     
     
     
    var btn = document.querySelector('input[value="Fight!"]');
    if (btn) {
            btn.click();
    }
     
    var btn = document.querySelector('input[value="master_ball"]');
    if (btn) {
            btn.click();
    }
     
    var btn = document.querySelector('input[value="Use Item"]');
    if (btn) {
            btn.click();
    }
     
    var btn = document.querySelector('input[value="Continue!"]');
    if (btn) {
            btn.click();
    }
     
    var btn = document.querySelector('.sub-content a[href^="map.php?map="]');
    if (btn) {
            btn.click();
    }
