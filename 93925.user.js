// ==UserScript==
// @name           restore 4chan masked thread numbers
// @namespace      http://userscripts.org/users/257845
// @description    small script to restore the masked #######XXX thread numbers to 4chan boards
// @include        *boards.4chan.org*
// ==/UserScript==
function restore(){
	var ql=document.getElementsByClassName('quotejs');
	for(i=0;i<ql.length;i++){
		if(ql[i].innerHTML.search(/^\d*XXX$/)!=-1){
			ql[i].innerHTML=ql[i].parentNode.id.replace(/\D*/,'');
		}
	}
}
restore();