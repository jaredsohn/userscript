// ==UserScript==
// @name           Pandora Center And Cleanup
// @namespace      pandora
// @description    Centers pandora on the screen and removes ads. Most of this was taken from http://userscripts.org/scripts/show/5538
// @include        http://pandora.com/*
// I only take credit for the centering of the application.
// ==/UserScript==

var tuner = document.getElementById('tuner').innerHTML;
var newBody = 
'<html>' +
'<head>' +
'<title>Pandora</title>' +
'</head>' +
'<body><div style="margin:auto; padding-top:53px; width:565px"' + tuner +
'</body>' +
'</html>';


window.addEventListener(
    'load', 
    function() { document.body.innerHTML = newBody; },
    true);