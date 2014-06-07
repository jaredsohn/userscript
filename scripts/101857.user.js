// ==UserScript==
// @name           Interstitial Remover
// @namespace      none
// @autor          Jack
// @description    Remove o Interstitial dos links em comunidades no Orkut
// @include        http*://*.orkut.*/CommMsgs?cmm=*
// ==/UserScript==

a = document.getElementsByTagName("a");
for(var x in a){
	tmp = a[x];
	tmp2 = tmp.href.match(/u=([^&]+)&t=/);
	if(tmp2 != null) tmp.href = decodeURIComponent(tmp2[1]);
}