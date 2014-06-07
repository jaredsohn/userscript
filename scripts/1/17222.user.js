// ==UserScript==
// @name          OutwarFaster raid results
// @namespace     http://www.brucestockwell.net/
// @description   Faster raid results
// @include       http://*.outwar.com/*
// ==/UserScript==

function emoFasterResults(doc)
{
    // check
    if (doc){
        // get span elements
        var spans = doc.getElementsByTagName('span');
        // check
        if (spans && spans.length > 0){
            // loop through all spans
            for (var i = 0; i < spans.length; i++){
                // check for id attribute
                if ( spans[i].hasAttribute('id') ){
                    // check id
                    if ( left(spans[i].getAttribute('id'), 8) == 'message_' ){
                        // show
                        spans[i].setAttribute('style', 'visibility: visible;');
                    }
                }
            }
        }
    }
}