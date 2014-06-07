// ==UserScript==
// @name           slickdeals max out time logged
// @namespace      lecapitan
// @description    randomly browses the slickdeals page so you can easily boost your time logged for giveaways
// @include        http://*slickdeals.net/*
// ==/UserScript==

function followLink() {
    console.log('making decision');
    var decision = parseInt(Math.random()*10);
    switch (decision) {
        case 0:
        case 1:
            // Go back to slickdeals main page
            console.log('going back to main page');
            setTimeout(function() {window.location.href = 'http://slickdeals.net';}, 3000);
            break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            // Follow a random link on the page
            var links = document.getElementsByTagName('a');
            var index = parseInt(Math.random()*links.length);
            var exit = false;
            var link = "";
            while (!exit) {
                if (index < links.length - 1) {
                    link = links[index++].href;
                }
                else {
                    index = 0;
                }
                // good links
                if (link.indexOf('http://slickdeals.net/f/') >= 0   // forum links preferred
                    && link.indexOf('#') < 0                        // no bookmark links
                    && link.indexOf('goto=nextoldest') < 0          // this link has problems
                    && link.indexOf('goto=nextnewest') < 0          // this link has problems
                    && link.indexOf('?do') < 0                      // no links that do actions
                    )
                {
                    console.log('following link: ' + link);
                    setTimeout(function() {window.location.href = link;}, 3000);
                    exit = true;
                }                
            }
            break;
    }
}

var time = parseInt(Math.random()*600000+10000);
console.log('browsing in ' + time);
setTimeout(followLink, time);