// ==UserScript==
// @name           Gist to gistdoit.com
// @description    Adds button to send gist to gistdoit.com
// @include        http*://gist.github.com/*
// ==/UserScript==

(function(global, link, img) {
  var loc = global.location;
  global.$('.title .path').append(
   '<a href="' + link + loc.pathname +
   '"><img alt="GistDoIt!" class="button" src="' +
   loc.protocol + '//' + img + '"></a>');
})(
  unsafeWindow,
  'http://www.gistdoit.com',
  'dl.dropbox.com/u/121500/gistdoit_github_button.png'
);