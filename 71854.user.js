// ==UserScript==
// @name           Userscripts.org Install script from any tab
// @author         1nfected
// @version        0.4.2
// @description    Adds an Install button on all the tabs!
// @namespace      1nfected

// @include        http://userscripts.org/scripts/review/*
// @include        https://userscripts.org/scripts/review/*
// @include        http://userscripts.org/scripts/reviews/*
// @include        https://userscripts.org/scripts/reviews/*
// @include        http://userscripts.org/reviews/*
// @include        https://userscripts.org/reviews/*
// @include        http://userscripts.org/scripts/discuss/*
// @include        https://userscripts.org/scripts/discuss/*
// @include        http://userscripts.org/topics/*
// @include        https://userscripts.org/topics/*
// @include        http://userscripts.org/scripts/fans/*
// @include        https://userscripts.org/scripts/fans/*
// @include        http://userscripts.org/scripts/issues/*
// @include        https://userscripts.org/scripts/issues/*
// @include        http://userscripts.org/scripts/edit/*
// @include        https://userscripts.org/scripts/edit/*
// @include        http://userscripts.org/scripts/edit_src/*
// @include        https://userscripts.org/scripts/edit_src/*
// @include        http://userscripts.org/scripts/versions/*
// @include        https://userscripts.org/scripts/versions/*
// ==/UserScript==

(function() {

try { if(self != window.top) return; }
catch(e) { return; }

var detailsNode = document.getElementById('details');
if(!detailsNode) return;

var link = detailsNode.getElementsByTagName('a')[0];
if(!link) return;
var scriptid = link.href.match(/\d+/);

var install = document.createElement('div'); install.id = 'install_script';
install.innerHTML = '<a class="userjs" href="http://userscripts.org/scripts/source/' + scriptid + '.user.js">Install</a>'+
                    '<a title="how to use greasemonkey" class="help" href="/about/installing">How do I use this?</a>';

detailsNode.parentNode.insertBefore(install,detailsNode);

})();