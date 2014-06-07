// ==UserScript==
// @name           ISO Hunt no JS search fix
// @namespace      BloodyRain2k
// @include        http://isohunt.com/*/*?ih*
// ==/UserScript==

for (var i = 1; i <= 5; i++){
	var th = document.getElementById("nameTH_" + i);
	th.innerHTML = '<a href="' + th.getAttribute("onClick",true).match(/document\.location='(\S+)'/)[1] + '">' + th.innerHTML + '</a>';
}