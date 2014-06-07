// ==UserScript==
// @version       1
// @name          Google Organizer
// @author      Mouseboyx
// @description      Makes google more organized
// @include  http://www.google.com/*
//
//
// ==/UserScript==

var logo = document.createElement("div");
logo.innerHTML = '<style type="text/css">a:active{color:red}.t{background:#d5dff3;color:#000;padding:5px 1px 4px}.bb{border-bottom:1px solid #36c}.bt{border-top:1px solid #36c}.j{width:100em}table.ra{display:none;}table.t{background-color:eee;}.bt{background-color:eee}span.a{color:black;}div.g{border-style:inset;border-width:1px;padding:10px;margin-bottom:10px;background-color:eeeeee}b{color:black;}body{}</style>';
document.body.insertBefore(logo, document.body.firstChild);

var adSidebar = document.getElementById('tads');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}

var adSidebar = document.getElementById('hpMainContent');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}

