// ==UserScript==
// @name       Thetachan Constriction Tool
// @namespace  http://0-chan.ru/
// @version    0.1
// @description  enter something useful
// @match      http://www.0-chan.ru/*
// @copyright  2012+, Snivy
// ==/UserScript==

var injectDestination = "img_global.css";

function injectCSS(rule, order) {
    iter(document.styleSheets, function(sheet) {
        if(sheet.href && sheet.href.search(ku_boardspath+'/css/')===0 && sheet.href.split('/css/')[1].split('?')[0] === injectDestination) {
            if(rule instanceof Array) {
                iter(rule, function(ro) {
                    sheet.insertRule(ro[0], ro[1]);
                })
            }
            else { sheet.insertRule(rule, order); }
        }
    });
}

function iter(array, callback) {
    if(typeof array !== 'object') return callback(array);
    var i=0, len = array.length;
    for ( ; i < len ; i++ ) {
        callback(array[i]);
    }
}

injectCSS('.thumb:not([alt^="full"]) {max-width: 200px; height: auto;}', 0);