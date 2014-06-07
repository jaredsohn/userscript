// ==UserScript==
// @name           F365 Style Bold
// @date           2011-03-03
// @description    injects a new stylesheet into forum.football365.com to tweak the visual settings and put it back to how we like it
// @include        http://forum.football365.com/*
// @include        http://forum.football365.com/
// @version	       0.17
// @source         http://userscripts.org/scripts/show/430019
// @identifier     http://userscripts.org/scripts/source/430019.user.js
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//global "p" styles
addGlobalStyle('p { font-size: 11px ! important; }');
addGlobalStyle('p { font-family: Tahoma, Verdana, "Myriad Web", Syntax, sans-serif; ! important; }');

//topic title styles + front page
addGlobalStyle('a.topictitle { font-family: Tahoma, Verdana, "Myriad Web", Syntax, sans-serif; ! important; }');
addGlobalStyle('a.topictitle { font-size: 11px ! important; }');
addGlobalStyle('a.topictitle { font-weight: bold ! important; }');
addGlobalStyle('a.forumlink { font-family: Tahoma, Verdana, "Myriad Web", Syntax, sans-serif; ! important; }');
addGlobalStyle('a.forumlink { font-size: 11px ! important; }');
addGlobalStyle('a.forumlink { font-weight: normal ! important; }');
addGlobalStyle('.row1 { background-color: #EEE ! important; }');
addGlobalStyle('th { background-image: none ! important; }'); 
addGlobalStyle('a.topictitle:visited { color: #006760 !important; }');

//courtesy of cmdrpaddy
addGlobalStyle('#datebar { display:none !important; } ');
addGlobalStyle('#pageheader { display:none;margin:0 !important ;}');
addGlobalStyle('p.gensmall{display:inline !important; }');
addGlobalStyle('td {padding: 0px !important; }');



//change post background colours
addGlobalStyle('.row1 { background-color: #F4F4F4 ! important; }');
addGlobalStyle('p.gensmall { display:inline; } ! important; }');
addGlobalStyle('.row2 { background-color: #F4F4F4 ! important; }');
addGlobalStyle('.row2 { background-color: #F4F4F4 ! important; }');
addGlobalStyle('.row1 { padding: 2px ! important; }');
addGlobalStyle('.row2 { padding: 2px ! important; }');
addGlobalStyle('.row3 { padding: 2px ! important; }');
addGlobalStyle('.quotecontent { background-color: #FAFAFA ! important; }');
addGlobalStyle('#wrapcentre {margin: 0 25px 0 !important; }');