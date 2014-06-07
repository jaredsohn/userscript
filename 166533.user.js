// ==UserScript==
// @name         Facebook Dislike Button
// @namespace    http://userscripts.org/users/zackton
// @description  Adds a 'Dislike' button to Facebook
// @include      *.facebook.com/*
// @updateURL    http://userscripts.org/scripts/source/166533.meta.js
// @run-at       document-end
// @grant        none
// @version      1.1.6
// ==/UserScript==

function hateify(buttons) {
    
    // Build our hate button
    var hate_button = document.createElement('a');
    hate_button.appendChild(document.createTextNode('Dislike'));
    hate_button.className = 'uiLinkButton hateButton';
    hate_button.setAttribute("onclick", "this.innerText=='Dislike' ? this.innerText='Un-dislike' : this.innerText='Dislike'");
    
    // Clone the dot seperator
    var dot = buttons[0].childNodes[1].cloneNode(true);
    
    // Add the hate button to the existing sets
    for (var i=0; i<buttons.length; i++) {
        
// Bail if we run into already processed elements
        if (buttons[i].classList.contains('hateified')) {
            break;
        }

        // Insert the new button and seperator
        buttons[i].insertBefore(hate_button.cloneNode(true), buttons[i].children[1]);
        buttons[i].insertBefore(dot.cloneNode(true), buttons[i].children[2]);
        buttons[i].classList.add("hateified");
        
    }
    
}

// Do it
hateify(document.getElementsByClassName('UIActionLinks'));

// Keep running to process any ajax loaded posts
setInterval(function() { hateify(document.getElementsByClassName('UIActionLinks')); }, 3000);