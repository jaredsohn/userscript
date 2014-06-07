// ==UserScript==
// @name           ConexaoMega
// @namespace      http://userscripts.org/users/rchaves
// @include        *megaupload*
// @exclude        http://*conexaomega.com.br*
// ==/UserScript===
foi = false;
if(!foi){
	document.body.innerHTML = '<iframe class="conexaomega_plugin" src="http://www.conexaomega.com.br/extensao?url='+window.location.href+'" style="position:absolute; top:0; left:0; width:100%; background-color:#F7D164; border-bottom:2px solid #CCC; height:70px" frameBorder="0"></iframe>'+document.body.innerHTML;
	foi = true;
}