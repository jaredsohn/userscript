// ==UserScript==
// @name           Newgrounds BBS Direct Mudkips
// @namespace      UberCream edited Knugen's code, y'all.
// @description    Adds more Mudkips.
// @include        http://*newgrounds.com/bbs/topic/*
// ==/UserScript==

var balls = document.getElementsByClassName('heading');

for (i = 0; i < balls.length; i++)
{
 if (!balls[i].id.match(/bbspost/)) continue;
 
 var bming = balls[i].getElementsByClassName('epicMudkipsBtn');
 if (bming.length > 0) continue; // Fix for Chrome (adding an extra button for each click)
 
 var insertBefoe = balls[i].getElementsByTagName('p')[1];
 var f = document.createElement('span'); 
 f.className = "btn epicMudkipsBtn";
 f.innerHTML = '<a href="#' + balls[i].id + '">Mudkips</a>';
 
 balls[i].insertBefoe(f, insertBefoe);
}