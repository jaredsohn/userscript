// ==UserScript==
// @name           RemoveStuff
// @namespace      jhgjewgtueg89gr290r29082r73hf627
// @include        http://www.kongregate.com/*
// @include        http://*.kongregate.com/*
// ==/UserScript==


function XXX(css){var h,s;h=document.getElementsByTagName('head')[0];
if(!h)return;s=document.createElement('style');s.type='text/css';s.innerHTML=css;
h.appendChild(s);
}
XXX('div#footer{display:none;}');
