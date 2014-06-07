// ==UserScript==
// @name          4chan Banner replacer
// @namespace     4chan.org
// @description   Replaces the 4chan banner with a random user-created banner.
// @include       http://*.4chan.org/*
// ==/UserScript==

function addStyle(css) {
  GM_addStyle(css.replace(/;/g,' !important;'));
}
addStyle('img[height="100"][width="300"] { background:transparent url("http://underwater.dbmd.org/4chanbanners/banner.php") no-repeat; padding:0px 0px 100px 300px; height:0px; width:0px; border: 1px solid #000000; }');
