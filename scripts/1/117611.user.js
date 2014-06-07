// ==UserScript==
// @name           PlanetSuzy Quick Search
// @version        2011-11-08
// @namespace      *
// @include        http://planetsuzy.org/*
// @include        http://*.planetsuzy.org/*
// ==/UserScript==


/* Finds the <div> element containing the options "Show Post/Show Thread" */
var searchpopup_querybox = document.getElementsByName("query");
var searchpopup_queryboxdiv = searchpopup_querybox[0].parentNode;
var searchpopup_form = searchpopup_queryboxdiv.parentNode;
var searchpopup_optionsdiv = searchpopup_queryboxdiv.nextSibling.nextSibling;

/* Prepends a new <div> element for custom options */
var newdiv = document.createElement('div');
newdiv.setAttribute("style",searchpopup_optionsdiv.getAttribute("style"));
searchpopup_form.insertBefore(newdiv,searchpopup_optionsdiv);

/* Custom option: "Search Titles Only" checkbox*/
var label_searchtitle = document.createElement('label');

var check_searchtitle = document.createElement('input');
check_searchtitle.setAttribute('type','radio');
check_searchtitle.setAttribute('value',1);
check_searchtitle.setAttribute('name','titleonly');
check_searchtitle.setAttribute('checked','checked');

newdiv.appendChild(label_searchtitle);
label_searchtitle.appendChild(check_searchtitle);
label_searchtitle.innerHTML = label_searchtitle.innerHTML + "Search Titles Only";

/* Custom option: "Search Entire Posts" checkbox*/
var check_searchpost = document.createElement('input');
check_searchpost.setAttribute('type','radio');
check_searchpost.setAttribute('value',0);
check_searchpost.setAttribute('name','titleonly');

var label_searchpost = document.createElement('label');

newdiv.appendChild(label_searchpost);
label_searchpost.appendChild(check_searchpost);
label_searchpost.innerHTML = label_searchpost.innerHTML + "Search Entire Posts";

