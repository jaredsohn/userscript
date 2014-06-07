// ==UserScript==
// @name           openPM
// @namespace      vulca
// @include        http://*.ogame*/game/index.php?page=messages*
// ==/UserScript==
	
	
	function openPM()
	{
		var table = document.getElementById('mailz');
		if (!table || table.getAttribute("done14111") == "done") return;
			table.setAttribute("done14111","done");
				
				
		var urlMess = document.getElementById('mailz').getElementsByTagName('tr');
		
		for (var i=1 ; i< urlMess.length-1 ; i++)
		{
			urlMess[i].getElementsByTagName('td')[1].setAttribute("colSpan","4");
			urlMess[i].getElementsByTagName('td')[1].innerHTML = '<iframe width="100%"  height="350px" src="'+urlMess[i].getElementsByTagName('a')[0].href+'"></iframe>';
			urlMess[i].removeChild(urlMess[i].getElementsByTagName('td')[4]);
			urlMess[i].removeChild(urlMess[i].getElementsByTagName('td')[3]);
			urlMess[i].removeChild(urlMess[i].getElementsByTagName('td')[2]);
		}


	}			
	
	
	setInterval(openPM, 500);			
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				