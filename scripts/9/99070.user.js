// ==UserScript==
// @name          Gifs to Kittens
// @description   Replaces .gif images with pictures of adorable kittens. Helpful for people who find animated gifs headache-inducing. Note: replaces _all_ gifs, regardless of animation.
// @require          http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @include       *
// ==/UserScript==

function kill_gifs() {
    var images=document.getElementsByTagName("img");
    for(var i=0;i<images.length;i++){
        image = images[i];
        if (image.src.match(/gif/)) {
            var oldurl = image.src;
            image.src = "http://placekitten.com/" + image.width + "/" + image.height + "/";
            image.title = oldurl;
        }
    }
};

$("img").click(function() {
    if (this.title.match(/http/)) {
        var temp = this.src;
        this.src = this.title;
        this.title = temp;
    }
});

kill_gifs();