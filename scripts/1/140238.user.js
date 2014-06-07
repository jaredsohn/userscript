// ==UserScript==
// @name           2Shared AutoStarter
// @namespace      https://userscripts.org/users/457713
// @description    Automatically starts the download when you open a file page in 2Shared.
// @include        *.2shared.com/file/*
// @version        0.1
// @downloadURL    https://userscripts.org/scripts/source/140238.user.js
// @updateURL      https://userscripts.org/scripts/source/140238.meta.js
// ==/UserScript==

var buttonContainer = document.getElementById('fileinfo');
var button = buttonContainer.getElementsByTagName('a');

//click the link
button[0].click();