// ==UserScript==
// @name        2ch.so Rollback
// @description Sosach looks a little less horrid that way.
// @include     http://2-ch.so/*
// @include     https://2-ch.so/*
// @include     http://2ch.yt/*
// @include     https://2ch.yt/*
// @include     http://2ch.wf/*
// @include     https://2ch.wf/*
// @include     http://2ch.tf/*
// @include     https://2ch.tf/*
// @include     http://2ch.re/*
// @include     https://2ch.re/*
// @include     http://2ch.pm/*
// @include     https://2ch.pm/*
// @include     http://2ch.hk/*
// @include     https://2ch.hk/*
// @version     0.1.1
// @grant       none
// ==/UserScript==

function rmv(elem) {
  if (elem) {
    elem.parentNode.removeChild(elem);
  }
};

postInfoMs = document.querySelectorAll('div.postInfoM');

for each (var postInfoM in postInfoMs) {
  rmv(postInfoM);
};
