// ==UserScript==
// @name        test
// @namespace   http://userscripts.org/users/502883
// @description test
// @include     http://www.delawarecountysheriff.com/sales/sheriff_sales.htm
// @version     1
// ==/UserScript==

var links = document.getElementsByTagName('a');
 
var menu = '';
 
for (i=0; i<links.length; i++) {
 
	var address = links[i].innerHTML;
	var parent = links[i].getParent();
	var realtytrac = document.createElement("a");
	realtytrac.href = "http://www.realtytrac.com/mapsearch/oh/delaware-county/?address="+encodeURIComponent(address);
	realtytrac.innerHtml = '<img src="http://www.realtytrac.com/favicon.ico"/>';
	parent.appendChild(realtytrac);
}


// http://www.realtytrac.com/mapsearch/oh/delaware-county/lewis-center/?address=Lewis%20Center%2C%20OH%20&parsed=1&ct=lewis%20center&cn=delaware%20county&stc=oh
// 6750 Golden Way, Powell OH 43065

