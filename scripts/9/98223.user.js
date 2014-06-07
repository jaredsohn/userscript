// ==UserScript==
// @name           F365 Style Changer
// @date           2011-03-01
// @description    injects a new stylesheet into forum.football365.com to tweak the visual settings and put it back to how we like it
// @include        http://forum.football365.com/*
// @include        http://forum.football365.com/
// @version	   0.11
// @source         http://userscripts.org/scripts/show/98117
// @identifier     http://userscripts.org/scripts/source/98117.user.js
// @require http://sizzlemctwizzle.com/updater.php?id=98117
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
addGlobalStyle('a.topictitle { font-family: Arial, Verdana, sans-serif; ! important; }');
addGlobalStyle('a.topictitle { font-size: 12px ! important; }');
addGlobalStyle('a.topictitle { font-weight: normal ! important; }');
addGlobalStyle('a.forumlink { font-family: Tahoma, Verdana, "Myriad Web", Syntax, sans-serif; ! important; }');
addGlobalStyle('a.forumlink { font-size: 11px ! important; }');
addGlobalStyle('a.forumlink { font-weight: normal ! important; }');
addGlobalStyle('.row1 { background-color: #EEE ! important; }');
addGlobalStyle('th { background-image: none ! important; }'); 
addGlobalStyle('a.topictitle:visited { color: #006699; ! important }');
addGlobalStyle('a.topictitle:visited { text-decoration: underline ! important ; }');


//change post background colours
addGlobalStyle('.row1 { background-color: #F4F4F4 ! important; }');
addGlobalStyle('.row2 { background-color: #F4F4F4 ! important; }');
addGlobalStyle('.row2 { background-color: #F4F4F4 ! important; }');
addGlobalStyle('.row1 { padding: 2px ! important; }');
addGlobalStyle('.row2 { padding: 2px ! important; }');
addGlobalStyle('.row3 { padding: 2px ! important; }');
addGlobalStyle('.quotecontent { background-color: ##FAFAFA ! important; }');