// ==UserScript==
// @name          Search form for Fefe's blog
// @namespace     http://blog.fefe.de
// @description   Adds a searchform to Fefe's blog
// @license       GPL version 2; http://www.gnu.org/licenses/gpl-2.0.html
// @include       http://blog.fefe.de*
// @include       https://blog.fefe.de*
// @exclude       http://blog.fefe.de/faq.html
// @exclude       https://blog.fefe.de/faq.html
// @exclude       http://blog.fefe.de/impressum.html
// @exclude       https://blog.fefe.de/impressum.html
// @version       1.0
// ==/UserScript==


var form = document.createElement('form');
form.method = 'GET';
form.action = document.location.protocol + '//blog.fefe.de';
if (document.getElementsByTagName('h3')[0]) {
	form.style.float = 'right';
}
var input = document.createElement('input');
input.name = 'q';
form.appendChild(input);
var submit = document.createElement('input');
submit.type = 'submit';
form.appendChild(submit);
var node = document.getElementsByTagName('h3')[0] || document.getElementsByTagName('p')[0];
node.appendChild(form);