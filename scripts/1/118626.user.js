// ==UserScript==
// @name           Stopiit
// @description    dorks in Lite Mode
// @include        http://pokefarm.org/lite/pokemon?code=*
// @include        http://pokefarm.org/lite/user?code=*
// @version        .90
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==
// list of buttons
var theButtons = document.getElementsByTagName('button');
var found = false;
var TargetSink = $("table a:contains(' ')");
var keepgoing = true

if (TargetSink.length) {
    window.location.href = TargetSink[0].href;
} else if (theButtons.length == 0) {
    // no buttons found, get the submit button and click it
    var theSubmit = single("//input[@type='submit']");
    if (theSubmit) {
        theSubmit.click();
    } 
////else {
////        newsearch();
////    }
} else {
    if (document.body.textContent.indexOf('food') != -1) {
        theButtons[0].click();
    } else {
        for (i = 0; i < theButtons.length; i++) {
            // get item attribute and look for it elsewhere on the page
            var theAttribute = theButtons[i].textContent.match(/\((.*)\)/)[1];
            if (document.body.textContent.toUpperCase().indexOf(theAttribute) != document.body.textContent.toUpperCase().lastIndexOf(theAttribute) && !found) {
                found = true;
                theButtons[i].click();
            }
        }
    }
}

function newsearch() {
    location.href = 'http://pokefarm.org/lite/random?searchagain';
}

// xpath function to get single node with specific attributes
function single() {
    if (arguments.length == 2 && !arguments[1]) return;
    return document.evaluate("." + arguments[0], arguments[1] || document.body, null, 9, null).singleNodeValue;
}