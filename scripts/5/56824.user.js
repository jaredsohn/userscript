// ==UserScript==
// @name           Desbugar Forum UPDATE 4
// @namespace      LeaoZinho
// @description    Nova versao do script de desbugar forum
// @include        http://*.orkut.*/CommTopics.aspx?*
// ==/UserScript==

if(!(location.href.match(/&nid=|&na=2&nst=1$/))){
	txt = 'pr'+String.fromCharCode(243)+'xima &gt;&nbsp;&nbsp;<span class="grayedout">|</span>&nbsp;&nbsp;'+String.fromCharCode(250)+'ltima';
	pag = "http://www.orkut.com.br/Main#CommTopics?cmm=3309943&na=3&nst=-2&nid=3309943-895255507-5378074099115449972";
	base = document.getElementsByClassName("module")[2].getElementsByClassName("rf")[0];
	cmm = location.href.match(/cmm=([0-9]+)/)[1];
	if(base.getElementsByClassName("grayedout")[3].innerHTML == txt){
		set = GM_getValue(String(cmm),pag);
		txt = '<a href="'+set+'">pr'+String.fromCharCode(243)+'xima &gt;</a>&nbsp;&nbsp;<span class="grayedout">|</span>&nbsp;&nbsp;'+String.fromCharCode(250)+'ltima';
		base.getElementsByClassName("grayedout")[3].innerHTML = txt;
	}else{
		niu = base.getElementsByTagName('a')[0].href;
		GM_setValue(String(cmm),niu);
	};
};