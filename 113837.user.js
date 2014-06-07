// ==UserScript==
// @name          Cherry Credits No Autoplay
// @namespace     http://localhost
// @description   Prevents autoplay.
// @include       http://forum.cherrycredits.com/forum/topics/view*
// @version		1
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/autoplay=1/g,"autoplay=0");
document.body.innerHTML = document.body.innerHTML.replace(/autostart="true"/g,'autostart="false"');
document.body.innerHTML = document.body.innerHTML.replace(/volume="100"/g,'volume="0"');
document.body.innerHTML = document.body.innerHTML.replace(/shockwave\-sound/g,'404');

return;