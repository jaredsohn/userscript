

// ==UserScript==
// @name           konami code to flip images
// @author         Thomas
// @description    Flips all images when konami code entered
// @include        *
// @exclude        http://*imdb*/title/*
// @version        20110824
// ==/UserScript==
if ( window.addEventListener ) {
        var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
        window.addEventListener("keydown", function(e){
                kkeys.push( e.keyCode );
                if ( kkeys.toString().indexOf( konami ) >= 0 ) {
                        $('img').css('-webkit-transition-duration', '10s').css('-webkit-transform', 'rotate(360deg)');
                        $('a,p,span,h1,h2,h3,input').css('-webkit-transition-duration', '10s').css('-webkit-transform', 'rotate(-360deg)');
                        $('img').css('-moz-transition-duration', '10s').css('-moz-transform', 'rotate(360deg)');
                        $('a,p,span,h1,h2,h3,input').css('-moz-transition-duration', '10s').css('-moz-transform', 'rotate(-360deg)');
                }
        }, true);
}   
