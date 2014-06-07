// ==UserScript==
// @name           OkCupid Sortable User Compare Table
// @description    Allows you to sort the user comparison table. 
// @version        1.0.1
// @namespace      http://userscripts.org/users/24713
// @copyright      2009, David Schoonover (http://less.ly)
// @require        http://updater.usotools.co.cc/55578.js?e4x=1&update=update
// @include        http://www.okcupid.com/profile/*/compare/*
// ==/UserScript==

var 
uw = unsafeWindow,
console = uw.console, $ = uw.$, $$ = uw.$$,
head = $$('head')[0],
th_cell = $$('#compare_graphs th')[1],

extractDiff = function(row){
    return Math.abs(parseFloat(
        $(row).select('td.diff script')[0]
            .textContent
            .replace(/\s/g, '')
            .slice(23, -3)));
},
dir = -1;

var css = document.createElement('style');
css.setAttribute('type', 'text/css');
css.innerHTML = '#compare_graphs th.sortable { cursor:pointer; }';

head.appendChild(css);

th_cell.addClassName('sortable');
th_cell.addEventListener('click', function(evt){
    var rows = $$('#compare_graphs tr');
    
    rows.sort(function(a,b){
        if (!('diff' in a)) a.diff = extractDiff(a);
        if (!('diff' in b)) b.diff = extractDiff(b);
        return  ( a.diff > b.diff ?  1 * dir :
                ( a.diff < b.diff ? -1 * dir : 0 ));
    });
    
    dir = dir * -1;
    rows.each(function(row){
        row.parentNode.appendChild(row);
    });
}, false);
