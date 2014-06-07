// ==UserScript==
// @name My Little Pony Tagger with customizable mark
// @namespace shoecream@luelinks.net
// @include http://*.endoftheinter.net*/
// @include http://boards.endoftheinter.net/*
// @include https://*.endoftheinter.net*/
// @include http://boards.endoftheinter.net/*
// ==/UserScript==

// CHANGE SYMBOL HERE
var symbol = '\u03A9';
//omega = u03A9
//star of david = \u2721
//heart = \u2661

// CHANGE COLOR HERE
//var color = "#f00"; //red
var color = "#FFE600";	//yellow

document.addEventListener('DOMNodeInserted', on_new_msg, false);

function on_new_msg (e) {
var links = document.getElementsByTagName('a');
for (var i=0; i<links.length;i++) {
var uid = (/profile\.php.*?user=(\d+)/.exec(links[i].href) || []).pop();
if (uid == 4107 || uid == 18922 || uid == 4288 || uid ==11471 || uid == 18921 || uid == 1028 || uid == 21889 || uid== 15801 || uid == 11285 || uid == 17590 || uid == 7153 ||uid == 6039 || uid == 4225 || uid == 2395 || uid == 3446 ||uid == 13481 || uid == 16147 || uid == 17774 || uid == 230|| uid == 10157 || uid == 14708 || uid == 4046 || uid ==607 || uid == 12239 || uid == 10900 || uid == 17797 || uid== 17496 || uid == 1063 || uid == 10178 || uid == 11766 ||uid == 16287 || uid == 16371 || uid == 141 || uid == 7000|| uid == 7360 || uid == 13302 || uid == 6384 || uid == 417|| uid == 18842 || uid == 19430 || uid == 16289 || uid ==2602 || uid == 13392 || uid == 13754 || uid == 11214 || uid== 9830 || uid == 13153 || uid == 4149 || uid == 3554 ||uid == 21850 || uid == 11956 || uid == 6654 || uid == 6450|| uid == 2850 || uid == 2367 || uid == 5186 || uid == 1623|| uid == 2551 || uid == 21970 || uid == 19423 || uid ==11037 || uid == 19156 || uid == 7708 || uid == 19840 || uid== 20623 || uid == 19410 || uid == 4487 || uid == 14363 ||uid == 2548 || uid == 7711 || uid == 3802 || uid == 7875 ||uid == 3960 || uid == 22028 || uid == 10105 || uid == 21033|| uid == 14295 || uid == 738 || uid == 552 || uid == 11724|| uid == 3053 || uid == 218 || uid == 7384 || uid == 1456|| uid == 6989 || uid == 2272 || uid == 11863 || uid ==3148 || uid == 9672 || uid == 3580 || uid == 20811 || uid== 2468 || uid == 19007 || uid == 10141 || uid == 12514 ||uid == 3777 || uid == 518 || uid == 1009 || uid == 5019 ||uid == 6202 || uid == 649 || uid == 3094 || uid == 15064 ||uid == 12278 || uid == 9399 || uid == 15773 || uid == 11484|| uid == 11664 || uid == 12278 || uid == 2534) {
if (links[i].nextSibling.textContent != ' ('+symbol+') ') addAfter(links[i], symbol);
}
}
}

function addAfter (obj, text) {
document.removeEventListener('DOMNodeInserted', on_new_msg, false);
span = document.createElement('span'); span.innerHTML = ' (<span style="color:' + color + '">' + text + '</span>) '; obj.parentNode.insertBefore(span, obj.nextSibling);
document.addEventListener('DOMNodeInserted', on_new_msg, false);
}