// ==UserScript==
// @name       SSFW Reddit
// @namespace  http://reddit.com/r/leagueoflegends/
// @version    0.6
// @description  Super Safe for Work Reddit
// @include    http://reddit.com/r/*
// @include    http://www.reddit.com/r/*
// @copyright  2013+, nxg
// ==/UserScript==

var TOOLBAR_HTML = '<span class="separator">|</span><span><a href="#" onclick="var sidebar = document.getElementById(\'customSidebar\');if (sidebar.style.display === \'none\') { sidebar.style.display = \'block\'; } else { sidebar.style.display = \'none\'; } return false;">Show/Hide Sidebar</a></span>';

var headerbl = document.getElementById('header-bottom-left');
if (headerbl) {
    //headerbl.parentNode.removeChild(headerbl);
    headerbl.removeChild(headerbl.getElementsByTagName('a')[0]);
    headerbl.removeChild(headerbl.getElementsByTagName('span')[0]);
    headerbl.style.background = '#252525';
}

var sidebar = document.getElementsByClassName('side')[0];
sidebar.id='customSidebar';
sidebar.style.display='none';

var headerbr = document.getElementById('header-bottom-right');
headerbr.innerHTML += TOOLBAR_HTML;

var footer = document.getElementsByClassName('footer-parent')[0];
footer.style.background = '#252525';

var textAreaComment = document.getElementsByName('text')[0];
textAreaComment.style.background = '#FFFFFF';