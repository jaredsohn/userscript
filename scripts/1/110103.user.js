// ==UserScript==
// @name           Koreus
// @namespace      Muahahah
// @description    Supprime Overs
// @include        http://www.koreus.com/modules/newbb/forum8.html
// ==/UserScript==

Ignore = {
	forum:function(){
		tab_pseudo = this.liste_pseudos.split(',');
		if(posts = document.getElementsByTagName("tr")){
			for ( i = 14 ; i < 39 ; i++) {
				for(j=0;j<tab_pseudo.length;j++){
					if (posts[i].getElementsByTagName('a')[1].innerHTML.indexOf(tab_pseudo[j]) != -1 && posts[i].getElementsByTagName('td')[4].innerHTML<=10) {
					posts[i].style.display = "none";
					}
				}
			}
		}
	}
}
Ignore.liste_pseudos = "Overs";
Ignore.forum();