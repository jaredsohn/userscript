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
		link.setAttribute('onclick', 'window.open(\'http://wbe002.mibbit.com/?server=irc.eu.gamesurge.net&channel=%23tischat&promptchannelkey=true&settings=5b0890aabb9fb1746f444ca8c00a1b27\', width=400, height=154)');
		//Edit your alliance name here
		link.appendChild(document.createTextNode('TIS chat'));


		var li = document.createElement('li');


		li.appendChild(link);
		menuNode.appendChild(li);    

	}

})();
