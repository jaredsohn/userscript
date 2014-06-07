// ==UserScript==
// @name           flickr Download Link
// @version        1.0
// @namespace      http://www.jameswigley.com
// @copyright      2011 (original script by Samuel Essig http://userscripts.org/scripts/show/94007 )
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

var url;
var images = document.getElementsByTagName('img');

for(var i=0; i< images.length;i++){
   if(images[i].alt == 'photo'){
       url = images[i].src;
       break;
   }
}

var li = document.createElement('li');
var a = document.createElement('a');
var span = document.createElement('span');
li.appendChild(a);
a.appendChild(span);
document.getElementById('button-bar').insertBefore(li,document.getElementById('button-bar-options').parentNode);

a.setAttribute('class','Butt ywa-track');
a.setAttribute('href',url);
span.appendChild(document.createTextNode('Download'));

