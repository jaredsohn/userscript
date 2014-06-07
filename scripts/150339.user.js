// ==UserScript==
// @name        RetraitNbMessageForum
// @namespace   RetraitNbMessageForum
// @include     http://www.kraland.org/main.php?p=5*
// @grant       none
// @version     1
// ==/UserScript==

// Lance le script une fois le DOM chargé
startScript();

function startScript()
{
	var imgs = document.getElementsByTagName('img');

	for (var i=0; i<imgs.length; i++)
	{
		if (imgs[i].alt == 'nombre messages')
			imgs[i].parentNode.style.display = 'none';
	}
}