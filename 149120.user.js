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
		link.setAttribute('onclick', 'window.open(\'http://us5.chatzy.com/43391709581366\', width=200, height=77)');
		//Edit your alliance name here
		link.appendChild(document.createTextNode('OPA CHAT'));


		var li = document.createElement('li');


		li.appendChild(link);
		menuNode.appendChild(li);    

	}

})();