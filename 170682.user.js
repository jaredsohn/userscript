// ==UserScript==
// @name          Wikipedia random colors
// @description   Makes wikipedia easier on the eyes with random shades of colors
// @version       1.2
// @include       http://en.wikipedia.org/wiki/*
// @include       https://en.wikipedia.org/wiki/*
// @namespace     segedfsggeasfafawfasfasdfds
// @downloadURL   http://userscripts.org/scripts/source/170682.user.js
// @updateURL     http://userscripts.org/scripts/source/170682.meta.js
// @homepageURL   http://userscripts.org/scripts/show/170682
// @icon          data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%08%03%00%00%00D%A4%8A%C6%00%00%00%3CPLTE%FF%FF%FF%FF%FF%00%80%FF%80%FF%40%40%FF%C0%C0%40%FF%40%00%FF%00%40%FF%00%FF%C0%00%FF%80%00%C0%FF%C0%FF%40%00%FF%00%00%80%FF%00%C0%FF%00%FF%FF%80%FF%FF%40%FF%80%80%FF%C0%80%80%FF%40%CAqC%E9%00%00%00%09pHYs%00%01%CD%5E%00%01%CD%5E%01%B8r%93Z%00%00%00%C8IDATx%5E%95%91%C9%0E%C3%20%0CDm%B3C%D6%F6%FF%FF%B5%60K%F8%40%9D%AA%EF%92Ho4%83%00%FE%C6%BB%ADs%3Fi%C1%F9o%9Eu%2B%A5%8C%AF7%7C%C6An%9CX%7D%1B%FE%C0%0E'V%DFm%8A1%A6c%24%DC7%BFG!%8D%847%BD%24%A4B%FD%D6%FBE%06%E2D%E6%0A%F5%05Q4tB%8C%3B6%A7%9E%07%92x%A6%FF%1DxO%DF%C92%40%20%D4%3ErN%AF%05a%1E%8BBU%AF%05%EB%F3%0C%A9%05d%062%E2%1CX%12zG%D5%7C%E3%A2%05%0B%5E%2F%B1%82%95(rD0p%DB%C5%0B%04%16%2F9%22%98%9C%88%81%0B%EC%C0%C5G%B4%B9%DE%BC%60s%EA%82%81%16%98%81%00%8FP%A4_%01x%86%AC%85%0F%94m%0A%E7%D9%3DP%25%00%00%00%00IEND%AEB%60%82
// ==/UserScript==

var hex="0123456789ABCDEF";

shadeOne = hex[Math.floor(13+Math.random()*3)];

shadeTwo = hex[Math.floor(Math.random()*14)];

shadeThree = hex[Math.floor(12+Math.random()*3)];

shadeFour = hex[Math.floor(Math.random()*14)];

shadeFive = hex[Math.floor(12+Math.random()*3)];

shadeSix = hex[Math.floor(Math.random()*14)];

bgGradient="#"+shadeOne+shadeTwo + shadeThree+shadeFour + shadeFive+shadeSix;

shadeOne = hex[Math.floor(14+Math.random()*2)];

shadeTwo = hex[Math.floor(Math.random()*14)];

shadeThree = hex[Math.floor(15+Math.random()*1)];

shadeFour = hex[Math.floor(Math.random()*14)];

shadeFive = hex[Math.floor(14+Math.random()*2)];

shadeSix = hex[Math.floor(Math.random()*14)];

bgDefault = "#"+shadeOne+shadeTwo + shadeThree+shadeFour + shadeFive+shadeSix;

contentStyle=' #content{\
	background-image:     -ms-radial-gradient(center, circle farthest-corner, '+bgGradient+' 0%, '+bgDefault+' 100%) !important;\
	background-image:    -moz-radial-gradient(center, circle farthest-corner, '+bgGradient+' 0%, '+bgDefault+' 100%);\
	background-image:      -o-radial-gradient(center, circle farthest-corner, '+bgGradient+' 0%, '+bgDefault+' 100%);\
	background-image:        -webkit-gradient(radial, center center, 0, center center, 500, color-stop(0, '+bgGradient+'), color-stop(1, '+bgDefault+'));\
	background-image: -webkit-radial-gradient(center, circle farthest-corner, '+bgGradient+' 0%, '+bgDefault+' 100%);\
	background-image:         radial-gradient(circle farthest-corner at center, '+bgGradient+' 0%, '+bgDefault+' 100%);\
} ';

shadeOne = hex[Math.floor(13+Math.random()*3)];

shadeTwo = hex[Math.floor(Math.random()*14)];

shadeThree = hex[Math.floor(12+Math.random()*3)];

shadeFour = hex[Math.floor(Math.random()*14)];

shadeFive = hex[Math.floor(12+Math.random()*3)];

shadeSix = hex[Math.floor(Math.random()*14)];

bgGradient="#"+shadeOne+shadeTwo + shadeThree+shadeFour + shadeFive+shadeSix;

bgDefault = "#FFFFFF"; /*/ have to stay close to white or the top right part of the UI goes fugly. /*/

contentStyle=contentStyle+' body {\
background-image:     -ms-radial-gradient(center, circle farthest-corner, '+bgGradient+' 0%, '+bgDefault+' 100%);\
	background-image:    -moz-radial-gradient(center, circle farthest-corner, '+bgGradient+' 0%, '+bgDefault+' 100%);\
	background-image:      -o-radial-gradient(center, circle farthest-corner, '+bgGradient+' 0%, '+bgDefault+' 100%);\
	background-image:        -webkit-gradient(radial, center center, 0, center center, 500, color-stop(0, '+bgGradient+'), color-stop(1, '+bgDefault+'));\
	background-image: -webkit-radial-gradient(center, circle farthest-corner, '+bgGradient+' 0%, '+bgDefault+' 100%);\
	background-image:         radial-gradient(circle farthest-corner at center, '+bgGradient+' 0%, '+bgDefault+' 100%);\
}';

document.getElementById('mw-page-base').style.opacity="0.7";
document.getElementById('mw-head').style.opacity="0.7";

var head = document.getElementsByTagName('head')[0];
var sheet = document.createElement('style');
sheet.setAttribute('type', 'text/css');
sheet.appendChild(document.createTextNode(contentStyle));
head.appendChild(sheet);
