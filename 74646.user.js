// ==UserScript==
// @name           Purdue Library Redirector for Online DBs (ACM, IEEE, etc)
// @namespace      edu.purdue.cs.ds.libredir
// @description    When off campus Purdue persons with a "career account" can 
//                 access online research databases such as ACM and IEEE by 
//                 using the library web proxy. This script automatically 
//                 redirects your browser to use the proxy.
// @include        http://ieeexplore.ieee.org
// @include        http://portal.acm.org
// ==/UserScript==

var dbhost = new Array();
var proxyhost = new Array();
var proxyport = new Array();

dbhost[0] = "ieeexplore.ieee.org"
dbhost[1] = "portal.acm.org"

proxyhost[0] = "ieeexplore.ieee.org.login.ezproxy.lib.purdue.edu"
proxyhost[1] = "portal.acm.org.login.ezproxy.lib.purdue.edu"

proxyport[0] = 80
proxyport[1] = 80


//Special case for IEEE's login process
if (window.location.pathname == "/Xplore/login.jsp") {

	var href = unescape(window.location.href.replace( /^.*url=([^&]+)&.*$/, "$1"))
	
	window.location.replace(href.replace( /ieeexplore\.ieee\.org/, "ieeexplore.ieee.org.login.ezproxy.lib.purdue.edu" ))
	
} else {

	for (var i=0; i<dbhost.length; i++) {
		if (window.location.hostname == dbhost[i]) {	window.location.replace(window.location.protocol+"//"+proxyhost[i]+":"+proxyport[i]+window.location.pathname+window.location.search+window.location.hash)
		}
	}

}