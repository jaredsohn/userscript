// ==UserScript==
// @name        Mturk logo change
// @namespace   Money GIF
// @author      copyman
// @include     https://www.mturk.com/mturk/dashboard*
// @version     0.1
// @grant       none
// ==/UserScript==

var interval = 0.25; // in seconds

// DON'T EDIT BELOW ///////////////////

function imgReplace() {
    var images = document.getElementsByTagName('img'),
        len = images.length, img, i;
    for (i = 0; i < len; i += 1) {
        img = images[i];
        img.src = img.src.replace('https://images-na.ssl-images-amazon.com/images/G/01/webservices/mechanical-turk/logoAI3.gif', 'http://www.reactiongifs.com/wp-content/uploads/2013/12/money.gif');
        img.src = img.src.replace('Original2.gif', 'Replacement2.gif');
    }
}

setInterval(imgReplace, interval * 1000);