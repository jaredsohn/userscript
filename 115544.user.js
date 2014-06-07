// ==UserScript==
// @name           DS Refresh
// @namespace      Stu
// @description    Refreshes DS
// ==/UserScript==


if (document.getElementById('counts').innerHTML.length > 9 && document.getElementById('counts').innerHTML.length < 16) {
setTimeout("document.title='DS READY!!!!'", 1000);
alert('Titles!');
}
