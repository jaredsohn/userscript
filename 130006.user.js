// ==UserScript==
// @name          Ally chat created by alfie (dttah) 
// @description   This script will add a chat in the top bar..
// @include       http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function(){
	
	var menuNode = document.getElementById('playerName');
	if (menuNode!=null)
	{
		var link = document.createElement('a');
		//You will have to edit the URL adding your own room right here. I actually used chatzy with resulted quite easy to use. You can use whatever chat service you'd like.
		link.setAttribute('onclick', 'window.open(\'http://lightirc.com/start/?host=tal.de.eu.gamesurge.net&showNickSelection=true&autojoin=tischat&styleURL=css%2Fblue.css\', width=400, height=154)');
		//Edit your alliance name here
		link.appendChild(document.createTextNode('TIS chat'));


		var li = document.createElement('li');


		li.appendChild(link);
		menuNode.appendChild(li);    

	}

})();
