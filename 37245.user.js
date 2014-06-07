		// ==UserScript==
		// @name Ithappens.ru cleaner
                // @include        http://ithappens.ru*
		// ==/UserScript==
		function f_main(){
    	i=-1;
		while(tab=document.getElementsByTagName('h3')[++i]) 
		tab.innerHTML=tab.innerHTML.replace(/.*#(\d+:).*/ig,"$1");
		i=-1;
		while(tab=document.getElementsByTagName('p')[++i]) 
		if (tab.className=='date') tab.innerHTML='';
		i=-1;
		}
		
	  if (window.opera) {
	    document.addEventListener('load', f_main, false);
	  } else {
	    f_main();
	  }