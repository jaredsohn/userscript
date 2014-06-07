// ==UserScript==
// @name           disable mixi mowa
// @namespace      http://d.hatena.ne.jp/youpy/
// @include        http://mixi.jp/*
// ==/UserScript==

with(unsafeWindow) {
  removeEventListener("load", set_mac_style, false);
}