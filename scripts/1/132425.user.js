// ==UserScript==
// @name         Mongodb.org: Readable Documentation
// ==/UserScript==

if (/http:\/\/www.mongodb.org\/display\/DOCS/.test(window.location.href)){

	document.getElementsByClassName('split')[2].style.width = "1500px"
	document.getElementsByClassName('pagecontent')[0].style.width = "65%"
	document.getElementsByClassName('noprint')[0].style.width = "35%"

}