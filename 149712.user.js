// ==UserScript==
// @name          Facebook Dislike
// @namespace     Facebook Dislike
// @description   Adds a fake "Hate" button to facebook posts.
// @author        luckycadow
// @include       http*://*.facebook.com/*
// @version       1.1
// ==/UserScript==



function hateify(buttons) {
    
    // Build our hate button
    var hate_button = document.createElement('a');
    hate_button.appendChild(document.createTextNode('Hate'));
    hate_button.className = 'uiLinkButton hateButton';
    hate_button.setAttribute("onclick", "this.innerText=='Hate' ? this.innerText='Unhate' : this.innerText='Hate'");
    
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