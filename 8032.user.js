// ==UserScript==
// @name           Google Homepage 3.14
// @namespace      http://decampos.eu.org
// @description    Changes Google Homepage CSS for 3:14 AM
// @include        http://www.google.com/ig
// ==/UserScript==

(function (){
	var link = document.getElementById("ext_css");
	if (link)
		link.href = link.href.replace(/_[0-9]+[ap]m\.css/, "_3.14am.css");
})();
