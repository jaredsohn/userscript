// ==UserScript==
// @name           Skandiabanken fixer
// @namespace      ib.ath.cx
// @include        https://secure.skandiabanken.no/SKBSECURE/*
// ==/UserScript==

document.getElementById('topContent').id = 'topContentNew';
document.getElementById('tabMenu').id = 'tabMenuNew';
var content = document.getElementById('topContentNew');
var menu = document.getElementById('topMenuNew');
content.style.position = 'absolute';
content.style.right = '0px';
