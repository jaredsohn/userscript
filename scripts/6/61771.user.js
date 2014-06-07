// ==UserScript==
// @name           TheWestAcceskeys RU
// @namespace      forestking
// @include http://*.the-west.*
// @include http://zz1w1.tw.innogames.net/* 
// @exclude http://*.the-west.de/forum*
// @exclude http://forum.the-west.*
// ==/UserScript==


	
	function aKeyIsPressed(e) 
	{
	
		// Check if no windows are maximized 
		for (var i=0; i<document.getElementById('windows').childNodes.length; i++)
		{
			if (document.getElementById('windows').childNodes[i].style.display != "none") 
				return;
		}		

		
		var key = e.keyCode;
	
		// Scroll over Card 
		switch (key)
		{
			case 38: 
				document.location.href = "javascript:WMap.startArrowScroll(\'n\');";	
				break;
			case 37:
				document.location.href = "javascript:WMap.startArrowScroll(\'w\');";
				break;
			case 40:
				document.location.href = "javascript:WMap.startArrowScroll(\'s\');";
				break;
			case 39:
				document.location.href = "javascript:WMap.startArrowScroll(\'e\');";
			        break;
			case 49: 
				document.location.href = "javascript:AjaxWindow.show(\'reports\');";	
				break;
			case 50: 
				document.location.href = "javascript:AjaxWindow.show(\'messages\');";	
				break;
			case 51: 
				document.location.href = "javascript:AjaxWindow.show(\'work\');";	
				break;
			case 52: 
				document.location.href = "javascript:AjaxWindow.show(\'inventory\');";	
				break;
			case 53: 
				document.location.href = "javascript:AjaxWindow.show(\'town\',null,Character.get_home_town()?Character.get_home_town().x+\'_\'+Character.get_home_town().y:null);";	
				break;
			case 81:  
				document.location.href = "javascript:AjaxWindow.closeAll();";	
				break;	
			case 83: 
				document.location.href = "javascript:bi2_show_panel();void(0);";	
				break;		
		}
		
	}


	function aKeyWasPressed(e) 
	{
		document.location.href = "javascript:WMap.stopArrowScroll()";
	}

	document.addEventListener('keydown', aKeyIsPressed, true);
	document.addEventListener('keyup', aKeyWasPressed, true);


	var div = document.createElement("div");

	
	div.innerHTML = '<a href="javascript:AjaxWindow.show(\'reports\');" accesskey="1"><\a>'
	+ '<a href="javascript:AjaxWindow.show(\'messages\');" accesskey="2"><\a>'
	+ '<a href="javascript:AjaxWindow.show(\'work\');" accesskey="3"><\a>'
	+ '<a href="javascript:AjaxWindow.show(\'inventory\');" accesskey="4"><\a>'
	+ '<a href="javascript:AjaxWindow.show(\'town\',null,Character.get_home_town()?Character.get_home_town().x+\'_\'+Character.get_home_town().y:null);" accesskey="5"><\a>'
	+ '<a href="javascript:AjaxWindow.closeAll();" accesskey="c"><\a>';
	
	document.body.insertBefore(div, document.body.firstChild);
	

