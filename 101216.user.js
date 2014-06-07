// ==UserScript==
// @name        Toggle
// @author      Dither
// @namespace    http://userscripts.org/scripts/show/101216
// @include      http://*site
// @run-at      document-start
// ==/UserScript==

function createCookie(a, b, c) {
    if (c) {
        var d = new Date;
        d.setTime(d.getTime() + c * 24 * 60 * 60 * 1E3);
        c = "; expires=" + d.toGMTString()
    } else c = "";
    document.cookie = a + "=" + b + c + "; path=/"
}

function readCookie(a) {
    a = a + "=";
    for (var b = document.cookie.split(";"), c = 0; c < b.length; c++) {
        for (var d = b[c]; d.charAt(0) == " "; ) d = d.substring(1, d.length);
        if (d.indexOf(a) == 0) return d.substring(a.length, d.length)
    }
    return null
}

document.addEventListener('DOMContentLoaded', function () {
var INFO_SELECTORS = '.group_main p, .group_statbox, .edition_info';
var SEARCH_TAGS_SELECTORS = '#browse_nav_tags, #browse_search';
var CONTAINER_SELECTOR = '#browse_nav_right';
var COOKIE_DAYS = 3000;

function toggleVisibility(block_name) {
    var selectors;
    switch (block_name) {
        case 'info':
            selectors = INFO_SELECTORS;
            break;
        case 'tags_search':
            selectors = SEARCH_TAGS_SELECTORS;
            break;
        default:
    }
    var nodes = document.querySelectorAll(selectors);
    if (!nodes[0]) return;
    if(nodes[0].getAttribute('style') && nodes[0].getAttribute('style') == 'display:none!important') {
        if (readCookie('enable_' + block_name) != '1') createCookie('enable_' + block_name, '1', COOKIE_DAYS);
    } else {
        if (readCookie('enable_' + block_name) != '0') createCookie('enable_' + block_name, '0', COOKIE_DAYS);
    }
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].getAttribute('style') == 'display:none!important') nodes[i].setAttribute('style', 'display:block!important');
        else nodes[i].setAttribute('style', 'display:none!important');
    }
}

if (readCookie('enable_info') == '0') toggleVisibility('info');
if (readCookie('enable_tags_search') == '0') toggleVisibility('tags_search');

var container = document.querySelector(CONTAINER_SELECTOR);
if (container) {
    var span = document.createElement('span');
    span.appendChild(document.createTextNode('Toggle '));
    
    var a = document.createElement('a');
    a.setAttribute('href', 'javascript:void(0)');
    a.appendChild(document.createTextNode('info'));
    a.onclick = function () {
        toggleVisibility('info')
    };
    span.appendChild(a);
    
    span.appendChild(document.createTextNode(' | '));
    
    a = document.createElement('a');
    a.setAttribute('href', 'javascript:void(0)');
    a.appendChild(document.createTextNode('tags & search'));
    a.onclick = function () {
        toggleVisibility('tags_search')
    };
    span.appendChild(a);
    
    container.appendChild(document.createElement('br'));
    container.appendChild(span);
}

function fixPages(doc) {
    var i, nodes = doc.querySelectorAll(INFO_SELECTORS);
    if (readCookie('enable_info') == '0') {
        for (i = 0; i < nodes.length; i++) {
            nodes[i].setAttribute('style', 'display:none!important');
        }
    }
    
    nodes = doc.querySelectorAll(SEARCH_TAGS_SELECTORS);
    if (readCookie('enable_tags_search') == '0') {
        for (i = 0; i < nodes.length; i++) {
            nodes[i].setAttribute('style', 'display:none!important');
        }
    }
}

var addFilterHandler = function() { setTimeout(function(){ AutoPagerize.addDocumentFilter(fixPages); },300); }
if (window.AutoPagerize) addFilterHandler()
else window.addEventListener('GM_AutoPagerizeLoaded', addFilterHandler, false);

window.addEventListener('AutoPatchWork.DOMNodeInserted', function (e) { fixPages(e.target); }, false);

}, false);