// ==UserScript==
// @name           FA Image Scaler
// @namespace      ffffairyaffinity
// @version        0.07
// @description    Scales the regular FA image view to fit the browser window.
// @include        *://www.furaffinity.net/view/*
// @include        *://www.furaffinity.net/full/*
// @grant          none
// ==/UserScript==

// Attempt to get some information on the page.
var i = document.getElementById('submissionImg');
var normalWidth = 0;
var normalHeight = 0;
var ready = false; // If the image's dimensions are loaded, it's ready
var scale = true; // Toggle using the "Resize" link at the top
var isWebkit = 'webkitRequestAnimationFrame' in window;

// Resizes the image.
var resize = function () {
    var cw = document.body.clientWidth - 60;
    var ch = window.innerHeight;

    if (i.height != 0 && !ready && isWebkit) {
        normalHeight = i.height;
        normalWidth = i.width;
        ready = true;
    }

    if (ready && scale && cw > 60 && ch > 60) {
        if (cw/ch > normalWidth/normalHeight) {
            i.height = ch;
            i.width = normalWidth * i.height / normalHeight;
        } else {
            i.width = cw;
            i.height = normalHeight * i.width / normalWidth;
        }
    } else if (ready) {
        i.width = normalWidth;
        i.height = normalHeight;
    }
};

// Buh Firefox
var getReady = function () {
    if (!ready) {
    	normalWidth = i.width;
    	normalHeight = i.height;
        ready = true;
    }
    resize();
}

// A way to turn it off
var toggleScale = function () {
    scale = !scale;
    resize();
};

if (i != null) { // Don't do anything if the submission isn't an image
    document.body.onresize = resize;
    i.onload = getReady;    // Futile if the image is already cached
    if (isWebkit) {
        resize(); // Futile if the image isn't already cached
    }
    i.scrollIntoView();
    
    // Resize link button thingy
    var listElement = document.createElement("li");
    document.body.getElementsByTagName("ul")[0].appendChild(listElement);
    var link = document.createElement("a");
    listElement.appendChild(link);
    link.href = "#";
    var text = document.createTextNode("Resize");
    link.appendChild(text);
    link.onclick = toggleScale;
    
    // Override image's onclick
    i.onclick = toggleScale;
    i.title = "Click to change between normal view and scaled view"
}