// ==UserScript==
// @name           AddClubPravoslavie
// @namespace      http://userscripts.org/users/useridnumber
// @include        http://clubs.dir.bg/*
// ==/UserScript==

var tds = document.getElementsByTagName('tr');


var br = document.createElement('br');
tds[18].childNodes[0].appendChild(br);


var to4ka = document.createElement('font');
to4ka.innerHTML = '•••';
tds[18].childNodes[0].appendChild(to4ka);


var link = document.createElement('a');
link.innerHTML = 'Православие';
link.href = 'http://clubs.dir.bg/postlist.php?Board=pravoslavie';


tds[18].childNodes[0].appendChild(link);
