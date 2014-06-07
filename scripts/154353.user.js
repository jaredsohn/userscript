// ==UserScript==
// @name            imgurNoLazy
// @description     Disable lazyloading on imgur albums (imgur.com/a/*)
// @version         20121217185226
// @author          opsomh
// @namespace       http://userscripts.org/users/465520/scripts
// @include         http://imgur.com/a/*
// ==/UserScript==

(function(){
    var main = function(){
        var images = $('img.unloaded', '#image-container');
        if(images.length){
            var album = Imgur.Album.getInstance();
            images.each(function() {
                album.loadImage($(this));
            });
        }
    }
    
    var script = document.createElement('script');
    script.textContent = '(' + main.toString() + ')();';
    document.body.appendChild(script);
})();
