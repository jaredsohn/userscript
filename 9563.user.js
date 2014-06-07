// Qonfuser
// version 0.1 beta
// 2007-05-30
// Copyright (c) 2007, Dan Dorman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Qonfuser", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Qonfuser
// @namespace http://underwhelm.net/greasemonkey/
// @description shuffles the order of games in a GameFly GameQ
// @include http://www.gamefly.com/member/queue.asp
// ==/UserScript==

// add "Shuffle My GameQ" button
var updateInputs = document.evaluate(
    "//input[@name='update']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var updateInput = updateInputs.snapshotItem(0);

var updateTd = updateInput.parentNode;
updateTd.setAttribute('colspan', '4');

var shuffleTd = document.createElement('td');
updateTd.parentNode.insertBefore(shuffleTd, updateTd);
shuffleTd.setAttribute('align', 'center');
shuffleTd.setAttribute('bgcolor', '#efefdd');
shuffleTd.setAttribute('colspan', '4');
shuffleTd.setAttribute('valign', 'center');

var shuffleInput = document.createElement('input');
shuffleTd.appendChild(shuffleInput);
shuffleInput.setAttribute('border', '0');
shuffleInput.setAttribute('height', '17');
shuffleInput.setAttribute('name', 'shuffle');
shuffleInput.setAttribute('src', 'data:image/gif;base64,R0lGODlhkwARANUAAP39' +
    '%2Ffz8%2FPv7%2B%2Fz8%2B%2Fv7%2Bvr6%2Bvn5%2Bfr6%2Bfj4%2BPn5%2BPj49%2Fj49' +
    'vj3%2BPj39%2Ff4%2BPf49%2Ff3%2BPf39vT09PDw8O%2Fw8O%2Fv8PDv8Ozs7Ojo6Ofo6O' +
    'fo5%2Bfn5%2Bjn6OPj4%2BDg3%2BDf39%2Fg4N%2Fg39%2Ff4Nvb29jX19fY2NfY19fX19L' +
    'S0tLT09HR0dHS0tDR0dDQ0M%2FPz8%2FQ0JmZmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAACTABEAAAb%2FQMkIRiwaj8ikcsl' +
    'sOp%2FQqDQ5EsIA2Kx2y%2B16v%2BCweEwum7uw4XnNbrvf8C1RQVeU63h6zJ7vK2J7f3uB' +
    'flh8eQSJiV8FjY1%2BdAKSAmCOBXgRmZmQeYaeRBChoqOkpYCADqkxqaytrauqrLCutKiqs' +
    '7S1pw28vbwPwMHCwZyndLnIrkQSzM3Oz88xztIS1NDRzdbW19na29zM29%2Fg5NPZ5eREFu' +
    'sWFO7v8PEUMRX19hWn9PX6%2BPj5p%2F32AbI3oeAEegjxuYthkKHBgjHYSVx3il2%2Bg4A' +
    'enmr48OC9j%2Fc6FiRyoaTJkyhTAkIZw2TLCy9hloxJc6ZLlTJb1ox5kmdK%2F5sygQatGf' +
    'Tmz6MniWBYikGD06dQnTKFCuhpDKtOr2bdylWD1n9RvXLVKpYsVaan0J7qSvZrPg4cYsCda' +
    'zas3adEOujdy7evX74x9AYWTLjw4A6HBx%2F%2Bq7gw4sd%2BF0NO7JgyZMB9Jf%2FdTESE' +
    'ZxEhQoseTTpEDBCoQZxWnXr1atawY7tunZp27RifReDOnXu3592%2BgX8O%2FtuD8RjGPSA' +
    '%2F7qG28%2BfOiYyYTr269ev5qMfQrv3U9O3fuX8HdH0EePHhy48n3539%2BfftrXtXT786' +
    'kRP48%2Bvff8KEf%2F4ABijggATuFwOAJSSo4IIMllAggQc%2BGCARKVRo4YUYZqjhhhx26' +
    'FDhhjF8KOKIHAJCIoZEuOBCCiq26OKLKq6wwok0aqhihy3kCOOOPPboo4s5Bilkhze2mAYM' +
    'Pyap5JJMNunkk1DymIYVU1Rp5ZVYZqmldBIEAQA7');
shuffleInput.setAttribute('type', 'image');
shuffleInput.setAttribute('vspace', '20');
shuffleInput.setAttribute('width', '147');

shuffleInput.addEventListener('click', function(evt) {
    var inputs = document.evaluate(
        "//input[@name='order']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    var inputsLength = inputs.snapshotLength;
    // build an ordered array of numbers (that is, [1, 2, ..., n])
    var orders = new Array(inputsLength);
    for (var i = 0; i < inputsLength; i++)
        orders[i] = i + 1;
    // build a shuffled version of the ordered array
    var shuffledOrders = new Array();
    while (orders.length > 1) {
        var index = Math.random() * orders.length;
        shuffledOrders.push(orders.splice(index, 1));
    }
    shuffledOrders.push(orders[0]);
    // change the order values in the input elements
    for (var i = 0; i < inputsLength; i++) {
        input = inputs.snapshotItem(i);
        input.value = shuffledOrders[i];
    }

    // fire update button's event handler
    var updateInputs = document.evaluate(
        "//input[@name='update']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    var updateInput = updateInputs.snapshotItem(0);
    updateInput.click();

    // stop any other event handling
    evt.stopPropagation();
    evt.preventDefault();
}, true);