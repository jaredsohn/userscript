// -----------------------------------------------------------------------------
//
// ==UserScript==
// @description   This   script   simply  changes the background color
//                of a website from the current one to a more reader friendly 
//                pale yellow.  It wont change other  html tags ,   but   may
//                be   sufficient for text-oriented sites.   Of   course  you
//                have  to  suite  it to fit your website...
//                Date: 2008-05-22
//                Author: Benjamin Egner t h e p a l a d i n A T 
//                                       o n l i n eDOTde 
// @name          backgroundToYellow
// @namespace     http://www.dorn.org/
// @include       http://www.dorn.org/uni/sls/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------

function addGlobalStyle(css) {
    var body, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body { background-color:#FFFFCC  ! important; }');