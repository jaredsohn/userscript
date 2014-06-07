// ==UserScript==
// @name        KU quick links
// @namespace   http://userscripts.org/users/484511
// @description Du can tilføje kurser til en quick link menu
// @include     https://intranet.ku.dk/Sider/*
// @version     1
// ==/UserScript==


// Insert course infomation
name1 = ''
url1  = ''

name2 = ''
url2  = ''

function makeLink(name,url) {
    return '<a href="' + url + '"><h2>' + name +'</h2></a>'
}

course1 = makeLink(name1,url1);
course2 = makeLink(name2,url2);


document.getElementById('WebPartWPQ12').firstChild.innerHTML = course1 + course2;
