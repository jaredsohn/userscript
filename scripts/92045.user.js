// ==UserScript==
// @name           Mamabar
// @namespace      crazydoglady
// @description    Remove mamabar
// @include        http://www.neopets.com/*
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

addGlobalStyle('div.brand-mamabar {display:none;}div.brand-mamabar-wrapper {display:none;} a.brand-mamabar-logo {display:none;} a.brand-mamabar-logo  img { display:none;} ul.brand-mamabar-list{display:none;} ul.brand-mamabar-list li{display:none;}ul.brand-mamabar-list a{display:none}ul.brand-mamabar-list a:hover{display:none;}ul.brand-mamabar-list a.brand-mamabar-active{display:none;}ul.brand-mamabar-list a.brand-mamabar-active:hover{display:none;}li.brand-mamabar-more-link * {display:none;}a.brand-mamabar-more-a {display:none;}li.brand-mamabar-more-link-hover a.brand-mamabar-more-a {display:none;}a.brand-mamabar-more-a span {display:none;}li.brand-mamabar-more-link-hover a.brand-mamabar-more-a span {display:none;}li.brand-mamabar-more-link div.brand-mamabar-more-wrapper ul {display:none;}li.brand-mamabar-more-link div.brand-mamabar-more-wrapper {display:none;}li.brand-mamabar-more-link-hover div.brand-mamabar-more-wrapper {display:none;}li.brand-mamabar-more-link div.brand-mamabar-more-wrapper li {display:none;}');