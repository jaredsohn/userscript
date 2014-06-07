// ==UserScript==
// @name Vocalocity Title Data
// @description Set Vocalocity Title tab to show callers waiting

setInterval("document.title=(document.body.innerHTML.split('x-grid3-cell-inner%20x-grid3-col-WaitingCallers')[1].split('>')[1].split('</div')[0])+'%20caller(s)%20waiting';",%2010000);

// ==/UserScript==