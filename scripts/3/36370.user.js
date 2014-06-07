	// ==UserScript==
	// @name Rating remover
	// @description  removes ratings of comments, expands comments
	// @include        http://dirty.ru/comments*
	// ==/UserScript==
	document.body.innerHTML=document.body.innerHTML.replace(/indent_0 shrinked/g,"indent_0");
	re=/<em>.*<\/em>/i;
	i=0;
	while(tab=document.getElementsByTagName('span')[++i])
	if(tab.innerHTML.match(re)) tab.innerHTML='';
