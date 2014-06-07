// ==UserScript==
// @name       More Kittens
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  Replace unloaded images with kittens
// @match      http://*/*
// @copyright  2012+, Forsvunnet
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

var url = "http://placekitten.com/";

$(window).load(function() {
    setTimeout(function(){
        $('img').each(function(){
            if (this.naturalWidth === 0) {
                var w = $(this).attr('width');
                var h = $(this).attr('height');
                if (!w) {
                    w = $(this).width();
                    h = $(this).height();
                }
                if (w && h)
                    $(this).attr('src', url + w + '/' + h);
            }
        });
    }, 200);
});