// ==UserScript==
// @name           MusicBrainz: ESTER sidebar links
// @namespace      http://userscripts.org/users/430716
// @description    Adds ESTER Tartu and Tallinn searches to MusicBrainz sidebar
// @include        http://*musicbrainz.org/artist/*
// @include        http://*musicbrainz.org/release/*
// @include        http://*musicbrainz.org/release-group/*
// @exclude        http://*musicbrainz.org/artist/*/edit
// @exclude        http://*musicbrainz.org/artist/*/split
// ==/UserScript==

var currentURL = document.location.href;
if (currentURL.search('artist/') != -1){ // artist pages
    if (document.getElementsByClassName('properties ')[0].getElementsByTagName('dt')[0].firstChild.nodeValue == 'Sort name:'){
        var MB_artistname = document.getElementsByClassName('properties ')[0].getElementsByTagName('span')[0].firstChild.nodeValue;
    }else{
        var MB_artistname = document.getElementsByClassName('artistheader')[0].getElementsByTagName('a')[0].firstChild.nodeValue;
    }
    MB_artistname = MB_artistname.replace(/%/g, '%25');
    MB_artistname = MB_artistname.replace(/&amp;/g, '%26');
    MB_artistname = MB_artistname.replace(/[\!\?]/g, '');
    MB_artistname = MB_artistname.trim();
    var ester_tartu_search = 'http://tartu.ester.ee/search*est/a?SEARCH=' +
    MB_artistname + '&searchscope=1&SUBMIT=OTSI';
    var ester_tallinn_search = 'http://tallinn.ester.ee/search*est/a?SEARCH=' +
    MB_artistname + '&searchscope=1&SUBMIT=OTSI';
}else if (currentURL.search('release-group/') != -1){ // release-group pages
    var MB_rgname = document.getElementsByClassName('rgheader')[0].getElementsByTagName('a')[0].firstChild.nodeValue;
    MB_rgname = MB_rgname.replace(/%/g, '%25');
    MB_rgname = MB_rgname.replace(/&amp;/g, '%26');
    MB_rgname = MB_rgname.replace(/[\!\?]/g, '');
    MB_rgname = MB_rgname.trim();
    var ester_tartu_search = 'http://tartu.ester.ee/search*est/X?SEARCH=' +
    MB_rgname + '&searchscope=1&SUBMIT=OTSI';
    var ester_tallinn_search = 'http://tallinn.ester.ee/search*est/X?SEARCH=' +
    MB_rgname + '&searchscope=1&SUBMIT=OTSI';
}else{ // release pages
    var MB_releasename = document.getElementsByClassName('releaseheader')[0].getElementsByTagName('a')[0].firstChild.nodeValue;
    MB_releasename = MB_releasename.replace(/%/g, '%25');
    MB_releasename = MB_releasename.replace(/&amp;/g, '%26');
    MB_releasename = MB_releasename.replace(/[\!\?]/g, '');
    MB_releasename = MB_releasename.trim();
    var ester_tartu_search = 'http://tartu.ester.ee/search*est/X?SEARCH=' +
    MB_releasename + '&searchscope=1&SUBMIT=OTSI';
    var ester_tallinn_search = 'http://tallinn.ester.ee/search*est/X?SEARCH=' +
    MB_releasename + '&searchscope=1&SUBMIT=OTSI';
}
var MB_sidebar = document.getElementById('sidebar');
var MB_sidebar_target = MB_sidebar.getElementsByClassName('external_links')[0];

var menuCode = new Array();
menuCode.push(
'<li style = "background-image:url(http://tartu.ester.ee/screens/favicon.ico)"><a href="' +
ester_tartu_search + '">ESTER Tartu</a></li>');
menuCode.push(
'<li style = "background-image:url(http://tallinn.ester.ee/screens/favicon.ico)"><a href="' +
ester_tallinn_search + '">ESTER Tallinn</a></li>');
var menuName = document.createElement('h2');
menuName.innerHTML = 'ESTER search'
var menu = document.createElement('ul');
menu.setAttribute('class', 'external_links');
menu.innerHTML = menuCode.join('\n');
menuCode.length = 0;

MB_sidebar.insertBefore(menu, MB_sidebar_target.nextSibling);
MB_sidebar.insertBefore(menuName, MB_sidebar_target.nextSibling);