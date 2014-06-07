// ==UserScript==
// @name Blizzard Diablo III Profile Linker to D3Progress
// @namespace http://userscripts.org/scripts/show/149512
// @version 1.0.1
// @description Adds a new Tab on D3 Profile Pages that links to D3Progress
// @include /(http:\/\/)*.{2}\.battle\.net\/d3\/en\/profile\/(.+\/.*)/
// @copyright 2012, public domain
// ==/UserScript==
var tabMenu = document.querySelector('.tab-menu'),
strD3PTab = '<li xmlns="http://www.w3.org/1999/xhtml" class="menu-d3p">',
d3pUri = document.location.href.replace(/(http:\/\/)*.{2}\.battle\.net\/d3\/en\/profile\/(.+\/.*)/, 'http://www.diabloprogress.com/hero/$2').toLowerCase();
var eleHeroName = document.querySelector('#profile-body .header-2.name'), isOnProfile = (eleHeroName===null), isOnToon = !isOnProfile, heroName = (isOnToon)?eleHeroName.textContent:'';
d3pUri = (isOnProfile?d3pUri.replace(/hero/, 'player'):d3pUri.replace(/\/hero\/(.+)\/(hero)\/(\d+)/, '/hero/$1/'+heroName+'/$3'));
strD3PTab += '<a href="'+d3pUri+'#d3p_uc" target="_blank" class="" title="View in D3Progress.com" alt="View in D3Progress.com">';
strD3PTab += '<span>';
strD3PTab += '<img src="http://www.diabloprogress.com/favicon.ico#d3p_uc" width="16px" height="16px" style="position: relative;top: 4px;padding-right: 7px;"/>';
strD3PTab += 'D3Progress';
strD3PTab += '</span></a></li>';
tabMenu.innerHTML = tabMenu.innerHTML+strD3PTab;