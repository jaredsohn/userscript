// ==UserScript==
// @name           Blocking Comments on The Record
// @namespace      http://userscripts.org/users/294280
// @description    Stops TheRecord.com from displaying comments on news stories.
// @include        http://www.therecord.com/*
// ==/UserScript==
  function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

addGlobalStyle('.td_tops_ratingscomments { display: none !important; }');