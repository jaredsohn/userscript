// ==UserScript==
// @name           Netflix Starbar
// @namespace      http://pc-pdx.com
// @description    Reinstate the Starbar for movie ratings
// @include        http://www.netflix.com/*
// ==/UserScript==



 /*------------
simple script to reinstate the missing Starbar rating system.
I don't know why they would want to remove this but here's my solution to reinstate for firefox.
i have not tested anything but my browser but hey... perhaps this will kick off something for you

dirgefanclub@gmail.com  

-----------*/

  ///This section restores the starbar
addGlobalStyle('#page-MemberHome .agMovieGrid div.starbar .stbrMaskBg,#page-MemberHome .agMovieGrid .starbar a{display:block;}');
addGlobalStyle('#page-WiHome .agMovieGrid div.starbar .stbrMaskBg, #page-WiHome .agMovieGrid .starbar a{display:block;}');
addGlobalStyle('#page-WiGenre .agMovieGrid div.starbar .stbrMaskBg, #page-WiGenre .agMovieGrid .starbar a{display:block;}');
addGlobalStyle('#page-AltGenre .agMovieGrid div.starbar .stbrMaskBg, #page-AltGenre .agMovieGrid .starbar a{display:block;}');
addGlobalStyle('#page-WiAltGenre .agMovieGrid div.starbar .stbrMaskBg, #page-AltGenre .agMovieGrid .starbar a{display:block;}');
addGlobalStyle('#page-NewReleases .agMovieGrid div.starbar .stbrMaskBg, #page-NewReleases .agMovieGrid .starbar a{display:block;}');
addGlobalStyle('#page-Genre .agMovieGrid div.starbar .stbrMaskBg, #page-Genre .agMovieGrid .starbar a{display:block;}');

addGlobalStyle(' .paneMerchMoviesContent .agMovieGrid div.starbar .stbrMaskBg, .paneMerchMoviesContent .agMovieGrid .starbar a{display:block;}');
 
 
 
 
  //These are the not interested buttons
addGlobalStyle('#page-MemberHome  .agMovieGrid a.rvnorec{top:20px;}');
addGlobalStyle('#page-WiHome  .agMovieGrid a.rvnorec{top:20px;}');
addGlobalStyle('#page-WiGenre  .agMovieGrid a.rvnorec{top:20px;}');
addGlobalStyle('#page-AltGenre  .agMovieGrid a.rvnorec{top:20px;}');
addGlobalStyle('#page-WiAltGenre  .agMovieGrid a.rvnorec{top:20px;}');
addGlobalStyle('#page-NewReleases  .agMovieGrid a.rvnorec{top:20px;}');
addGlobalStyle('#page-Genre  .agMovieGrid a.rvnorec{top:20px;}');
addGlobalStyle('#page-Genre .agMovieGrid a.rvnorec, #page-AltGenre .agMovieGrid a.rvnorec, #page-SubGenre .agMovieGrid a.rvnorec, #page-WiHome .agMovieGrid a.rvnorec, #page-MemberHome .agMovieGrid a.rvnorec, #page-WiRecentAdditions .agMovieGrid a.rvnorec, #page-WiRecentAdditionsGallery .agMovieGrid a.rvnorec, #page-NewReleases .agMovieGrid a.rvnorec, #page-NewReleasesGallery .agMovieGrid a.rvnorec, #page-WiGenre .agMovieGrid a.rvnorec, #page-WiAltGenre .agMovieGrid a.rvnorec, #page-WiHD .agMovieGrid a.rvnorec, #page-WiTV .agMovieGrid a.rvnorec, #page-WiKids .agMovieGrid a.rvnorec, #page-WiComedy .agMovieGrid a.rvnorec, #page-WiContentPage .agMovieGrid a.rvnorec, .paneMerchMoviesContent .agMovieGrid a.rvnorec{top:20px;}');

addGlobalStyle('#page-WiSearch  .agMovieGrid a.rvnorec{top:20px;}');


addGlobalStyle('  .agMovieGrid a.rvnorec{top:20px;}');

 
  //The [Play] + [Add] buttons look funny, let's expand them full width:
addGlobalStyle('.mltBtn-s40 .btn-o1, .mltBtn-s40 .btn-o2{width:100%;}');
 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}