// ==UserScript==
// @name           IMDB Rapidshare and Megaupload Download
// @namespace      none
// @include        http://www.imdb.com/title/*
// ==/UserScript==

// based on http://blog.persistent.info/2006/05/smart-google-reader-subscribe-button.html

  GM_addStyle('#JGRSmain { position: fixed; z-index: 32767; top: 0; right: 0; padding: 0 0 0 20px; min-height: 20px; background: 2px 2px url("chrome://browser/skin/Search-glass.png") no-repeat; }');
  GM_addStyle('#JGRSmain:hover { padding: 0; }');
  GM_addStyle('#JGRSmain > div { display: none; }');
  GM_addStyle('#JGRSmain:hover > div { display: block; padding: 1px 0; background: #f8f8f8; -moz-border-radius: 0 0 0 10px; border: solid #ccc; border-width: 0 0 1px 1px; }');
  GM_addStyle('#JGRSmain a { display: block; margin: 4px 0; padding: 0 10px; font-family: "Verdana"; font-size: 11px; line-height: 14px; font-weight: normal; color: #669; text-decoration: underline; text-align: left; background: #f8f8f8; border: 0; }');
  GM_addStyle('#JGRSmain a:hover { color: #f66; }');

  var JGRSmain = document.createElement('div');
  JGRSmain.setAttribute('id', 'JGRSmain');
  document.body.appendChild(JGRSmain);

  var JGRSfeeds = document.createElement('div');
  JGRSmain.appendChild(JGRSfeeds);
  
    JGRSfeeds.innerHTML += '<a href="http://www.google.com/search?q=' + encodeURIComponent(document.location.href + ' megaupload.com/?d=') + '">Search Megaupload</a>';
    JGRSfeeds.innerHTML += '<a href="http://www.google.com/search?q=' + encodeURIComponent(document.location.href + ' rapidshare.com/files/') + '">Search Rapidshare</a>';


