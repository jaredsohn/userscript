// ==UserScript==
// @name           Compendium Width remover
// @namespace      compendium_inliner
// @description    Removes width from compendium entries in iframes
// @include        http://www.wizards.com/dndinsider/compendium/*
// ==/UserScript==

var detail = document.getElementById('detail');

if(detail && window.top != window && document.body.clientWidth < 590) {
  detail.style.width = 'auto';
}
