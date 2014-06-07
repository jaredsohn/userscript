// ==UserScript==
// @name        BRIDGE - IE-no-more
// @namespace   http://www.unibet.com
// @include     https://unibet.myetweb.com/ETWeb10Unibet/Controller/MssObjectTree.asp*
// @include     https://unibet.myetweb.com/ETWeb10Unibet/DataPages/SalaryReviewTargetCompensation.asp*
// @version     1.1
// ==/UserScript==

try {
	document.querySelectorAll('body>span')[0].style.display='';
} catch (err) {
	// Supress errors
}