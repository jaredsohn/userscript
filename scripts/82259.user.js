// ==UserScript==
// @name        frse
// @description frse
// ==/UserScript==

var scripts = document.getElementsByTagName('script');
for (var i = 0; i < scripts.length; i++) {
if (/xformscheck\.js$/.test(scripts[i].src)) {
    scripts[i].parentNode.removeChild(scripts[i]);
}
}
document.getElementById('maincontent').style.display = 'block';
allOk();