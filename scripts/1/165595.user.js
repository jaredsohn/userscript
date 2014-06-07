// ==UserScript==
// @name        Kittyfy
// @namespace   http://userscripts.org/users/392674
// @description Replaces all images in a website for kitties
// @include     *
// @version     0.3
// ==/UserScript==



var onlyKitties = false
var sites = [
    "http://placekitten.com/",
    "http://placedog.com/",
    "http://placeape.com/",
    "http://placebear.com/"
];

var last = 0;

function randomChoose(arr){
    pos = Math.floor((Math.random()*arr.length-1)+1);
    return arr[pos];
};

function modify(start){
    var images = document.getElementsByTagName("img");
    for (var i=start; i<images.length; i++){
        img = images[i];
        width = img.width;
        height = img.height;
        if (onlyKitties){
            img.src = "http://placekitten.com/" + width + "/" + height;
        } else {
            img.src = randomChoose(sites) + width + "/" + height;
        };
        last++;
    };
};

modify(0);
setInterval(function(){modify(last); console.log("last " + last);}, 5000);