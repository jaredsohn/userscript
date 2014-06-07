// ==UserScript==
// @id             docs.djangoproject.com-9dd4f750-b21b-4ccc-b707-6d3394f0ab1d@scriptish
// @name           Django Documentation Full Path Reference
// @version        1.0
// @namespace      
// @author         Denis Gonsiorovsky <dns.gnsr@gmail.com>
// @description    This script modifies Django Documentation site to display full resource path on mouse over its title.
// @include        https://docs.djangoproject.com/*
// @run-at         document-end
// ==/UserScript==

var classes = [
    'class',
    'function',
    'attribute',
    'method'
];

function hoverTitle() {
    this.innerHTML = this.getAttribute('data-fulltitle');
}

function leaveTitle() {
    this.innerHTML = this.getAttribute('data-shorttitle');
}

var dls = document.getElementsByTagName('dl');
var dt, tt;

for (var i = 0, dl; dl = dls[i]; i++) {
    if (classes.indexOf(dl.getAttribute('class')) != -1) {
        if (dt = dl.getElementsByTagName('dt')[0]) {
            if (tt = dt.getElementsByClassName('descname')[0]) {
                tt.setAttribute('data-fulltitle', dt.id);
                tt.setAttribute('data-shorttitle', tt.innerHTML);
                tt.addEventListener('mouseover', hoverTitle);
                tt.addEventListener('mouseout', leaveTitle);
            }
        }
    }
}