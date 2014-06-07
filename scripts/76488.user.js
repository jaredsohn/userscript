// ==UserScript==

// @name           Google SVG

// @namespace      Custopootimus

// @description    Replace Google Logo With Solid SVG

// @include        http://*.google.com*

// @include        http://*.google.com/*

// @exclude        http://*.google.com*/search?*

// ==/UserScript==

styles="@font-face{font-family:'Graffiti';src:url('https://7994130746496709214-a-1802744773732722657-s-sites.googlegroups.com/site/custopootimusiswatching/oldspeak/stylin_brk_regular.ttf');}#hplogo{font-family:'Graffiti';opacity:0.7;-moz-user-select:none;}";

newSS = document.createElement('link'); 

newSS.rel = 'stylesheet'; 

newSS.href = 'data:text/css,' + escape(styles);



var logo = document.getElementById('lga');

logo.innerHTML = "<div width='364' height='126' onload='window.lol&amp;&amp;lol()' style='padding-top: 26px; font-size:75pt' id='hplogo' alt='Google'><span style='color:#0860A8;'>G</span><span style='color:#FA0029;'>o</span><span style='color:#FFE500;'>o</span><span style='color:#0860a8;'>g</span><span style='color:#138f34;'>l</span><span style='color:#FA0029;'>e</span></div>";

document.documentElement.childNodes[0].appendChild(newSS); void 0