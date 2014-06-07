// ==UserScript==
// @name          Icefilms Homepage Enhancer
// @namespace     http://brillicity.com
// @description	  Makes the Icefilms home page more convenient by allowing you to get to the shows you want to watch faster.
// @include       http://www.icefilms.info/
// ==/UserScript==

//Focus on the search bar
var search = document.getElementById('search');
search.focus();

//Change a few styles on the 'favroties' list and make it visible
var o = document.getElementById('playlist');
o.style.width = "60%";
o.style.left = "15%";
o.style.display = "block";
o.style.opacity = "1.0";