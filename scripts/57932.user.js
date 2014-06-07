// ==UserScript==
// @name           Shopto - Brazilian mail
// @namespace      shopto.brMail
// @description    Create a link to Brazilian mail (correios.com.br) with the number order.
// @include        https://secure.shopto.net/page.php?page=my_account&tab=3
// ==/UserScript==

var objects = document.getElementsByTagName("a");

for (var i = 0, l = objects.length; i < l; i++) {

	if (objects.item(i).innerHTML.substr(0, 2) == "RJ") {
		a = document.createElement("a");
		a.href = "http://websro.correios.com.br/sro_bin/txect01$.QueryList?P_LINGUA=001&P_TIPO=001&P_COD_UNI=" + objects.item(i).innerHTML;
		a.target = "_blank";
		a.innerHTML = "Correios";
		a.style.color = "navy";
		objects.item(i).parentNode.appendChild(a);		
	}

}
