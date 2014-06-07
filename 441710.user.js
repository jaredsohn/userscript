// ==UserScript==
// @name       GitHub Clolorblind friendly
// @namespace  http://sigbrt.tumblr.com/
// @version    1.0
// @description  Makes GitHub pull requests color blind frindly
// @match      https://github.com/*
// @copyright  2014+, Christian Bodnar
// @grant None
// ==/UserScript==

function gitHubChanger(css) {
  var head,
    style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return ;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// For the +/- numbers at the top of the diff
var added='#24346B'
var deleted='#C69853'

// For behind added or removed code in the diff
var added_background='#CDD5EE'
var deleted_background='#EEE1CD'

gitHubChanger('span.diffstat .diffstat-bar i.plus { color: ' + added + '; } \n \
span.diffstat .diffstat-bar i.minus { color: ' + deleted + '; } \n \
span.diffstat .lines-added { color: ' + added + '; } \n \
span.diffstat .lines-deleted { color: ' + deleted + '; }\n \
.highlight .gi { background-color: ' + added_background + '; }\n \
.highlight .gd { background-color: ' + deleted_background + '; }\n \
.gd .diff-line-num { background-color: ' + deleted_background + '; }\n \
.gd .diff-line-code { background-color: ' + deleted_background + '; }\n \
.gi .diff-line-num { background-color: ' + added_background + '; }\n \
.gi .diff-line-code { background-color: ' + added_background + '; }\n \
.highlight .gi .x { background-color: ' + added_background + '; }\n \
.highlight .gd .x { background-color: ' + deleted_background + '; }');