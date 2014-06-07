// ==UserScript==
// @name           Blocket Skippa Län
// @namespace      blocket
// @description    Skippar sidan du får välja län på och går direkt till Hela Sverige
// @include        https://www.blocket.se/
// @include        https://blocket.se/
// @include        https://www.blocket.se/varmland*
// @include        http://www.blocket.se/
// @include        http://blocket.se/
// @include        http://www.blocket.se/varmland*
// ==/UserScript==

if(location.href == 'https://www.blocket.se/'){
	window.location.replace('https://www.blocket.se/hela_sverige');
}else if(location.href == 'http://www.blocket.se/'){
	window.location.replace('http://www.blocket.se/hela_sverige');
}else if(location.href == 'http://www.blocket.se'){
	window.location.replace('http://www.blocket.se/hela_sverige');
}else if(location.href == 'https://www.blocket.se'){
	window.location.replace('https://www.blocket.se/hela_sverige');
}