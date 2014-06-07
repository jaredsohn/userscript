// ==UserScript==
// @name        flickr-metadatr
// @namespace   flickr-metadatr
// @description shows some metadata in single photo view (without the need to scroll) in the new flickr design
// @include     http://www.flickr.com/*
// @version     0.1
// @modified    May 26, 2013
// @grant       none
// @run-at      document-end
// ==/UserScript==

var h = window.innerHeight;
var w = window.innerWidth;
var p = 60;

var mainphotocontainer = document.getElementById('main-photo-container');

var photo = document.getElementById('photo');
photo.style.height = 50+h*p/100+'px';
photo.style.width = 50+w*p/100+'px';
photo.style.backgroundColor = '#d0d0d0';

mainphotocontainer.style.height = h*p/100+'px';
mainphotocontainer.style.width = w*p/100+'px';

//var sx = w*p/100;
//var sw= w*(100-p)/100;

//var sidebar = document.getElementById('sidebar');
//sidebar.style.position = 'absolute';
//sidebar.style.left = sx+'px';
//sidebar.style.top = '100px';
//sidebar.style.width = sw+'px';

//var sidebarcontexts = document.getElementById('sidebar-contexts');
//sidebarcontexts.style.float = 'left!important';
//sidebarcontexts.style.position = 'relative';
//sidebarcontexts.style.left = '-20px';

