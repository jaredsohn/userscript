// ==UserScript==
// @name           Bungie Page BETA
// Version	   1.0.1
// @author         PKF 647
// @description    DemoTestpage
// @Created        May-19-2009
// @namespace      http://www.bungie.net/Beta/
// @include        http://*.bungie.net/Beta/
// @include        http://*.bungie.net/Beta
// ==/UserScript==
/*
 * This script is a community open source project,
 * If you change or modify this script please site resources and previous scripters.
 * Not giving credit makes people mad, play nice.
*/

var openPage1='http://www.google.com/';
var openPage2='http://www.bungie.net/';
var newBody =
'<html>' +
'<head>' +
'<title>Test page</title>' +
'</head>' +
'<body>' +

//script i wish to run embed in html

'<input type="button" value="Open New Window" onclick="window.open(\''+openPage1+'\'); ">' +
'<input type="button" value="Open New Window" onclick="window.open(\''+openPage2+'\'); ">' +

// end of script embed in html

'</body>' +

'</html>'; 
window.addEventListener(
    'load',
    function() { document.body.innerHTML = newBody; },
    true);
document.body.innerHTML=newBody;
