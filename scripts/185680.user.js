// ==UserScript==
// @name       rightmove.co.uk  full screen width
// @description Shows rightmove.co.uk search results at full screen width
// @updateURL  https://gist.github.com/mtrl/7861280/raw/tampermonkey-rightmove-full-screen.js
// @version    1.0.1
// @match      http://www.rightmove.co.uk/property-for-sale/property*
// @match      http://www.rightmove.co.uk/property-to-rent/property/*
// @copyright  2013, Mark Williams
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

$(function() {
    // on update the main image
    $('#mainphoto').load(function() {
        // Make main image full screen
	    showMainImageFullSize();
    });
});

function showMainImageFullSize() {
	$('#mainphoto').attr('src',$('#mainphoto').attr('src').replace('_max_620x414',''));   
}

addGlobalStyle('#sitewrapper { width: 100%; }');
addGlobalStyle('#mainimagecontainer #mainphoto { max-width: 100%; min-width: 0%; max-height: 10000px; width: 100%; }');
addGlobalStyle('#mainimagecontainer { width: 100%; height: auto; }');
addGlobalStyle('#propertydetails #gallerycontainer #gallery #mainimagecontainer #controlpanel { top: 797px; }');
addGlobalStyle('#controlpanel { width: 100%; }');
addGlobalStyle('#thumbnailcontainer #thumbnailcarousel { width: auto; } ');
addGlobalStyle('body.propertyDetails .secondarycontent { width: 20%; }');
addGlobalStyle('body.propertyDetails .primarycontent { width: 80%; }');