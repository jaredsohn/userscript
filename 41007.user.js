// ==UserScript==
// @name           fancydress.com disappointment avoider 
// @namespace      outofstock
// @description    avoids disappointment - removes out of stock items from listings while browsing fancydress.com for ideas 
// @include        http://www.fancydress.com/costumes/*
// ==/UserScript==

list = document.getElementsByClassName('left module6'); 
for(i=0;i<list.length;i++){
	if(list[i].innerHTML.indexOf('OUT OF STOCK') > -1){
		list[i].style.display='none'; 
	}
}

