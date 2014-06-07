// ==UserScript==
// @name           Hide AD block in Paran main
// @namespace      http://userscript.org/users/oloklir
// @description    Hides AD block in www.paran.com mainpage.
// @include        http://www.paran.com/*
// @copyright      OLokLiR
// @version        1.0 2010-11-09
// @injectframes   0
// ==/UserScript==

(function(){

if(document.URL=='http://www.paran.com/'){
	var bad=document.getElementById('bad');
	var nodes=document.body.childNodes;

	var i,j;
	for(i=0;i<nodes.length;i++){
		if(nodes[i]==bad)
		{
			//Hide actual AD block.
			nodes[i].style.display='none';

			//Hide gray bar with 2px width at the top of login box
			for(j=i;j<nodes.length;j++){
				if(nodes[j].id=='login'||nodes[j].id=='logout'){
					nodes[j].style.borderTopWidth='0';
					break;
				}
			}
			break;
		}
	}
}

})();