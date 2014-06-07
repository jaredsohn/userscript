// ==UserScript==
// @name        Minthings Trash Helper
// @namespace   eustache
// @author       Michael Archibald
// @description When you trash something, the amount of items to trash is 0 by default. This script places the number of that item that have as the default value. Minethings.com
// @include     http://*.minethings.com/items/trash/*
// @version     1.1
// ==/UserScript==

// Version 1.1: Fixed it so that it handles digits > 9


var firstReg = /You have \d+/,
    secondReg = /\d+/,
    fullcenter = document.getElementById('fullcenter'),
    itemCountInput = document.getElementById('ItemCount'),
    firstString = firstReg.exec(fullcenter.innerHTML)
    secondString = secondReg.exec(firstString);

itemCountInput.setAttribute('value', secondString);