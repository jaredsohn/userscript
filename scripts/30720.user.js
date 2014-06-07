// Twitter Search script
// version 0.2
// 2008-09-19
// Copyright (c) 2008, Dash Labs
// Author David Stone - http://twitter.com/builtbydave
// Author Josh Russell - http://twitter.com/joshr
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
// select "Twitter Search", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Twitter Search
// @namespace     http://dashlabs.com/
// @description   Adds a search field to the Twitter interface
// @include       http://twitter.com/home
// ==/UserScript==


var side = document.getElementById('side');
var section_header = side.getElementsByTagName('div')[0];
var sections = side.getElementsByTagName('div');

/* build div container */
var main = document.createElement('div');
main.className = 'section';
main.style.padding = '0px 0px 15px 0px';

var sh = document.createElement('div');
sh.className = 'section-header';

var a = document.createElement('a');
a.href = 'http://search.twitter.com/advanced';
a.className = 'section-links';
a.innerHTML = 'advanced';

var h1 = document.createElement('h1');
h1.innerHTML = 'Search';

var form = document.createElement('form');
form.action = 'http://search.twitter.com/search';
form.id = 'searchForm';
form.method = 'get';
form.name = 'searchForm';

var se = document.createElement('div');
se.id = 'searchEntry';

var input = document.createElement('input');
input.autosave = 'com.twitter.search';
input.size = 11;
input.id = 'searchBox';
input.name = 'q';
input.placeholder = 'Enter your query';
input.results = 10;
input.type = 'search';


var submit = document.createElement('input');
submit.type = 'submit';
submit.value = 'Search';
submit.style.margin = '0px 0px 0px 13px';

sh.appendChild(a);
sh.appendChild(h1);
se.appendChild(input);
se.appendChild(submit);
form.appendChild(se);
main.appendChild(sh);
main.appendChild(form);

/* insert */
sections[4].parentNode.insertBefore(main, sections[4]);
