// ==UserScript==
// @name    anticancer
// @description    deletes cancer posts
// @include    http://www.0chan.ru/b/
// ==/UserScript==
		re=/OFFICIAL ROZEN MAIDEN THREAD|vkontakte|есть одна тян/ig;
		i=-1;
		k=0;
		tab=document.getElementsByTagName('div')
		hr=document.getElementsByTagName('hr')
		while(tab[++i])
		if(tab[i].id.indexOf("thread")!=-1){
		k++;
		if(tab[i].getElementsByTagName('div')[0].innerHTML.match(re)) {
		tab[i].innerHTML='';
		hr[k].style.display='none';
		}
		}
