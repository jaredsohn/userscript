// ==UserScript==
// @name           eRepublik - All comments
// @namespace      eRepublik
// @description    Autiomaticely redirect to eRepublik article's page with all comments
// @include        http://www.erepublik.com/en/article/*/1/20#comments
// @include        http://www.erepublik.com/en/article/*/1/20
// @exclude        http://www.erepublik.com/en/article/*/1/all#comments
// @exclude        http://www.erepublik.com/en/article/*/1/all
// ==/UserScript==
window.location.href = window.location.href.replace('/1/20', '/1/all');