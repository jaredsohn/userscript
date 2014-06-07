// ==UserScript==
// @name           UseNetServer Login Script Clean-Up
// @namespace      http://jobson.us
// @include        http://www.usenetserver.com/en/index.php?
// ==/UserScript==

document.getElementById('username').removeAttribute('onblur');
document.getElementById('username').removeAttribute('onfocus');
document.getElementById('username').value = '';

document.getElementById('password').removeAttribute('onblur');
document.getElementById('password').removeAttribute('onfocus');
document.getElementById('password').value = '';

