// ==UserScript==
// @name       dolc link fixer
// @namespace  http://use.i.E.your.homepage/
// @include      http://www.dolc.de/forum.php?mod=viewthread*
// ==/UserScript==


var str = document.body.innerHTML
str = str.replace(/德国亚马逊/g, 'amazon.de');
str = str.replace(/amazon.德/g, 'amazon.de');


str = str.replace(/a[\u4e00-\u9fa5]+mazon/g, 'amazon');
str = str.replace(/am[\u4e00-\u9fa5]+azon/g, 'amazon');
str = str.replace(/ama[\u4e00-\u9fa5]+zon/g, 'amazon');
str = str.replace(/amaz[\u4e00-\u9fa5]+on/g, 'amazon');
str = str.replace(/amazo[\u4e00-\u9fa5]+n/g, 'amazon');

document.body.innerHTML = str;