// ==UserScript==
// @name        IDG Gallery
// @namespace   Shimmy
// @description Change IDG Gallery to not reload page on next/prev image
// @include     http://www.idg.se/
// @version     1
// @grant       none
// ==/UserScript==
var img = 0;

// Unbind default nav 
$( ".galleria-image-nav-right" ).unbind();
$( ".galleria-image-nav-left" ).unbind();

// Bind new events
$(".galleria-image-nav-right").click(function(e){
    img = img + 1;
    if (img > (imageGalleryData.length-1) ) {
        img = 0;
    }
    change(img);
    e.preventDefault();
});

$(".galleria-image-nav-left").click(function(e){
    img = img - 1;
    if (img < 0) {
       img = imageGalleryData.length -1
    }
    change(img);
    e.preventDefault();
});

function change(img) {
    $(".galleria-image img").attr('src', imageGalleryData[img].image);
    $(".galleria-info-description").html(imageGalleryData[img].description);
    $(".galleria-counter").html((img+1)+" / "+(imageGalleryData.length));
}
