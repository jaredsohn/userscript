// ==UserScript==
// @name           ODST 4 Me
// @description    Adds New ODST Pages to bungie for non beta members
// @namespace      http://www.bungie.net/
// @include        http://*.bungie.net/*
// @include        http://*.bungie.net
// ==/UserScript==

if (document.location.href.match(/bungie.net\/FireFight\/ODST/)) {
var newBody =
'<html>' +
'<head>' +
'<title>ODST Fire Fight</title>' +
'</head>' +
'<body text="#FFFFFF">' +
'<body>' +
'<body bgcolor="#000000">' +
'<p align="center">' +
'<img border="0" src="http://www.1up.com/media/03/7/4/4/lg/256.jpg" width="1018" height="1667"></p>' +
'</body>' +
'</html>';
window.addEventListener(
    'load',
    function() { document.body.innerHTML = newBody; },
    true);
}
if (document.location.href.match(/bungie.net\/Records\/ODST/)) {
var newBody1 =
'<html>' +
'<head>' +
'<title>ODST Records</title>' +
'</head>' +
'<body text="#FFFFFF">' +
'<body>' +
'<body bgcolor="#000000">' +
'<p align="center">' +
'<img border="0" src="http://www.1up.com/media/03/7/4/4/lg/257.jpg" width="995" height="1402"></p>' +
'</body>' +
'</html>';
window.addEventListener(
    'load',
    function() { document.body.innerHTML = newBody1; },
    true);
}
if (document.location.href.match(/bungie.net\/Stats\/ODST/)) {
var newBody2 =
'<html>' +
'<head>' +
'<title>ODST Stats</title>' +
'</head>' +
'<body text="#FFFFFF">' +
'<body>' +
'<body bgcolor="#000000">' +
'<p align="center">' +
'<img border="0" src="http://www.1up.com/media/03/7/4/4/lg/254.jpg" width="995" height="1102"></p>' +
'</body>' +
'</html>';
window.addEventListener(
    'load',
    function() { document.body.innerHTML = newBody2; },
    true);
}
if (document.location.href.match(/bungie.net\/Leaderboards\/ODST/)) {
var newBody3 =
'<html>' +
'<head>' +
'<title>ODST Leaderboards</title>' +
'</head>' +
'<body text="#FFFFFF">' +
'<body>' +
'<body bgcolor="#000000">' +
'<p align="center">' +
'<img border="0" src="http://www.1up.com/media/03/7/4/4/lg/255.jpg" width="984" height="906"></p>' +
'</body>' +
'</html>';
window.addEventListener(
    'load',
    function() { document.body.innerHTML = newBody3; },
    true);
}