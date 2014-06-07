// ==UserScript==
// @name          ice blue google skin
// @namespace      google.com
// @description    Google light blue skin. changes the background color, on mouse over links change color, different text colors, best with the google preview add-on for firefox. Made using Bloody_Angel's black google skin.
// @include        http://www.google.*/*
// @include        http://www.google.*.*/*
// @exclude        http://www.google.com/reader/*
// @exclude        http://www.google.com/firefox/*
// ==/UserScript==


x = 'body {background-color: #FAFCFF !important; font-family:segoe ui !important;}';
x += 'a{color:#0066FF !important;}';
x += 'a:hover{color:#06588F !important;}';
x += 'span.a{color:#06588F !important;}';
x += 'td,.n a,.n a:visited{color:#002E7D !important;}';

x += '#modules .yui-b, #modules,.yui-gb, #gbar, #guser  { background-color:white !important;}';
x += '.w_ind, .tld{ color:white !important;}';

x += '#footer_promos {display: none !important;}';

GM_addStyle(x);
