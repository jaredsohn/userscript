// ==UserScript==
// Version 2007-05-10
// By Sarreq Teryx
// @name           MySpace Maximizer
// @namespace      here and now
// @description    Makes the most out of your browser size on MySpace, after you've removed the garbage boxes.  You can also now view your MyS home page at as low as 800x600 if you really want
// @include        http://home.myspace.com/index.cfm?fuseaction=user*
// @incluse        http://bulletin.myspace.com/index.cfm?fuseaction=bulletin.read*
// ==/UserScript==

// home page
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div#wrap { width: 96% !important; min-width: 744px !important;}');
addGlobalStyle('div#home_infoBar { width: 9em !important; height: 38ex !important; line-height: 7pt !important; }');
addGlobalStyle('div#home_infoBar, div#home_InfoBar>h5, div#home_InfoBar>a { font-size: 6pt !important; }');
addGlobalStyle('div.mar5>div.left {width: 25% !important; text-align: center !important; height: auto !important; }');
addGlobalStyle('div.clear {height: 0ex !important; }');


// Bulletins
addGlobalStyle('div#bulletinmain { width: 96% !important; min-width: 744px !important;}');
addGlobalStyle('table#bestest_table_ever { width: 100% !important; }');
addGlobalStyle('table#betterb { width: 100% !important; }');

var hib=document.getElementById('home_infoBar');
var hpi=document.getElementById('home_profileInfo');
hpi.appendChild(hib);
hpi.style.position='relative';
hib.style.position='absolute';
hib.style.bottom=-15;
hib.style.right=0;
hib.style.backgroundColor='white';