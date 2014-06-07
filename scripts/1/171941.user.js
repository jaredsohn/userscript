// ==UserScript==
// @name        Contract Plus
// @description Replace that disturbing bell with funny sketches
// @namespace   https://userscripts.org/users/konachan
// @include     *://plus.google.com/*
// @grant       none
// @version     0.1
// @licence     MIT
// ==/UserScript==

// Strings and corresponding pictures to show.
// The list can be freely adjusted.
// Name "Gertruda" is a reference to dirty.ru.

var gertrudas = [
    ["Contract?", "https://si0.twimg.com/profile_images/3351136790/28821dcdd19b09a05cff23e91efc2445.png"],
    ["Так, что тут у нас?", "http://i.imgur.com/D1Kpqvn.gif"],
    ["Homu-homu-homu", "http://goo.gl/4XQm5"],
    
    // Add your lines here.
];

// Class names of label and image in notifications. Sasuga Google.
var labelClass = "CogtQ";
var imageClass = "gLEXYd";

function handler(label, image) {

    // Choose gertruda to show.
    var gertruda = gertrudas[Math.floor(Math.random() * gertrudas.length)];
    var gertrudaLabel = gertruda[0];
    var gertrudaImage = gertruda[1];
    
    // Show gertruda.
    label.innerHTML = gertrudaLabel;
    image.src = gertrudaImage;
    image.onclick = null;
    
}

// The following code checks the DOM for changes and invokes
// handler function whenever it is changed.
// More info on mutations can be found here:
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

var target = document.querySelector("body");
var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
        
            // Find label and image in DOM.
            var label = mutation.target.getElementsByClassName(labelClass)[0];
            var image = mutation.target.getElementsByClassName(imageClass)[0];
            
            // Invoke handler function if they exist.
            if (label && image) {
                handler(label, image);
            }
            
        });
    });
    
observer.observe(target, { childList: true, subtree: true });
