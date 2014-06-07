// ==UserScript==
// @id             GoogleAutoTranslate
// @name           Google Auto Translate
// @version        0.1
// @author         Victor Itkin
// @description    Implements the Google auto translate like in Google Chrome.
// @include        http*  
// @require        http://translate.google.com/translate_a/element.js    
// @run-at         window-load
// ==/UserScript==

d = document;
b = d.body;

o = d.createElement('script');
o.setAttribute('src','//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
o.setAttribute('type','text/javascript');

b.appendChild(o);

v = b.insertBefore(d.createElement('div'), b.firstChild);
v.id = 'google_translate_element';
v.style.display = 'none';

p = d.createElement('script');
p.text = 'function googleTranslateElementInit(){new google.translate.TranslateElement({pageLanguage:""}, "google_translate_element");}';
p.setAttribute('type', 'text/javascript');

b.appendChild(p);
