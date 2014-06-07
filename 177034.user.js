// ==UserScript==
// @name          Annoying Red Block
// @description   Troll your non-techie friends by installing this script on their browsers.
// @version       1.0.1
// @match http://*/*
// ==/UserScript==

var div = document.createElement('div');
div.style.backgroundColor = 'rgb(255,0,0)';
div.style.height = '100px';
div.style.width = '100px';
div.style.position = 'absolute';
div.style.zIndex = '1000000';

document.body.addEventListener('mousemove', function (event) {
  div.style.top = event.clientY + 'px';
  div.style.left = event.clientX + 'px';
});

document.body.insertBefore(div, document.body.firstChild);