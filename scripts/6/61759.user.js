// ==UserScript==
// @name           Donaciones V1.0
// @namespace      donacionesstatus
// @description    Donaciones en el status
// @include        http://*mendigogame.es/*
// @exclude 	   http://newboard.mendigogame.es/*
// ==/UserScript==

GM_xmlhttpRequest(
{
	method: 'GET',
   	url: 'http://www.mendigogame.es/overview/',
    onload: function(responseDetails) 
    {
       	var content = responseDetails.responseText;
		var text1 = content.split('Hoy has recibido ')[1];
		var userid1 = document.getElementsByTagName('html')[0].innerHTML.split("http://inodes.pennergame.de/es_ES/avatare/");
		var userid2 = userid1[1].split('_');
		var userid = userid2[0];
		var text2 = text1.split(' donaciones')[0];
		var table = document.getElementsByTagName('ul')[0];
		var li = table.getElementsByTagName('li')[0];
		if (text2 < 50) 
		{
			li.innerHTML = '<img class="avatar" alt="Avatar" title="1" src="http://inodes.pennergame.de/es_ES/avatare/'+userid+'_small.jpg" ><br><br><br><br><br><span style="color:green">Donado:<br>'+text2+' / 50</span>'
		} 
		else 
		{
			li.innerHTML = '<img class="avatar" alt="Avatar" title="1" src="http://inodes.pennergame.de/es_ES/avatare/'+userid+'_small.jpg" ><br><br><br><br><br><span style="color:red">Donado:<br>'+text2+' / 50</span>'
		}
	}
});
