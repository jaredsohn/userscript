// ==UserScript==
// @name           Wikipedia sidebar on top
// @description    Keep the sidebar of Wikipedia always on top
// @include        http://*.wiki*.org/wiki/*
// @include        http://*.wiktionary.org/wiki/*
// ==/UserScript==

(function()
{	

	function Left(str, n){
		if (n <= 0)
		    return "";
		else if (n > String(str).length)
		    return str;
		else
		    return String(str).substring(0,n);
	}
	
	
	var sidebar = document.getElementById("column-one"); 
	
	sideList= sidebar.childNodes;
	place= 0;
	onTop= false;
	for(a= 0; a < sideList.length;)
	{
		if(sideList[a].id == "p-logo" && onTop == false)
		{
			height= sidebar.firstChild.clientHeight;
			sidebar.removeChild(sideList[a]); // remove logo
			onTop= true;
		}
		if(sideList[a].tagName == 'DIV' && onTop == true)
		{
			realHeight= window.getComputedStyle(sideList[a], "").getPropertyValue("height");
			sideList[a].style.position= 'fixed';
			sideList[a].style.top= place + 'px';
			place+=	Left(realHeight, realHeight.length-2)*1 +5;
		}
		a++;
	}
})();
