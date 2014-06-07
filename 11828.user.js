// ==UserScript==
// @name          Technorati Tag Generator for Wordpress
// @namespace     http://nicopi.wordpress.com/
// @include       http://*.wordpress.com/wp-admin/page-new.php
// @include       http://*.wordpress.com/wp-admin/post-new.php
// @include       http://*.wordpress.com/wp-admin/page.php*
// @include       http://*.wordpress.com/wp-admin/post.php*
// @description	  A simple Technorati Tag Generator for Wordpress blog hosted by Wordpress.com
// ==/UserScript==

// Based on Lorelle script
// and http://lorelle.wordpress.com/2005/10/14/a-tagging-bookmarklet-for-wordpress-and-wordpresscom-users/

var tagger = document.createElement('input');
tagger.type = 'button';
tagger.id = 'ed_tag';
tagger.className = 'ed_button';
tagger.value = 'Technorati Tags';
tagger.title = 'Inserisci i tag di Technorati';
tagger.addEventListener('click', function(e) {
  var a = '';
  var t = prompt('Inserisci i tag senza utilizzare la virgola:','');
  if(!t) return;
  a+= '\n\n<p>Technorati: '
  var tr = t.split(' ');
  for(var i=0; i < tr.length; i++) {
    if(i > 0) a += ', ';
    a += '<a href=' + unescape('%22') + 'http://technorati.com/tags/' + tr[i] + unescape('%22') + ' rel='+unescape('%22') + 'tag' + unescape('%22') + '>' + '<img src='+ unescape('%22') + 'http://static.technorati.com/static/img/pub/icon-utag-16x13.png' + unescape('%22') + ' border=' + unescape('%22') + '0' + unescape('%22') + '> ' + tr[i] + '</a>';
  }
  a += '</p>';
  document.getElementById('content').value += a;
}, false);
var toolbar = document.getElementById('ed_toolbar');
toolbar.appendChild(tagger);
