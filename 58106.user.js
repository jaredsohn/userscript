// ==UserScript==
// @name           Block Sig Boon
// @namespace      http://userscripts.org/users/109102
// @description    Blocks Signitures
// @include        http://www.booncontrol.com/*
// ==/UserScript==

(function () {
var tags = document.getElementsByTagName('div');
  for (var key in tags)
    with (tags[key])
      if (getAttribute('class') == 'signature') style.display = 'none';
})();

(function () {
var tags = document.getElementsByTagName('img');
  for (var key in tags)
    with (tags[key])
      if (getAttribute('class') == 'avatar') style.display = 'none';
})();



