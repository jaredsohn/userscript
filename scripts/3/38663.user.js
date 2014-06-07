// ==UserScript==
// @include http://woogiworld.com/*
// @include http://*.woogiworld.com/*
// @name Test
// ==/UserScript==


var x = document.getElementById('playerDiv');
x.innerHTML = x.innerHTML.replace("quality=\"high\"","quality=\"low\"");