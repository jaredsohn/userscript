// ==UserScript==
// @name          Blip
// @description   -
// @version       ALPHA
// @author        Memf
// @include       http://*.blip.pl/s/*
// @include       http://blip.pl/s/*
// @include       http://*.blip.pl/dashboard/*
// @include       http://blip.pl/dashboard/*
// @include       http://*.blip.pl/dashboard
// @include       http://blip.pl/dashboard
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];

var screen_css = document.createElement('link');

screen_css.setAttribute('rel', 'stylesheet');
screen_css.setAttribute('href', 'http://www.huddletogether.com/projects/lightbox/screen.css');
screen_css.setAttribute('type', 'text/css');

var lightbox_css = document.createElement('link');

lightbox_css.setAttribute('rel', 'stylesheet');
lightbox_css.setAttribute('href', 'http://www.huddletogether.com/projects/lightbox/lightbox.css');
lightbox_css.setAttribute('type', 'text/css');

var lightbox_js = document.createElement('script');

lightbox_js.setAttribute('type', 'text/javascript');
lightbox_js.setAttribute('src', 'http://www.huddletogether.com/projects/lightbox/lightbox.js');

head.appendChild(screen_css);
head.appendChild(lightbox_css);
head.appendChild(lightbox_js);

var photo = document.getElementsByClassName('photo');
photos = photo.getElementsByTagName('a');

for(var p=0; p<photos.lenght; p++) {

	photos[p].rel = 'lightbox';
}