// ==UserScript==
// @name           Britcoin Offer Collapser
// @namespace      http://userscripts.org/users/52197
// @author         darkip
// @version        0.11
// @description    Hides all but top 10 offers
// @include        https://britcoin.co.uk/?page=orderbook
// ==/UserScript==

/* Changelog
 * 0.11 - Hide the show link after it's used
 *
 * 0.1 - Initial Release
*/

function shrinkTable(tableIndex) {
    var tables = document.getElementsByClassName('display_data');
    var tableRows = tables[tableIndex].getElementsByTagName('tr');
    var i;

    for (i=9; i < tableRows.length; i++) {
        tableRows[i].style.display = 'none';
    }
}

function shrinkBtcForGdpTable() {
    shrinkTable(0);
}

function shrinkGdpForBtcTable() {
    shrinkTable(1);
}

function showHidden(tableIndex) {
    var tables = document.getElementsByClassName('display_data');
    var tableRows = tables[tableIndex].getElementsByTagName('tr');
    var i;

    for (i=9; i < tableRows.length; i++) {
        tableRows[i].style.display = '';
    }
    
    tables[tableIndex].parentNode.getElementsByTagName('a')[0].style.display = 'none';
}

function showBtcForGdpHidden() {
    showHidden(0);
}

function showGdpForBtcHidden() {
    showHidden(1);
}

function addDropButton(tableIndex, functionPtr) {
    var tables = document.getElementsByClassName('display_data');

    var pDropLink = document.createElement('p');
    var dropLink = document.createElement('a');
    dropLink.innerHTML = 'Show all';
    dropLink.style.cursor = 'pointer';
    dropLink.addEventListener('click', functionPtr, false);
    
    pDropLink.appendChild(dropLink);
    tables[tableIndex].parentNode.appendChild(pDropLink);
}

function addDropButtonBtcForGdp() {
    addDropButton(0, showBtcForGdpHidden);
}

function addDropButtonGdpForBtc() {
    addDropButton(1, showGdpForBtcHidden);
}

// First do BTC for GDP table
shrinkBtcForGdpTable();

// Then GDP for BTC table
shrinkGdpForBtcTable();

// Add drop down buttons for BTC for GDP
addDropButtonBtcForGdp();

// Add drop down buttons for GDP for BTC
addDropButtonGdpForBtc();