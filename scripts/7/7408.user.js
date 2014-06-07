// ==UserScript==
// @name          Fix Oregon Live Permalinks
// @namespace     http://aaronhockley.com
// @description   Fixes a bug with permalinks on the Oregonian's Oregon Live website so that they work properly in non-IE browsers
// @include       http://oregonlive.com/newslogs/*
// @include       http://www.oregonlive.com/newslogs/*
// ==/UserScript==

window.location.href = window.location.href.replace("#", "##");