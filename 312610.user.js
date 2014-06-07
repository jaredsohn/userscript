// ==UserScript==
// @name HF Star Replacer
// @namespace If you use, enjoy I guess.
// @description If you use, enjoy I guess.
// @include      hackforums.net*
// @include      *.hackforums.net*
// ==/UserScript==

var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
if(theImages[i].src.indexOf('http://x.hackforums.net/images/blackreign/starreg.png') != -1) theImages[i].src = 'http://x.hackforums.net/images/modern_bl/starreg.png';
}

var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
if(theImages[i].src.indexOf('http://x.hackforums.net/images/modern_bl/star_bg.png') != -1) theImages[i].src = 'http://gyazo.com/61247b2b731d8f72f693cd0c2e0722f1.png';
}

http://x.hackforums.net/images/modern_bl/star_bg.png
http://gyazo.com/61247b2b731d8f72f693cd0c2e0722f1.png