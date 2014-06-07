// ==UserScript==
// @name Karthik's harvard proxy script
// @namespace who
// @description harvard url replacement for acm and ieee access
// @version    0.01
// ==/UserScript==

function append(str,substr)  {
	return str.replace(substr, substr+"ezp1.harvard.edu");
}

var r1 = /portal\.acm\.org\//i;
var r2 = /ieeexplore\.ieee\.org\//i;
if (r1.test(window.location.href))
	append(window.location.href, r1);
if (r2.test(window.location.href))
	append(window.location.href, r2);
