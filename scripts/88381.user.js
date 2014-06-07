// ==UserScript==
// @name           q3df server protocol
// @namespace      q3df.org
// @include        http://www.q3df.org/server
// ==/UserScript==

serverEls = document.querySelectorAll('#Content table>tbody>tr:last-child>td.tbHead2')
for (var i= 0, n= serverEls.length; i<n; i++) {
	var ip = serverEls[i].innerHTML;
	serverEls[i].innerHTML = '<a href="q3a://'+ip+'">q3a://'+ip+'</a><br /><a href="hlsw://'+ip+'">hlsw://'+ip+'</a>';
	if (window.console) console.log(ip)
}
