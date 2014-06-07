// ==UserScript==
// @name       League of Legends Shop Script
// @namespace  http://bugs.gamersinc.org/
// @include    https://store.*boosts*
// @version    0.1
// @description  enter something useful - Ehm no pls, dont make me do this.
// @copyright  2012+, You
// ==/UserScript==

// initiate
function init() {
    while (true) {
        var threedayboost = document.getElementById('unlock_item_boosts_2');
        if (typeof (threedayboost) != 'undefined' && threedayboost != null) {
            threedayboost.click();
            break;
        }
    }
    while (true) {
        var buybutton = document.getElementById('buy_with_rp_link');
        if (typeof (buybutton) != 'undefined' && buybutton != null) {
            buybutton.click();
            break;
        }
    }
}

// starting code in 5 seconds
setTimeout(init, 5000);