// ==UserScript==
// @name         DM5 WWW Redirection
// @namespace    http://userscripts.org/users/92143
// @version      0.7
// @description  Skips age check, and redirects tel.dm5.com, etc to www.dm5.com so as to speed up manga loading for users outside mainland China. Especially useful to RSS subscribers. 
// @include      /^http\:\/\/.*?\.dm5\.com\/m\d+\/$/
// @include      /^http\:\/\/.*?\.dm5\.com\/manhua\-.*?\/$/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @grant        none
// @run-at       document-start
// ==/UserScript==

var R = /^(http\:\/\/).*?\./i
var P = '$1www.'
var W = 'http://www.'
var C = 'isAdult=1;path=/;'
var u

function init() {
	u = window.location.href.toLowerCase()
}

init()
if(-1 === document.cookie.indexOf('isAdult=')) {
	document.cookie = C
	if (u.slice(0, W.length) != W) {
		u = u.replace(R, P)
	}
	window.location.href = u
}
else {
	if (u.slice(0, W.length) != W) {
		u = u.replace(R, P)
		window.location.href = u
	}
}