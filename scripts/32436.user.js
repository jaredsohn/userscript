// ==UserScript==
// @name           RemoveItAll - Filefactory
// @namespace      userscripts.org/
// @description    Gets your download short, sweet, and to the point at Filefactory.com.
// @include        *filefactory.com/file/*
// ==/UserScript==

uini = document.getElementById('basicLink').href;
//alert(uini);
f = uini.indexOf('dlf/f/');
f = f + 6;
b = uini.indexOf('/b/');
b = b + 3;
h = uini.indexOf('/h/');
h = h + 3;
j = uini.indexOf('/j/');
j = j + 3;
// start temp1
b3 = b - 3
f2 = uini.substring(f,b3);
h3 = h - 3;
b2 = uini.substring(b,h3);
j3 = j - 3;
h2 = uini.substring(h,j3);
//alert('f2:' . f2 . ' b2:' . b2 . ' h2:' . h2);
document.location = 'http://filefactory.com/check/?f=' + f2 + '&b=' + b2 + '&h=' + h2;