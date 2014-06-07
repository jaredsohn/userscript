//
// Written by Faisal Deshmukh
// Script Version: 1.2
//
//
// ==UserScript==
// @name          Clean washingtonPost.com
// @namespace	  http://userscripts.org/scripts/show/7939
// @description   Fixes various washingtonpost.com annoyances.
// @include       http://www.washingtonpost.com/*
// @include       http://*.washingtonpost.com/*
// ==/UserScript==


var targetElement = document.getElementById('wrapperMainRight');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}

function addGlobalStyle(css) {
    var head, style;

    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'screen, tv, projection, print';
    style.innerHTML = css;
    head.appendChild(style);
}
//alert('boogeyman is here');

addGlobalStyle( '#wrapperInternalCenter {width: 150%; text-align: justify  ! important }'  	//stretches the article by increasing width of a known div id
);

//addGlobalStyle('#wrapperInternalCenter {color: green; width: 150%  ! important }'  	//stretches and changes color of the article.