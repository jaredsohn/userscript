// version 0.1
// 2009-02-04
//
// ==UserScript==
// @name          Filmweb_Downloader
// @description   Add a "download" link to Filmweb.pl pages
// @include      http://*.filmweb.pl/
// @include      http://www.filmweb.pl/*
// ==/UserScript==

function get_film_title()
{

var filmtitle = .*[A-Za-z].*</span>;
filmtitle = str.replace(/</spam>/," ");



}


onload: function add_download_link()
{

var link = 'http://thepiratebay.org/search/'+filmtitle+'/0/7/200';
newDiv = document.createElement('div');
newDiv.innerHTML = '<div><a href="'+link+'">Download this video for free</a></div>';
newDiv.insertBefore(film-content);
}