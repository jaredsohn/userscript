// ==UserScript==
// @name          Cake 4-Color Hand Histories
// @description   Make Cake poker hand histories default to 4-color deck
// @include       http://cakepoker.com/HandHistory/?*
// @include       http://cakepoker.com/HandHistory/default.aspx?*
// ==/UserScript==

(function() {
// This works but causes a refresh which is annoying
//    if(window.location.href.search('FourColorDeck') == -1)
//        window.location.href = window.location.href.replace(/%3d$/, '%3d&FourColorDeck=True');
    // This replaces cards without a refresh :)
    var history = document.getElementById('TableContainer');
    var historyStr = history.innerHTML.replace(/Cards\/d_/g, 'Cards/blue_D_');
    history.innerHTML = historyStr.replace(/Cards\/c_/g, 'Cards/green_C_');
})();