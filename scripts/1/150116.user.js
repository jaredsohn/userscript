// ==UserScript==
// @name Remove Footer
// @description removes an element with id 'footer'
// @include	http://*khanacademy.org*
// ==/UserScript==

element = document.getElementById('footer');
element.parentNode.removeChild(element);