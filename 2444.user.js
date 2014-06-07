// ==UserScript==
// @name          WordPress.com: Add Technorati Tags
// @namespace     http://zoolcar9.wordpress.com/
// @include       https://*.wordpress.com/wp-admin/page-new.php
// @include       https://*.wordpress.com/wp-admin/post-new.php
// @include       https://*.wordpress.com/wp-admin/page.php*
// @include       https://*.wordpress.com/wp-admin/post.php*
// @include       http://*.blogsome.com/wp-admin/page-new.php
// @include       http://*.blogsome.com/wp-admin/post-new.php
// @include       http://*.blogsome.com/wp-admin/page.php*
// @include       http://*.blogsome.com/wp-admin/post.php*
// @description	  Adds Tags button to add Technorati Tags
// ==/UserScript==

// Based on Oddiophiles Technorati Tags Bookmarklet
// at http://andrewbeacock.blogspot.com/2005/10/oddiophiles-technorati-tags.html
// and http://lorelle.wordpress.com/2005/10/14/a-tagging-bookmarklet-for-wordpress-and-wordpresscom-users/

var tagger = document.createElement('input');
tagger.type = 'button';
tagger.id = 'ed_tag';
tagger.className = 'ed_button';
tagger.value = 'Tags';
tagger.title = 'Insert Technorati Tags';
tagger.addEventListener('click', function(e) {
  var a = '';
  var t = prompt('Enter Tags without commas:','');
  if(!t) return;
  var tr = t.split(' ');
  a += '\n\n<hr /><p><b>Technorati Tags:</b> ';
  for(var i=0; i < tr.length; i++) {
    if(i > 0) a += ', ';
    a += '<a href=' + unescape('%22') + 'http://technorati.com/tags/' + tr[i] + unescape('%22') + ' rel='+unescape('%22') + 'tag' + unescape('%22') + '>' + tr[i] + '</a>';
  }
  a += '</p>';
  document.getElementById('content').value += a;
}, false);
var toolbar = document.getElementById('ed_toolbar');
toolbar.appendChild(tagger);

