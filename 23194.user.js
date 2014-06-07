// ==UserScript==
// @name         Small 4-Color Deck for Pokerhand.org/CardRunners
// @description	 Displays hand histories on Pokerhand.org/cardrunners.com with a 4 small color deck
// @include      http://*.pokerhand.org/?*
// @include      http://pokerhand.org/?*
// @include      http://*cardrunners.com/*
// ==/UserScript==
//

// Acknowledgement:
// This is a crude adaptation of the "4-Color Deck for Pokerhand.org" script
// http://userscripts.org/scripts/show/9236
// It was updated to supported the hand history display of the CardRunners HH 
// converter and modified to use a smaller set of 4-color cards.

// match properly for pokerhand.org and cardrunners.com
var srcpath = window.location.host;
origpath = srcpath + '/images/';
var origpathCR = srcpath + '/members/hand_history/playingcards-images/';
var origpathCR2 = srcpath + '/members/images/hhtools/';

// directory with replacement cards
//var newpath = 'i146.photobucket.com/albums/r245/HAY_GUYS/ps_alt_4c/';
var newpath = 'i250.photobucket.com/albums/gg244/pokkrap/pokhand/';
var newpathCR = 'i250.photobucket.com/albums/gg244/pokkrap/pok1/';


var allImgs, thisImg;
allImgs = document.evaluate(
    '//img',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allImgs.snapshotLength; i++) {
    thisImg = allImgs.snapshotItem(i);
    if (thisImg.src.match(origpath)) {
        // make sure we only change URLs for cards
        // since there are other things in /images/
        if (thisImg.src.match('club') || thisImg.src.match('diam') ||
            thisImg.src.match('heart') || thisImg.src.match('spade')) {
            thisImg.src = thisImg.src.replace(origpath, newpath);
            // my cards are PNGs instead of GIFs
            // (change as needed)
            thisImg.src = thisImg.src.replace('gif', 'png');
        }
    } else if (thisImg.src.match(origpathCR)) {
            thisImg.src = thisImg.src.replace(origpathCR, newpathCR);
            thisImg.src = thisImg.src.replace('gif', 'png');
    } else if (thisImg.src.match(origpathCR2) && thisImg.src.match('spacer_white.gif')) {
            thisImg.src = thisImg.src.replace(origpathCR2, newpathCR);
            thisImg.src = thisImg.src.replace('gif', 'png');
    }
}
