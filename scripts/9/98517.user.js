// ==UserScript==
// @name          No C++ or C# in a C Google search
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Automatically throw out C++ or C# links in a C Google search
// @license       GPL version 2; http://www.gnu.org/licenses/gpl-2.0.html
// @version       1.7
// @include       http://www.google.*
// @include       https://www.google.*
// ==/UserScript==

var lst = document.getElementsByClassName('lst');
for (var i in lst) {
	lst[i].addEventListener('change', onchanged);
}

function onchanged () {
	if (/(^| )c | c$/i.test(this.value) && !/-c\+\+ -c#$/i.test(this.value)) {
		this.value += ' -c++ -c#';
	}
}

if (/[&#?]q=(c\+|[^&#]+\+c(\+|&|$))/i.test(document.location.href) && !/\+(-c(%2B){2}\+-c%23|-c%23\+-c(%2B){2})/i.test(document.location.href)) {
	document.location.href = document.location.href.replace(/([#&?]q=[^&#]+)(#|&|$)/i, '$1+-c%2B%2B+-c%23$2');
}