// ==UserScript==
// @name           Bombagyar.hu ugatófal
// @namespace      lintaba
// @description    idő mellé szerzőt
// @include        http://*bombagyar.hu*
// ==/UserScript==s=document.body.childNodes[1].childNodes[2].rows[0].cells[2].childNodes[19]
for(i=0;i<s.rows.length;i++){
	t=s.rows[i].firstChild.firstChild
	t.appendChild(document.createTextNode(" - "+t.title))
}