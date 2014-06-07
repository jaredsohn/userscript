// ==UserScript==
// @name                 catalog visibility
// @description Places a link to the catalog after the page count, and after [Return] in threads in the same way it appears on 4chan
// @icon                   http://static.4chon.net/favicon.gif
// @include             http://wizardchan.org/*
// @exclud              http://wizardchan.org/mod.php?/*
// ==/UserScript==

var currentBoardID = $('h1').text().replace(/^\/(.+)\/.+/, "$1");

catalog_url = 'http://wizardchan.org/' + 'catalog_' + currentBoardID + '.html';

pages = document.getElementsByClassName('pages')[0];

if (pages != undefined) {

var link = document.createElement('a');
link.href = catalog_url;
link.textContent = 'Catalog';

pages.appendChild(document.createTextNode(' '));
pages.parentNode.insertBefore(link, pages.nextSibling);

link.style.color = 'red';
link.style.background = '#D6DAF0';
link.style.display = 'inline';
link.style.padding = '8px';
link.style.borderright = '1px solid';
link.style.borderbottom = '1px solid';
}



else if (pages == undefined && currentBoardID != null) {

boardlist_bottom = document.getElementsByClassName('boardlist bottom')[0];

var link1 = document.createElement('a');
link1.href = 'http://wizardchan.org/' + 'catalog_' + currentBoardID + '.html';;
link1.textContent = ' [Catalog]';
link1.style.color = 'red'

pi = boardlist_bottom.parentNode;

pi.insertBefore(link1, boardlist_bottom);
}