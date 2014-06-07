// ==UserScript==
// @name        youtube fix
// @namespace      http://userscripts.org/users/537548
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// @include        https://*.youtube.com/*
// @include        https://youtube.com/*
// @version     1.15
// @grant       GM_addStyle
// @copyright   d4rkph30n1x
// ==/UserScript==

// v1: make url add the uk geolocation
// v1.01: fix looping addition of geolocation
// v1.02: disallow geolocation on video listings to prevent glitch
// v1.03: re-fixed the problem with video pages gaining the tag 
// v1.1:  added functionality to avoid user home pages
// v1.11: fixed about page issue 20/20/2013
// v1.12: added channel to video redirect 04/11/2013
// v1.13: added feature to video redirect 06/11/2013
// v1.14: fixed about page issue 07/11/2013
// v1.15: fixed search page issue 11/11/2013
// v1.16: added feature to link not using "/user/", disabled ability for "featured", "feed" and "results" 26/12/2013
// v1.2: rebuilt to use the parser 
// v1.21: rebuild started to work with recent Youtube update 27/02/2014
// v1.22: testing settings added 27/02/2014



//changes the colour, could just write the colour  
//GM_addStyle("body { color: red !important; background-color: #bffaad !important; } img { border: 0; }");


var parser = document.createElement('a');
parser.href = window.location.href;

var protocol = parser.protocol; 
var host = parser.host;
var hostname = parser.hostname;
var port = parser.port;
var pathname = parser.pathname;
var hash = parser.hash;
var search = parser.search;
var change = location.href;
var url = "";
var test = 0; //0 = off, 1 = quick, 2 = full

//alert("protocol: " && protocol);
//alert("host: " && host);
//alert("hostname: " && hostname);
//alert("port: " && port);
//alert("pathname: " && pathname);
//alert("hash: " && hash);
//alert("search: " && search);


//SHARE_ON_VIDEO_END = false;

//put page to video list
if (pathname !== "/"){
    if (test !== 0){
        if (test == 1){ 
    alert(pathname)
    alert(search)}
        
        if (test == 2){
            alert("protocol: " && protocol);
            alert("host: " && host);
            alert("hostname: " && hostname);
            alert("port: " && port);
            alert("pathname: " && pathname);
            alert("hash: " && hash);
            alert("search: " && search);
        }
        }
  //  if (((pathname.indexOf('user') !== -1)||(pathname.indexOf('channel') !== -1))&&(pathname.indexOf('videos') == -1)&&(search == '')&&(pathname.indexOf('about')==-1)&&(pathname.indexOf('discussion')==-1)&&(pathname.indexOf('featured')==-1)&&(pathname.indexOf('feed')==-1))
  //  {//||(pathname.indexOf('about')==-1)||)
  //      if (pathname.indexOf('flow=grid') = -1){
  //      window.location.href = (location.href += '?flow=grid&view=0')}
  //  }

   // if ((pathname.indexOf('flow=grid')== -1) && (pathname.indexOf('view=0') == -1)&& (pathname.indexOf('videos') !== -1)){
   //    window.location.href = (location.href += '?flow=grid&view=0')
  // }
    
//make uk geotag
//    if ((parser.href.indexOf((pathname && search) !== -1))&&search !== '') {
//        if (parser.href.indexOf('&gl=UK') == -1)
//    {
//        window.location.href = (location.href +='&gl=UK')}}
    
    //CHANNEL ID BIT WORKS WITH JUST ADDING THE SEARCH TO THE END LIKE VIDEO (NO NEED TO ADD VIDEO TO THE END)
    //if with pages to not work with, inside that have if with pages to work for
    if (pathname.indexOf('/about') == -1){
    if ((pathname.indexOf('user/') !== -1)||(pathname.indexOf('channel/') !== -1)){
    if ((pathname.indexOf('featured') == -1)&&(pathname.indexOf('/about') == -1)&&(pathname.indexOf('/playlists') == -1)){
    if (pathname.indexOf('videos') == -1){
        url += '/videos'
        }
        if (search.indexOf('?flow=grid&view=0') == -1){
            url += '?flow=grid&view=0'}
        if (url !== ""){
        window.location.href += url}
       
        //BUILD PARSER HERE TO REMOVE FEATURED FROM THE END
    }}
    }
};
        
